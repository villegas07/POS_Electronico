<?php

namespace App\Http\Controllers\Api;

use App\Models\Caja;
use App\Models\CajaMovimiento;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CajaController extends \Illuminate\Routing\Controller
{
    /**
     * Obtener caja activa del usuario autenticado
     */
    public function cajaActiva()
    {
        $cajaActiva = Caja::where('usuario_id', Auth::id())
            ->where('estado', 'abierta')
            ->latest('fecha_apertura')
            ->first();

        if (!$cajaActiva) {
            return response()->json(null);
        }

        return response()->json($cajaActiva);
    }

    /**
     * Abrir una nueva caja
     */
    public function abrir(Request $request)
    {
        $validated = $request->validate([
            'monto_inicial' => 'required|numeric|min:0',
            'observaciones' => 'nullable|string',
        ]);

        // Verificar si ya hay caja abierta
        $cajaAbierta = Caja::where('usuario_id', Auth::id())
            ->where('estado', 'abierta')
            ->exists();

        if ($cajaAbierta) {
            return response()->json([
                'message' => 'Ya existe una caja abierta para este usuario',
            ], 422);
        }

        try {
            DB::beginTransaction();

            $caja = Caja::create([
                'usuario_id' => Auth::id(),
                'monto_inicial' => $validated['monto_inicial'],
                'fecha_apertura' => now(),
                'estado' => 'abierta',
                'observaciones' => $validated['observaciones'] ?? null,
            ]);

            // Registrar movimiento de apertura
            CajaMovimiento::create([
                'caja_id' => $caja->id,
                'tipo' => 'apertura',
                'descripcion' => 'Apertura de caja',
                'monto' => $validated['monto_inicial'],
            ]);

            DB::commit();

            return response()->json($caja, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Cerrar la caja activa
     */
    public function cerrar(Request $request)
    {
        $validated = $request->validate([
            'monto_final' => 'required|numeric|min:0',
            'observaciones' => 'nullable|string',
        ]);

        $caja = Caja::where('usuario_id', Auth::id())
            ->where('estado', 'abierta')
            ->latest('fecha_apertura')
            ->firstOrFail();

        try {
            DB::beginTransaction();

            // Calcular totales de ventas y devoluciones del día
            $ventasDelDia = Venta::where('caja_id', $caja->id)
                ->where('estado', '!=', 'cancelada')
                ->sum('total');

            $devolucionesDelDia = \App\Models\Devolucion::whereIn('venta_id', 
                Venta::where('caja_id', $caja->id)->pluck('id')
            )->sum('monto_total');

            $caja->update([
                'monto_final' => $validated['monto_final'],
                'total_ventas' => $ventasDelDia,
                'total_devoluciones' => $devolucionesDelDia,
                'fecha_cierre' => now(),
                'estado' => 'cerrada',
                'observaciones' => $validated['observaciones'] ?? $caja->observaciones,
            ]);

            // Calcular diferencia
            $caja->calcularDiferencia();
            $caja->save();

            // Registrar movimiento de cierre
            CajaMovimiento::create([
                'caja_id' => $caja->id,
                'tipo' => 'cierre',
                'descripcion' => 'Cierre de caja',
                'monto' => $validated['monto_final'],
            ]);

            DB::commit();

            return response()->json($caja);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Obtener resumen de caja
     */
    public function resumen($cajaId = null)
    {
        $query = Caja::with('movimientos', 'usuario');

        if ($cajaId) {
            $query->where('id', $cajaId);
        } else {
            $query->where('usuario_id', Auth::id())
                ->where('estado', 'abierta')
                ->latest('fecha_apertura');
        }

        $caja = $query->first();

        if (!$caja) {
            return response()->json(['message' => 'Caja no encontrada'], 404);
        }

        // Calcular totales de movimientos
        $ingresos = $caja->movimientos()->whereIn('tipo', ['venta', 'ingreso'])->sum('monto');
        $egresos = $caja->movimientos()->whereIn('tipo', ['devolucion', 'egreso'])->sum('monto');

        return response()->json([
            'caja' => $caja,
            'ingresos' => $ingresos,
            'egresos' => $egresos,
            'saldo_teórico' => $caja->monto_inicial + $ingresos - $egresos,
        ]);
    }

    /**
     * Listar todas las cajas del usuario
     */
    public function index()
    {
        $cajas = Caja::where('usuario_id', Auth::id())
            ->with('movimientos', 'usuario')
            ->orderByDesc('fecha_apertura')
            ->paginate(15);

        return response()->json($cajas);
    }

    /**
     * Registrar un movimiento en caja
     */
    public function registrarMovimiento(Request $request, Caja $caja)
    {
        $validated = $request->validate([
            'tipo' => 'required|in:ingreso,egreso,ajuste',
            'descripcion' => 'required|string',
            'monto' => 'required|numeric|min:0.01',
        ]);

        if ($caja->estado !== 'abierta') {
            return response()->json(['message' => 'La caja debe estar abierta'], 422);
        }

        try {
            DB::beginTransaction();

            $movimiento = CajaMovimiento::create([
                'caja_id' => $caja->id,
                'tipo' => $validated['tipo'],
                'descripcion' => $validated['descripcion'],
                'monto' => $validated['monto'],
            ]);

            DB::commit();

            return response()->json($movimiento, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Ver detalle de una caja
     */
    public function show(Caja $caja)
    {
        $caja->load('movimientos', 'usuario', 'ventas');
        return response()->json($caja);
    }
}

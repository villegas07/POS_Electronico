<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Stock;
use App\Models\StockMovimiento;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class StockMovimientoController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'tipo' => 'required|in:in,out,ajuste',
            'cantidad' => 'required|integer|min:0',
            'motivo' => 'nullable|string',
            'referencia_id' => 'nullable|integer',
        ]);

    return DB::transaction(function () use ($data, $request) {
            $productoId = $data['producto_id'];
            $cantidad = (int) $data['cantidad'];
            $tipo = $data['tipo'];

            $stock = Stock::firstOrCreate(['producto_id' => $productoId], ['cantidad' => 0]);

            if ($tipo === 'in') {
                $stock->cantidad += $cantidad;
                $stock->save();
            } elseif ($tipo === 'out') {
                if ($stock->cantidad < $cantidad) {
                    return response()->json(['message' => 'Insufficient stock'], Response::HTTP_UNPROCESSABLE_ENTITY);
                }

                $stock->cantidad -= $cantidad;
                $stock->save();
            } else { // ajuste -> set absolute quantity
                $stock->cantidad = $cantidad;
                $stock->save();
            }

            $mov = StockMovimiento::create([
                'producto_id' => $productoId,
                'tipo' => $tipo,
                'cantidad' => $cantidad,
                'motivo' => $data['motivo'] ?? null,
                'referencia_id' => $data['referencia_id'] ?? null,
                'user_id' => $request->user() ? $request->user()->id : null,
            ]);

            return response()->json($mov, Response::HTTP_CREATED);
        });
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Stock;
use App\Models\StockMovimiento;
use App\Models\Venta;
use App\Models\VentaItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class PosController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'usuario_id' => 'nullable|exists:users,id',
            'cliente_id' => 'nullable',
            'items' => 'required|array|min:1',
            'items.*.producto_id' => 'required|exists:productos,id',
            'items.*.cantidad' => 'required|integer|min:1',
            'items.*.precio_unitario' => 'required|numeric|min:0',
            'items.*.descuento_porcentaje' => 'nullable|numeric|min:0|max:100',
            'payments' => 'nullable|array',
            'payments.*.metodo' => 'required_with:payments|string|in:cash,card,transfer,other',
            'payments.*.monto' => 'required_with:payments|numeric|min:0.01',
            'payments.*.datos' => 'nullable|array',
        ]);

        return DB::transaction(function () use ($data, $request) {
            $total = 0;
            $venta = Venta::create([
                'usuario_id' => $data['usuario_id'] ?? ($request->user() ? $request->user()->id : null),
                'cliente_id' => $data['cliente_id'] ?? null,
                'total' => 0,
                'impuesto' => 0,
                'estado' => 'facturado',
            ]);


            // load client if any to check tax exemption
            $cliente = null;
            if (!empty($venta->cliente_id)) {
                $cliente = \App\Models\Cliente::find($venta->cliente_id);
            }

            foreach ($data['items'] as $item) {
                $productoId = $item['producto_id'];
                $cantidad = (int) $item['cantidad'];
                $precio = $item['precio_unitario'];

                $stock = Stock::firstOrCreate(['producto_id' => $productoId], ['cantidad' => 0]);

                if ($stock->cantidad < $cantidad) {
                    // rollback
                    return response()->json(['message' => 'Insufficient stock for product '.$productoId], Response::HTTP_UNPROCESSABLE_ENTITY);
                }

                $stock->cantidad -= $cantidad;
                $stock->save();

                // record stock movement
                StockMovimiento::create([
                    'producto_id' => $productoId,
                    'tipo' => 'out',
                    'cantidad' => $cantidad,
                    'motivo' => 'Venta #'.$venta->id,
                    'user_id' => $venta->usuario_id,
                ]);

                $subtotal = $precio * $cantidad;

                // apply discount if present (percentage)
                $descuentoMonto = 0.0;
                if (!empty($item['descuento_porcentaje'])) {
                    $descuentoPorc = (float) $item['descuento_porcentaje'];
                    $descuentoMonto = round($subtotal * ($descuentoPorc / 100), 2);
                    $subtotal = $subtotal - $descuentoMonto;
                }

                // determine product IVA percentage and calculate tax per item
                $producto = Producto::find($productoId);
                $ivaPorc = $producto ? ($producto->iva_porcentaje ?? 0) : 0;

                // if client is tax exempt, item tax is zero
                if ($cliente && $cliente->tax_exempt) {
                    $itemImpuesto = 0.00;
                } else {
                    $itemImpuesto = round($subtotal * ($ivaPorc / 100), 2);
                }

                $total += $subtotal + $itemImpuesto;
                $venta->impuesto = ($venta->impuesto ?? 0) + $itemImpuesto;

                VentaItem::create([
                    'venta_id' => $venta->id,
                    'producto_id' => $productoId,
                    'cantidad' => $cantidad,
                    'precio_unitario' => $precio,
                    'subtotal' => $subtotal,
                    'impuesto' => $itemImpuesto,
                    'descuento' => $descuentoMonto,
                ]);
                \Log::debug('venta_item_created', ['venta_id' => $venta->id, 'producto_id' => $productoId, 'descuento' => $descuentoMonto]);
            }

            $venta->total = $total;
            $venta->save();

            // handle payments if provided
            if (!empty($data['payments'])) {
                $sumPayments = 0.0;
                foreach ($data['payments'] as $p) {
                    $sumPayments += (float) $p['monto'];
                }

                // allow tiny float rounding differences
                if (round($sumPayments, 2) !== round($venta->total, 2)) {
                    return response()->json(['message' => 'La suma de los pagos no coincide con el total de la venta.'], Response::HTTP_UNPROCESSABLE_ENTITY);
                }

                foreach ($data['payments'] as $p) {
                    \App\Models\Pago::create([
                        'venta_id' => $venta->id,
                        'metodo' => $p['metodo'],
                        'monto' => $p['monto'],
                        'datos' => $p['datos'] ?? null,
                    ]);
                }
            }

            return response()->json($venta->load('items'), Response::HTTP_CREATED);
        });
    }
}

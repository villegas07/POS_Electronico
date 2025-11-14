<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Devolucion;
use App\Models\DevolucionItem;
use App\Models\Stock;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DevolucionController extends Controller
{
    public function store(Request $request, Venta $venta)
    {
        $data = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.producto_id' => 'required|exists:productos,id',
            'items.*.cantidad' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($data, $venta, $request) {
            $devolucion = Devolucion::create([
                'venta_id' => $venta->id,
                'user_id' => $request->user() ? $request->user()->id : null,
            ]);

            foreach ($data['items'] as $item) {
                $productoId = $item['producto_id'];
                $cantidad = (int) $item['cantidad'];

                $stock = Stock::firstOrCreate(['producto_id' => $productoId], ['cantidad' => 0]);
                $stock->cantidad += $cantidad;
                $stock->save();

                DevolucionItem::create([
                    'devolucion_id' => $devolucion->id,
                    'producto_id' => $productoId,
                    'cantidad' => $cantidad,
                ]);
            }

            return response()->json($devolucion, Response::HTTP_CREATED);
        });
    }
}

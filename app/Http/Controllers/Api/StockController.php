<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Models\Stock;

class StockController extends Controller
{
    public function show(Producto $producto)
    {
        $stock = Stock::where('producto_id', $producto->id)->first();

        return response()->json(['producto_id' => $producto->id, 'cantidad' => $stock ? $stock->cantidad : 0]);
    }
}

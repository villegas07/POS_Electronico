<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::with('stock')->get()->map(function ($producto) {
            // Mapear costo a precio_costo para el frontend
            $producto->precio_costo = $producto->costo;
            return $producto;
        });
        
        return response()->json($productos);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'sku' => 'required|string|unique:productos,sku',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio_venta' => 'required|numeric',
            'precio_costo' => 'nullable|numeric',
            'costo' => 'nullable|numeric',
            'iva_porcentaje' => 'nullable|numeric',
            'stock_minimo' => 'nullable|integer',
            'unidad' => 'nullable|string',
        ]);

        // Mapear precio_costo a costo si viene del frontend
        if (isset($data['precio_costo'])) {
            $data['costo'] = $data['precio_costo'];
            unset($data['precio_costo']);
        }

        $prod = Producto::create($data);
        
        // Crear registro de stock inicial
        $prod->stock()->create(['cantidad' => 0]);

        return response()->json($prod->load('stock'), Response::HTTP_CREATED);
    }

    public function show(Producto $producto)
    {
        return response()->json($producto);
    }

    public function update(Request $request, Producto $producto)
    {
        $data = $request->validate([
            'sku' => 'sometimes|required|string|unique:productos,sku,' . $producto->id,
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio_venta' => 'nullable|numeric',
            'precio_costo' => 'nullable|numeric',
            'costo' => 'nullable|numeric',
            'iva_porcentaje' => 'nullable|numeric',
            'stock_minimo' => 'nullable|integer',
            'unidad' => 'nullable|string',
        ]);

        // Mapear precio_costo a costo si viene del frontend
        if (isset($data['precio_costo'])) {
            $data['costo'] = $data['precio_costo'];
            unset($data['precio_costo']);
        }

        $producto->update($data);

        return response()->json($producto->load('stock'));
    }

    public function destroy(Producto $producto)
    {
        $producto->delete();

        return response()->noContent();
    }
}

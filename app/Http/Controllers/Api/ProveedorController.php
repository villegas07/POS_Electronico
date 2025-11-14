<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProveedorController extends Controller
{
    public function index()
    {
        return response()->json(Proveedor::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nit' => 'required|string|max:50',
            'nombre' => 'required|string|max:255',
            'nombre_contacto' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:20',
            'direccion' => 'required|string|max:500',
            'nota' => 'nullable|string|max:1000',
        ]);

        $prov = Proveedor::create($data);

        return response()->json($prov, Response::HTTP_CREATED);
    }

    public function show(Proveedor $proveedor)
    {
        return response()->json($proveedor);
    }

    public function update(Request $request, Proveedor $proveedor)
    {
        $data = $request->validate([
            'nit' => 'sometimes|required|string|max:50|unique:proveedores,nit,' . $proveedor->id,
            'nombre' => 'sometimes|required|string|max:255',
            'nombre_contacto' => 'nullable|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'telefono' => 'sometimes|required|string|max:20',
            'direccion' => 'sometimes|required|string|max:500',
            'nota' => 'nullable|string|max:1000',
        ]);

        $proveedor->update($data);

        return response()->json($proveedor);
    }

    public function destroy(Proveedor $proveedor)
    {
        $proveedor->delete();

        return response()->noContent();
    }
}

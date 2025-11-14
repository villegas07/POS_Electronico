<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FactusInvoiceRequest extends FormRequest
{
    public function authorize()
    {
        // TODO: ajustar según la política de permisos (roles/usuarios)
        return true;
    }

    public function rules()
    {
        return [
            'venta_id' => 'nullable|exists:ventas,id',
            'payload' => 'required_without:venta_id|array',

            // Cliente mínimo (si se envía payload)
            'payload.cliente.tipo_documento' => 'required_with:payload|string|max:10',
            'payload.cliente.numero_documento' => 'required_with:payload|string|max:30',
            'payload.cliente.nombre' => 'sometimes|string|max:255',

            // Items
            'payload.items' => 'required_without:venta_id|array|min:1',
            'payload.items.*.codigo' => 'required|string',
            'payload.items.*.descripcion' => 'required|string',
            'payload.items.*.unidad' => 'required|string',
            'payload.items.*.cantidad' => 'required|numeric|min:0.0001',
            'payload.items.*.precio_unitario' => 'required|numeric|min:0',
            'payload.items.*.iva_porcentaje' => 'nullable|numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'payload.required_without' => 'Se requiere payload cuando no se proporciona venta_id.',
            'payload.items.required_without' => 'El payload debe incluir al menos un item.',
        ];
    }
}

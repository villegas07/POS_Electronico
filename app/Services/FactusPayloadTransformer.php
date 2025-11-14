<?php

namespace App\Services;

use App\Models\Venta;
use App\Models\Producto;
use App\Models\Cliente;

/**
 * Transforma entidades internas (Venta, VentaItem, Cliente, Producto)
 * al payload que espera la API de Factus.
 *
 * Esta implementación es un mapeo razonable y puede ajustarse
 * según los requisitos exactos de la API de Factus (tipos de impuestos,
 * códigos de unidad, productos exentos, etc.).
 */
class FactusPayloadTransformer
{
    /**
     * Convierte una Venta o un arreglo simple en el payload de Factus
     * @param Venta|array $source
     * @return array
     */
    public function transform($source): array
    {
        if ($source instanceof Venta) {
            return $this->fromVenta($source);
        }

        if (is_array($source)) {
            return $this->fromArray($source);
        }

        throw new \InvalidArgumentException('Unsupported source for FactusPayloadTransformer');
    }

    protected function fromVenta(Venta $venta): array
    {
        $cliente = $venta->cliente_id ? Cliente::find($venta->cliente_id) : null;

        $items = $venta->items()->with('producto')->get()->map(function ($item) use ($cliente) {
            /** @var \App\Models\VentaItem $item */
            $producto = $item->producto;

            $taxPercentage = $producto ? ($producto->iva_porcentaje ?? 0) : 0;

            // Map a generic structure. Factus may expect specific keys; adjust as needed.
            return [
                'codigo' => $producto ? ($producto->sku ?? 'P-'.$producto->id) : 'P-'.$item->producto_id,
                'descripcion' => $producto ? ($producto->nombre ?? 'Producto '.$producto->id) : 'Producto '.$item->producto_id,
                'unidad' => $producto ? ($producto->unidad ?? 'unidad') : 'unidad',
                'cantidad' => (float) $item->cantidad,
                'precio_unitario' => (float) $item->precio_unitario,
                'descuento' => isset($item->descuento) ? (float) $item->descuento : 0.0,
                'subtotal' => (float) $item->subtotal,
                'iva_porcentaje' => $taxPercentage,
            ];
        })->toArray();

        $payload = [
            'cliente' => $this->mapCliente($cliente),
            'items' => $items,
            'total' => (float) $venta->total,
            'impuesto' => (float) $venta->impuesto,
            'referencia' => 'venta_'.$venta->id,
        ];

        return $payload;
    }

    protected function fromArray(array $data): array
    {
        // If the caller provides a custom payload, try to normalize minimal fields
        $items = $data['items'] ?? [];

        $normalizedItems = array_map(function ($it) {
            return [
                'codigo' => $it['codigo'] ?? ($it['producto_id'] ?? null) ?? 'P-0',
                'descripcion' => $it['descripcion'] ?? ($it['nombre'] ?? 'Producto'),
                'unidad' => $it['unidad'] ?? 'unidad',
                'cantidad' => (float) ($it['cantidad'] ?? 1),
                'precio_unitario' => (float) ($it['precio_unitario'] ?? ($it['precio'] ?? 0)),
                'descuento' => (float) ($it['descuento'] ?? ($it['descuento_porcentaje'] ?? 0)),
                'subtotal' => (float) ($it['subtotal'] ?? ((float) ($it['precio_unitario'] ?? 0) * (float) ($it['cantidad'] ?? 1))),
                'iva_porcentaje' => (float) ($it['iva_porcentaje'] ?? 0),
            ];
        }, $items);

        return [
            'cliente' => isset($data['cliente']) ? $this->mapClienteArray($data['cliente']) : null,
            'items' => array_values($normalizedItems),
            'total' => (float) ($data['total'] ?? array_reduce($normalizedItems, function ($carry, $i) { return $carry + ($i['subtotal'] ?? 0); }, 0)),
            'impuesto' => (float) ($data['impuesto'] ?? 0),
            'referencia' => $data['referencia'] ?? null,
        ];
    }

    protected function mapCliente(?Cliente $cliente): ?array
    {
        if (!$cliente) return null;

        return [
            'tipo_documento' => $cliente->tipo_documento ?? null,
            'numero_documento' => $cliente->documento ?? null,
            'nombre' => $cliente->nombre ?? null,
            'email' => $cliente->email ?? null,
        ];
    }

    protected function mapClienteArray(array $c): array
    {
        return [
            'tipo_documento' => $c['tipo_documento'] ?? null,
            'numero_documento' => $c['numero_documento'] ?? ($c['documento'] ?? null),
            'nombre' => $c['nombre'] ?? null,
            'email' => $c['email'] ?? null,
        ];
    }
}

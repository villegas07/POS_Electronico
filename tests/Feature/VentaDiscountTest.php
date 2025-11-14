<?php

use App\Models\Producto;
use App\Models\Stock;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('applies item-level percentage discounts and calculates tax after discount', function () {
    $product = Producto::factory()->create(['precio_venta' => 1000, 'iva_porcentaje' => 19]);
    Stock::create(['producto_id' => $product->id, 'cantidad' => 10]);

    $payload = [
        'items' => [
            ['producto_id' => $product->id, 'cantidad' => 2, 'precio_unitario' => 1000, 'descuento_porcentaje' => 10],
        ],
    ];

    $response = $this->postJson('/api/pos/ventas', $payload)->assertStatus(201);

    // subtotal 2000, discount 10% => 200, taxable = 1800, tax 19% => 342, total = 1800+342 = 2142
    $expectedDiscount = 200.00;
    $expectedTaxable = 1800.00;
    $expectedImpuesto = round($expectedTaxable * 0.19, 2);
    $expectedTotal = round($expectedTaxable + $expectedImpuesto, 2);

    $item = \App\Models\VentaItem::first();
    fwrite(STDERR, json_encode($item->toArray()).PHP_EOL);
    $this->assertDatabaseHas('venta_items', ['producto_id' => $product->id, 'descuento' => $expectedDiscount]);
    $this->assertDatabaseHas('ventas', ['impuesto' => $expectedImpuesto, 'total' => $expectedTotal]);
});

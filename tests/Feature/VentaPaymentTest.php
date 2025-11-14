<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('creates a venta with a single cash payment', function () {
    $product = \App\Models\Producto::factory()->create(['precio_venta' => 1000, 'iva_porcentaje' => 0]);
    \App\Models\Stock::create(['producto_id' => $product->id, 'cantidad' => 5]);

    $payload = [
        'items' => [
            ['producto_id' => $product->id, 'cantidad' => 1, 'precio_unitario' => 1000],
        ],
        'payments' => [
            ['metodo' => 'cash', 'monto' => 1000.00],
        ],
    ];

    $this->postJson('/api/pos/ventas', $payload)
        ->assertStatus(201);

    $venta = \App\Models\Venta::first();
    $this->assertDatabaseHas('pagos', ['venta_id' => $venta->id, 'metodo' => 'cash', 'monto' => 1000.00]);
});

it('creates a venta with combined payments (cash + card)', function () {
    $product = \App\Models\Producto::factory()->create(['precio_venta' => 1500, 'iva_porcentaje' => 0]);
    \App\Models\Stock::create(['producto_id' => $product->id, 'cantidad' => 5]);

    $payload = [
        'items' => [
            ['producto_id' => $product->id, 'cantidad' => 1, 'precio_unitario' => 1500],
        ],
        'payments' => [
            ['metodo' => 'cash', 'monto' => 500.00],
            ['metodo' => 'card', 'monto' => 1000.00, 'datos' => ['terminal' => 'PAGO-1', 'auth' => 'XYZ']],
        ],
    ];

    $this->postJson('/api/pos/ventas', $payload)
        ->assertStatus(201);

    $venta = \App\Models\Venta::first();
    $this->assertDatabaseHas('pagos', ['venta_id' => $venta->id, 'metodo' => 'cash', 'monto' => 500.00]);
    $this->assertDatabaseHas('pagos', ['venta_id' => $venta->id, 'metodo' => 'card', 'monto' => 1000.00]);
});

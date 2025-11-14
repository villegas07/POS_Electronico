<?php

use App\Models\Producto;
use App\Models\Stock;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('creates a venta and decrements stock for each item', function () {
    $product = Producto::factory()->create(['precio_venta' => 10000]);
    Stock::create(['producto_id' => $product->id, 'cantidad' => 10]);

    $payload = [
        'usuario_id' => null,
        'cliente_id' => null,
        'items' => [
            ['producto_id' => $product->id, 'cantidad' => 3, 'precio_unitario' => 10000],
        ],
    ];

    $response = $this->postJson('/api/pos/ventas', $payload)
        ->assertStatus(201)
        ->assertJsonStructure(['id', 'total', 'impuesto', 'items']);

    // subtotal and impuesto calculation
    $subtotal = 10000 * 3; // 30000
    $iva = $product->iva_porcentaje ?? 19.0;
    $impuesto = round($subtotal * ($iva / 100), 2);
    $expectedTotal = $subtotal + $impuesto;

    $this->assertDatabaseHas('ventas', ['total' => $expectedTotal, 'impuesto' => $impuesto]);
    $this->assertDatabaseHas('venta_items', ['producto_id' => $product->id, 'cantidad' => 3, 'impuesto' => $impuesto]);
    $this->assertDatabaseHas('stocks', ['producto_id' => $product->id, 'cantidad' => 7]);
});

it('does not allow sale when stock insufficient', function () {
    $product = Producto::factory()->create();
    Stock::create(['producto_id' => $product->id, 'cantidad' => 2]);

    $payload = [
        'items' => [
            ['producto_id' => $product->id, 'cantidad' => 5, 'precio_unitario' => 5000],
        ],
    ];

    $this->postJson('/api/pos/ventas', $payload)->assertStatus(422);

    // ensure stock unchanged
    $this->assertDatabaseHas('stocks', ['producto_id' => $product->id, 'cantidad' => 2]);
});

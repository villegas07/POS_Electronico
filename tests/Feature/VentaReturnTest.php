<?php

use App\Models\Producto;
use App\Models\Stock;
use App\Models\Venta;
use App\Models\VentaItem;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('processes a return increasing stock and recording devolucion', function () {
    $product = Producto::factory()->create(['precio_venta' => 1000]);
    Stock::create(['producto_id' => $product->id, 'cantidad' => 10]);

    // create a sale
    $payload = [
        'items' => [
            ['producto_id' => $product->id, 'quantity' => 3, 'precio_unitario' => 1000],
        ],
    ];

    // use existing POS endpoint to create a venta (bypass internal details)
    $saleResp = $this->postJson('/api/pos/ventas', ['items' => [['producto_id' => $product->id, 'cantidad' => 3, 'precio_unitario' => 1000]]])
        ->assertStatus(201)
        ->decodeResponseJson();

    $ventaId = $saleResp['id'];

    // after sale stock should be 7
    $this->assertDatabaseHas('stocks', ['producto_id' => $product->id, 'cantidad' => 7]);

    // return 2 units
    $this->postJson("/api/pos/ventas/{$ventaId}/devoluciones", [
        'items' => [
            ['producto_id' => $product->id, 'cantidad' => 2],
        ],
    ])->assertStatus(201);

    // stock should be back to 9
    $this->assertDatabaseHas('stocks', ['producto_id' => $product->id, 'cantidad' => 9]);

    // a devolucion record should exist
    $this->assertDatabaseHas('devoluciones', ['venta_id' => $ventaId]);
});

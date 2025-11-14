<?php

use App\Models\Producto;
use App\Models\Stock;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('creates an incoming stock movimiento and increases stock', function () {
    $product = Producto::factory()->create(['precio_venta' => 1000]);

    $this->postJson('/api/stock/movimientos', [
        'producto_id' => $product->id,
        'tipo' => 'in',
        'cantidad' => 10,
        'motivo' => 'Compra inicial',
    ])->assertStatus(201);

    $this->assertDatabaseHas('stocks', ['producto_id' => $product->id, 'cantidad' => 10]);
    $this->assertDatabaseHas('stock_movimientos', ['producto_id' => $product->id, 'tipo' => 'in', 'cantidad' => 10]);
});

it('creates an outgoing stock movimiento and decreases stock', function () {
    $product = Producto::factory()->create();

    // seed initial stock
    Stock::create(['producto_id' => $product->id, 'cantidad' => 5]);

    $this->postJson('/api/stock/movimientos', [
        'producto_id' => $product->id,
        'tipo' => 'out',
        'cantidad' => 3,
        'motivo' => 'Venta',
    ])->assertStatus(201);

    $this->assertDatabaseHas('stocks', ['producto_id' => $product->id, 'cantidad' => 2]);
    $this->assertDatabaseHas('stock_movimientos', ['producto_id' => $product->id, 'tipo' => 'out', 'cantidad' => 3]);
});

it('prevents outgoing movement when insufficient stock', function () {
    $product = Producto::factory()->create();

    Stock::create(['producto_id' => $product->id, 'cantidad' => 1]);

    $this->postJson('/api/stock/movimientos', [
        'producto_id' => $product->id,
        'tipo' => 'out',
        'cantidad' => 5,
        'motivo' => 'Compra erronea',
    ])->assertStatus(422);

    // ensure stock unchanged
    $this->assertDatabaseHas('stocks', ['producto_id' => $product->id, 'cantidad' => 1]);
});

it('gets the current stock for a product', function () {
    $product = Producto::factory()->create();
    Stock::create(['producto_id' => $product->id, 'cantidad' => 7]);

    $this->getJson("/api/productos/{$product->id}/stock")
        ->assertStatus(200)
        ->assertJsonFragment(['cantidad' => 7]);
});

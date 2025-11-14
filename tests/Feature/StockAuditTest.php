<?php

use App\Models\Producto;
use App\Models\Stock;
use App\Models\StockMovimiento;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('records referencia and user when creating movimiento', function () {
    $product = Producto::factory()->create();

    $user = \App\Models\User::factory()->create();

    $this->actingAs($user)
        ->postJson('/api/stock/movimientos', [
            'producto_id' => $product->id,
            'tipo' => 'in',
            'cantidad' => 4,
            'motivo' => 'Auditoría',
            'referencia_id' => 123,
        ])->assertStatus(201);

    $this->assertDatabaseHas('stock_movimientos', ['producto_id' => $product->id, 'referencia_id' => 123, 'user_id' => $user->id]);
});

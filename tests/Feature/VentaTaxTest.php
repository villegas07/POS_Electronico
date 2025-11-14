<?php

use App\Models\Producto;
use App\Models\Stock;
use App\Models\Cliente;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('calculates taxes correctly for mixed tax rates', function () {
    $p1 = Producto::factory()->create(['precio_venta' => 1000, 'iva_porcentaje' => 0]);
    $p2 = Producto::factory()->create(['precio_venta' => 2000, 'iva_porcentaje' => 10]);

    Stock::create(['producto_id' => $p1->id, 'cantidad' => 5]);
    Stock::create(['producto_id' => $p2->id, 'cantidad' => 5]);

    $payload = [
        'items' => [
            ['producto_id' => $p1->id, 'cantidad' => 2, 'precio_unitario' => 1000],
            ['producto_id' => $p2->id, 'cantidad' => 1, 'precio_unitario' => 2000],
        ],
    ];

    $response = $this->postJson('/api/pos/ventas', $payload)->assertStatus(201);

    // p1 subtotal 2000, tax 0
    // p2 subtotal 2000, tax 200 (10%)
    $expectedImpuesto = 200.00;
    $expectedTotal = 2000 + 2000 + $expectedImpuesto; // 4200

    $this->assertDatabaseHas('ventas', ['impuesto' => $expectedImpuesto, 'total' => $expectedTotal]);
});

it('applies client tax exemption overriding product taxes', function () {
    $p = Producto::factory()->create(['precio_venta' => 5000, 'iva_porcentaje' => 19]);
    Stock::create(['producto_id' => $p->id, 'cantidad' => 10]);

    $cliente = Cliente::factory()->create(['tax_exempt' => true]);

    $payload = [
        'cliente_id' => $cliente->id,
        'items' => [
            ['producto_id' => $p->id, 'cantidad' => 2, 'precio_unitario' => 5000],
        ],
    ];

    $this->postJson('/api/pos/ventas', $payload)
        ->assertStatus(201);

    // impuesto should be 0 because client is tax_exempt
    $this->assertDatabaseHas('ventas', ['impuesto' => 0.00]);
    $this->assertDatabaseHas('venta_items', ['impuesto' => 0.00]);
});

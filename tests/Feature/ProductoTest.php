<?php

use App\Models\Producto;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can create a producto via api', function () {
    $payload = [
        'sku' => 'SKU-001',
        'nombre' => 'Producto Uno',
        'precio_venta' => 12000,
    ];

    $this->postJson('/api/productos', $payload)
        ->assertStatus(201)
        ->assertJsonFragment(['nombre' => 'Producto Uno']);

    $this->assertDatabaseHas('productos', ['nombre' => 'Producto Uno']);
});

it('validates required nombre when creating producto', function () {
    $this->postJson('/api/productos', [])->assertStatus(422);
});

it('can list productos', function () {
    Producto::factory()->create(['nombre' => 'Pr1']);

    $this->getJson('/api/productos')
        ->assertStatus(200)
        ->assertJsonFragment(['nombre' => 'Pr1']);
});

it('can update a producto', function () {
    $p = Producto::factory()->create(['nombre' => 'OldP']);

    $this->putJson("/api/productos/{$p->id}", ['nombre' => 'NewP'])
        ->assertStatus(200)
        ->assertJsonFragment(['nombre' => 'NewP']);

    $this->assertDatabaseHas('productos', ['id' => $p->id, 'nombre' => 'NewP']);
});

it('can delete a producto', function () {
    $p = Producto::factory()->create();

    $this->deleteJson("/api/productos/{$p->id}")
        ->assertStatus(204);

    $this->assertDatabaseMissing('productos', ['id' => $p->id]);
});

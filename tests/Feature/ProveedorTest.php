<?php

use App\Models\Proveedor;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can create a proveedor via api', function () {
    $payload = [
        'nombre' => 'Proveedor Uno',
        'nit' => '900123456-7',
        'contacto' => 'Juan',
        'email' => 'juan@proveedor.test',
    ];

    $this->postJson('/api/proveedores', $payload)
        ->assertStatus(201)
        ->assertJsonFragment(['nombre' => 'Proveedor Uno']);

    $this->assertDatabaseHas('proveedores', ['nombre' => 'Proveedor Uno']);
});

it('validates required nombre when creating proveedor', function () {
    $this->postJson('/api/proveedores', [])->assertStatus(422);
});

it('can list proveedores', function () {
    Proveedor::factory()->create(['nombre' => 'P1']);

    $this->getJson('/api/proveedores')
        ->assertStatus(200)
        ->assertJsonFragment(['nombre' => 'P1']);
});

it('can update a proveedor', function () {
    $prov = Proveedor::factory()->create(['nombre' => 'Old']);

    $this->putJson("/api/proveedores/{$prov->id}", ['nombre' => 'New'])
        ->assertStatus(200)
        ->assertJsonFragment(['nombre' => 'New']);

    $this->assertDatabaseHas('proveedores', ['id' => $prov->id, 'nombre' => 'New']);
});

it('can delete a proveedor', function () {
    $prov = Proveedor::factory()->create();

    $this->deleteJson("/api/proveedores/{$prov->id}")
        ->assertStatus(204);

    $this->assertDatabaseMissing('proveedores', ['id' => $prov->id]);
});

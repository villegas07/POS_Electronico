<?php

use App\Models\Venta;
use App\Models\FactusInvoice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

uses(RefreshDatabase::class);

it('dispatches SendFactusInvoice job and creates pending invoice', function () {
    \Illuminate\Support\Facades\Bus::fake();

    $venta = Venta::create(['usuario_id' => null, 'cliente_id' => null, 'total' => 100.0, 'impuesto' => 0, 'estado' => 'facturado']);

    $this->postJson('/api/factus/invoices', ['venta_id' => $venta->id])
        ->assertStatus(202);

    $this->assertDatabaseHas('factus_invoices', [
        'venta_id' => $venta->id,
        'status' => 'pending',
    ]);

    \Illuminate\Support\Facades\Bus::assertDispatched(\App\Jobs\SendFactusInvoice::class);
});

it('controller transforms venta into factus payload', function () {
    \Illuminate\Support\Facades\Bus::fake();

    $product = \App\Models\Producto::factory()->create(['precio_venta' => 1000, 'iva_porcentaje' => 19, 'nombre' => 'Prod A']);
    \App\Models\Stock::create(['producto_id' => $product->id, 'cantidad' => 10]);

    $venta = \App\Models\Venta::create(['usuario_id' => null, 'cliente_id' => null, 'total' => 1000, 'impuesto' => 0, 'estado' => 'facturado']);
    \App\Models\VentaItem::create(['venta_id' => $venta->id, 'producto_id' => $product->id, 'cantidad' => 1, 'precio_unitario' => 1000, 'subtotal' => 1000, 'impuesto' => 190, 'descuento' => 0]);

    $this->postJson('/api/factus/invoices', ['venta_id' => $venta->id])
        ->assertStatus(202);

    $invoice = \App\Models\FactusInvoice::first();
    expect($invoice)->not->toBeNull();
    expect($invoice->payload['items'][0]['descripcion'])->toBe('Prod A');
    expect((float) $invoice->payload['total'])->toBe(1000.0);
});

it('returns 422 when payload is invalid', function () {
    // missing items and missing cliente.numero_documento
    $badPayload = ['cliente' => ['tipo_documento' => 'CC']];

    $this->postJson('/api/factus/invoices', ['payload' => $badPayload])
        ->assertStatus(422);
});

it('job updates invoice to sent on successful API call', function () {
    Http::fake([
        '*' => Http::response(['id' => 'EXT-456', 'status' => 'ok'], 200),
    ]);

    $invoice = FactusInvoice::factory()->create(['status' => 'pending', 'payload' => ['items' => []]]);

    $job = new \App\Jobs\SendFactusInvoice($invoice);
    // call handle manually with real service which will use Http::fake
    $job->handle(app(\App\Services\FactusService::class));

    $invoice->refresh();

    expect($invoice->status)->toBe('sent');
    expect($invoice->external_id)->toBe('EXT-456');
});

it('job updates invoice to error when API returns non-2xx', function () {
    Http::fake([
        '*' => Http::response(['error' => 'bad request'], 400),
    ]);

    $invoice = FactusInvoice::factory()->create(['status' => 'pending', 'payload' => ['items' => []]]);

    $job = new \App\Jobs\SendFactusInvoice($invoice);

    try {
        $job->handle(app(\App\Services\FactusService::class));
    } catch (Throwable $e) {
        // job rethrows to allow queue to retry; ignore here
    }

    $invoice->refresh();

    expect($invoice->status)->toBe('error');
    expect($invoice->error_message)->not->toBeNull();
});

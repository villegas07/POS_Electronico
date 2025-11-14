<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FactusInvoice;
use App\Services\FactusService;
use App\Jobs\SendFactusInvoice;
use App\Services\FactusPayloadTransformer;
use App\Http\Requests\FactusInvoiceRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class FactusController extends Controller
{
    protected $service;

    public function __construct(FactusService $service, FactusPayloadTransformer $transformer)
    {
        $this->service = $service;
        $this->transformer = $transformer;
    }

    public function store(FactusInvoiceRequest $request)
    {
        $data = $request->validated();

        // If venta_id provided, build payload from Venta; otherwise normalize provided payload
        if (!empty($data['venta_id'])) {
            $venta = \App\Models\Venta::with('items.producto')->findOrFail($data['venta_id']);
            $payload = $this->transformer->transform($venta);
        } else {
            $payload = $this->transformer->transform($data['payload'] ?? []);
        }

        $invoice = FactusInvoice::create([
            'venta_id' => $data['venta_id'] ?? null,
            'payload' => $payload,
            'status' => 'pending',
        ]);

        // dispatch job to send asynchronously; controller returns pending invoice
        SendFactusInvoice::dispatch($invoice);

        return response()->json($invoice, Response::HTTP_ACCEPTED);
    }
}

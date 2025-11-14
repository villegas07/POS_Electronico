<?php

namespace App\Jobs;

use App\Models\FactusInvoice;
use App\Services\FactusService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendFactusInvoice implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $invoice;

    public $tries = 3;

    public function __construct(FactusInvoice $invoice)
    {
        $this->invoice = $invoice;
    }

    public function handle(FactusService $service)
    {
        // refresh to get latest state
        $invoice = FactusInvoice::find($this->invoice->id);

        if (!$invoice) {
            return;
        }

        try {
            $response = $service->sendInvoice($invoice->payload);

            $invoice->update([
                'response' => $response,
                'external_id' => $response['id'] ?? null,
                'status' => 'sent',
                'attempts' => ($invoice->attempts ?? 0) + 1,
            ]);
        } catch (\Throwable $e) {
            Log::warning('SendFactusInvoice failed for invoice '.$invoice->id, ['error' => $e->getMessage()]);
            $invoice->update([
                'status' => 'error',
                'error_message' => $e->getMessage(),
                'attempts' => ($invoice->attempts ?? 0) + 1,
            ]);

            // rethrow to let the queue decide retry/backoff based on $tries
            throw $e;
        }
    }
}

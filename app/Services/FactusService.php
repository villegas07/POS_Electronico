<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class FactusService
{
    protected $baseUrl;
    protected $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.factus.url') ?? env('FACTUS_API_URL');
        $this->apiKey = config('services.factus.key') ?? env('FACTUS_API_KEY');
    }

    /**
     * Send invoice payload to Factus API and return response array
     *
     * @param array $payload
     * @return array
     * @throws RequestException
     */
    public function sendInvoice(array $payload): array
    {
        $client = Http::withToken($this->apiKey)
            ->acceptJson();

        $response = $client->post(rtrim($this->baseUrl, '/') . '/invoices', $payload);

        if ($response->successful()) {
            return $response->json();
        }

        // throw an exception to be handled by caller
        $response->throw();
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FactusService;
use App\Services\FactusAuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class FactusInvoiceController extends Controller
{
    protected $factusService;
    protected $factusAuthService;

    public function __construct(FactusService $factusService, FactusAuthService $factusAuthService)
    {
        $this->factusService = $factusService;
        $this->factusAuthService = $factusAuthService;
    }

    /**
     * Get list of invoices from Factus API
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $baseUrl = config('services.factus.url') ?? env('FACTUS_API_URL');
            $accessToken = $this->factusAuthService->getAccessToken();

            $response = Http::withToken($accessToken)
                ->acceptJson()
                ->get(rtrim($baseUrl, '/') . '/bills');

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo obtener las facturas',
                'data' => []
            ], $response->status());
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    /**
     * Get single invoice by ID from Factus API
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $baseUrl = config('services.factus.url') ?? env('FACTUS_API_URL');
            $accessToken = $this->factusAuthService->getAccessToken();

            $response = Http::withToken($accessToken)
                ->acceptJson()
                ->get(rtrim($baseUrl, '/') . '/bills/' . $id);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Factura no encontrada',
                'data' => null
            ], $response->status());
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}

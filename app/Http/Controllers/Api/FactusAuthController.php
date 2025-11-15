<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FactusAuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FactusAuthController extends Controller
{
    protected $authService;

    public function __construct(FactusAuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Authenticate with Factus API
     *
     * @return JsonResponse
     */
    public function authenticate(): JsonResponse
    {
        try {
            $response = $this->authService->authenticate();

            return response()->json([
                'status' => 'success',
                'message' => 'Autenticación exitosa con Factus',
                'data' => $response['data'] ?? $response,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al autenticar con Factus: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Refresh the access token
     *
     * @return JsonResponse
     */
    public function refreshAccessToken(): JsonResponse
    {
        try {
            $response = $this->authService->refreshToken();

            return response()->json([
                'status' => 'success',
                'message' => 'Token refrescado exitosamente',
                'data' => $response['data'] ?? $response,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al refrescar token: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get current token status
     *
     * @return JsonResponse
     */
    public function status(): JsonResponse
    {
        try {
            $token = \App\Models\FactusToken::getLatest();

            if (!$token) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'No hay token disponible. Debe autenticarse primero.',
                    'data' => null,
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Estado del token obtenido',
                'data' => [
                    'is_expired' => $token->isExpired(),
                    'is_about_to_expire' => $token->isAboutToExpire(),
                    'expires_at' => $token->expires_at,
                    'created_at' => $token->created_at,
                    'refreshed_at' => $token->refreshed_at,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener estado del token: ' . $e->getMessage(),
            ], 500);
        }
    }
}

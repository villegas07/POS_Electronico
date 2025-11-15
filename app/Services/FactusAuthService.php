<?php

namespace App\Services;

use App\Models\FactusToken;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;
use Carbon\Carbon;

class FactusAuthService
{
    protected $baseUrl;
    protected $username;
    protected $password;

    public function __construct()
    {
        $this->baseUrl = config('services.factus.url') ?? env('FACTUS_API_URL');
        $this->username = config('services.factus.username') ?? env('FACTUS_USERNAME');
        $this->password = config('services.factus.password') ?? env('FACTUS_PASSWORD');
    }

    /**
     * Authenticate with Factus API and store the token
     *
     * @return array
     * @throws RequestException
     */
    public function authenticate(): array
    {
        $response = Http::post(rtrim($this->baseUrl, '/') . '/auth', [
            'username' => $this->username,
            'password' => $this->password,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            
            // Store the token in database
            $this->storeToken(
                $data['data']['access_token'] ?? null,
                $data['data']['refresh_token'] ?? null,
                $data['data']['expires_in'] ?? 3600 // Default 1 hour
            );

            return $data;
        }

        $response->throw();
    }

    /**
     * Refresh the access token using the refresh token
     *
     * @return array
     * @throws RequestException
     */
    public function refreshToken(): array
    {
        $latestToken = FactusToken::getLatest();

        if (!$latestToken || !$latestToken->refresh_token) {
            throw new \Exception('No refresh token available. Please authenticate first.');
        }

        $response = Http::post(rtrim($this->baseUrl, '/') . '/auth/refresh', [
            'refresh_token' => $latestToken->refresh_token,
        ]);

        if ($response->successful()) {
            $data = $response->json();

            // Update the token in database
            $this->storeToken(
                $data['data']['access_token'] ?? null,
                $data['data']['refresh_token'] ?? null,
                $data['data']['expires_in'] ?? 3600
            );

            return $data;
        }

        $response->throw();
    }

    /**
     * Get valid access token, refreshing if necessary
     *
     * @return string
     * @throws RequestException
     */
    public function getAccessToken(): string
    {
        $token = FactusToken::getLatest();

        if (!$token) {
            $response = $this->authenticate();
            $token = FactusToken::getLatest();
        }

        // If token is about to expire or expired, refresh it
        if ($token->isAboutToExpire() || $token->isExpired()) {
            $response = $this->refreshToken();
            $token = FactusToken::getLatest();
        }

        return $token->access_token;
    }

    /**
     * Store token in database
     *
     * @param string $accessToken
     * @param string|null $refreshToken
     * @param int $expiresIn Duration in seconds
     * @return FactusToken
     */
    protected function storeToken(string $accessToken, ?string $refreshToken, int $expiresIn): FactusToken
    {
        return FactusToken::create([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'expires_at' => now()->addSeconds($expiresIn),
        ]);
    }
}

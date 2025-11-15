<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FactusToken extends Model
{
    protected $fillable = [
        'access_token',
        'refresh_token',
        'expires_at',
        'refreshed_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'refreshed_at' => 'datetime',
    ];

    /**
     * Check if the current token is expired
     */
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    /**
     * Check if the current token is about to expire (within 5 minutes)
     */
    public function isAboutToExpire(): bool
    {
        return $this->expires_at->diffInMinutes(now()) <= 5;
    }

    /**
     * Get the latest valid token
     */
    public static function getLatest(): ?self
    {
        return self::latest('created_at')->first();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FactusInvoice extends Model
{
    use HasFactory;

    protected $table = 'factus_invoices';

    protected $fillable = [
        'venta_id',
        'external_id',
        'status',
        'payload',
        'response',
        'error_message',
        'attempts',
    ];

    protected $casts = [
        'payload' => 'array',
        'response' => 'array',
    ];
}

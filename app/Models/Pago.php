<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $table = 'pagos';

    protected $fillable = [
        'venta_id',
        'metodo',
        'monto',
        'datos',
    ];

    protected $casts = [
        'datos' => 'array',
    ];

    public function venta()
    {
        return $this->belongsTo(Venta::class);
    }
}

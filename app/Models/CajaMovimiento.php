<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CajaMovimiento extends Model
{
    use HasFactory;

    protected $table = 'caja_movimientos';

    protected $fillable = [
        'caja_id',
        'tipo',
        'descripcion',
        'monto',
        'referencia_id',
        'referencia_tipo',
    ];

    protected $casts = [
        'monto' => 'decimal:2',
    ];

    public function caja()
    {
        return $this->belongsTo(Caja::class);
    }

    // Tipos posibles: ingreso, egreso, venta, devolucion, ajuste
    public function getReferencia()
    {
        if ($this->referencia_tipo && $this->referencia_id) {
            return $this->morphTo('referencia', $this->referencia_tipo, $this->referencia_id);
        }
        return null;
    }
}

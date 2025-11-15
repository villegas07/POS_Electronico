<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caja extends Model
{
    use HasFactory;

    protected $table = 'cajas';

    protected $fillable = [
        'usuario_id',
        'monto_inicial',
        'monto_final',
        'saldo_actual',
        'total_ventas',
        'total_devoluciones',
        'fecha_apertura',
        'fecha_cierre',
        'estado',
        'diferencia',
        'observaciones',
    ];

    protected $casts = [
        'monto_inicial' => 'decimal:2',
        'monto_final' => 'decimal:2',
        'saldo_actual' => 'decimal:2',
        'total_ventas' => 'decimal:2',
        'total_devoluciones' => 'decimal:2',
        'diferencia' => 'decimal:2',
        'fecha_apertura' => 'datetime',
        'fecha_cierre' => 'datetime',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function movimientos()
    {
        return $this->hasMany(CajaMovimiento::class);
    }

    public function ventas()
    {
        return $this->hasMany(Venta::class, 'caja_id');
    }

    // Calcular diferencia entre monto esperado y monto final
    public function calcularDiferencia()
    {
        $montoEsperado = $this->monto_inicial + $this->total_ventas - $this->total_devoluciones;
        $this->diferencia = $this->monto_final - $montoEsperado;
        return $this->diferencia;
    }
}

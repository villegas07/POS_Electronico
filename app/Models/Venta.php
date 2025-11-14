<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $table = 'ventas';

    protected $fillable = [
        'usuario_id',
        'cliente_id',
        'total',
        'impuesto',
        'estado',
    ];

    public function items()
    {
        return $this->hasMany(VentaItem::class);
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMovimiento extends Model
{
    use HasFactory;

    protected $table = 'stock_movimientos';

    protected $fillable = [
        'producto_id',
        'tipo',
        'cantidad',
        'motivo',
        'referencia_id',
        'user_id',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

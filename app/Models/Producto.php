<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = [
        'sku',
        'nombre',
        'descripcion',
        'precio_venta',
        'costo',
        'iva_porcentaje',
        'stock_minimo',
        'unidad',
        'activo',
        'proveedor_id',
    ];

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }

    public function movimientos()
    {
        return $this->hasMany(StockMovimiento::class);
    }
}

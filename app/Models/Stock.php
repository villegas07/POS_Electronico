<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $table = 'stocks';

    protected $fillable = [
        'producto_id',
        'cantidad',
        'almacen_id',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}

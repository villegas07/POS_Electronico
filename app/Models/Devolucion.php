<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devolucion extends Model
{
    use HasFactory;

    protected $table = 'devoluciones';

    protected $fillable = ['venta_id', 'user_id'];

    public function items()
    {
        return $this->hasMany(DevolucionItem::class);
    }
}

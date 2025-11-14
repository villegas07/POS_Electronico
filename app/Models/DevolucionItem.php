<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DevolucionItem extends Model
{
    use HasFactory;

    protected $table = 'devolucion_items';

    protected $fillable = ['devolucion_id', 'producto_id', 'cantidad'];
}

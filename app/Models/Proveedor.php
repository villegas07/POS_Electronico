<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    use HasFactory;

    protected $table = 'proveedores';

    protected $fillable = [
        'nit',
        'nombre',
        'nombre_contacto',
        'email',
        'telefono',
        'direccion',
        'nota',
    ];

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
}

<?php

namespace Database\Factories;

use App\Models\Producto;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductoFactory extends Factory
{
    protected $model = Producto::class;

    public function definition()
    {
        return [
            'sku' => 'SKU-' . $this->faker->unique()->numerify('###'),
            'nombre' => $this->faker->word,
            'descripcion' => $this->faker->sentence,
            'precio_venta' => $this->faker->numberBetween(1000, 50000),
            'costo' => $this->faker->numberBetween(500, 30000),
            'iva_porcentaje' => 19.00,
            'stock_minimo' => $this->faker->numberBetween(0, 10),
            'unidad' => 'unidad',
            'activo' => true,
        ];
    }
}

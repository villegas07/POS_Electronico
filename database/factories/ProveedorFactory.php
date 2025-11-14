<?php

namespace Database\Factories;

use App\Models\Proveedor;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProveedorFactory extends Factory
{
    protected $model = Proveedor::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->company,
            'nit' => $this->faker->numerify('900######-#'),
            'contacto' => $this->faker->firstName,
            'email' => $this->faker->unique()->companyEmail,
            'telefono' => $this->faker->phoneNumber,
            'direccion' => $this->faker->address,
            'notas' => null,
        ];
    }
}

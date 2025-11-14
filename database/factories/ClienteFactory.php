<?php

namespace Database\Factories;

use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    protected $model = Cliente::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->name,
            'documento' => $this->faker->numerify('1########'),
            'email' => $this->faker->safeEmail,
            'tax_exempt' => false,
        ];
    }
}

<?php

namespace Database\Seeders;

use App\Models\Cliente;
use Illuminate\Database\Seeder;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cliente predeterminado para venta sin datos
        Cliente::firstOrCreate(
            ['documento' => 'CONSUMIDOR'],
            [
                'nombre' => 'Consumidor Final',
                'email' => null,
                'telefono' => null,
                'direccion' => null,
                'tax_exempt' => false,
            ]
        );
    }
}

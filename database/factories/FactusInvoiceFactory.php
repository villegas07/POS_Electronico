<?php

namespace Database\Factories;

use App\Models\FactusInvoice;
use Illuminate\Database\Eloquent\Factories\Factory;

class FactusInvoiceFactory extends Factory
{
    protected $model = FactusInvoice::class;

    public function definition()
    {
        return [
            'venta_id' => null,
            'external_id' => null,
            'status' => 'pending',
            'payload' => ['items' => []],
            'response' => null,
            'error_message' => null,
            'attempts' => 0,
        ];
    }
}

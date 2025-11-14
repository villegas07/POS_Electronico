<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Esta migración fue necesaria para actualizar la estructura anterior
        // Ya no es necesaria porque la migración original crea la tabla correctamente
        // Se mantiene para referencia histórica
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No hay cambios que revertir
    }
};

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
        Schema::create('caja_movimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('caja_id')->constrained('cajas')->onDelete('cascade');
            $table->enum('tipo', ['ingreso', 'egreso', 'venta', 'devolucion', 'ajuste', 'apertura', 'cierre']);
            $table->string('descripcion');
            $table->decimal('monto', 10, 2);
            $table->nullableMorphs('referencia');
            $table->timestamps();

            $table->index(['caja_id', 'tipo']);
            $table->index(['created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caja_movimientos');
    }
};

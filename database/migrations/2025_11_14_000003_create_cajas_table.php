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
        Schema::create('cajas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usuario_id')->constrained('users')->onDelete('restrict');
            $table->decimal('monto_inicial', 10, 2)->default(0);
            $table->decimal('monto_final', 10, 2)->nullable();
            $table->decimal('saldo_actual', 10, 2)->default(0);
            $table->decimal('total_ventas', 10, 2)->default(0);
            $table->decimal('total_devoluciones', 10, 2)->default(0);
            $table->decimal('diferencia', 10, 2)->nullable();
            $table->dateTime('fecha_apertura');
            $table->dateTime('fecha_cierre')->nullable();
            $table->enum('estado', ['abierta', 'cerrada', 'suspendida'])->default('abierta');
            $table->text('observaciones')->nullable();
            $table->timestamps();

            $table->index(['usuario_id', 'estado']);
            $table->index(['fecha_apertura']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cajas');
    }
};

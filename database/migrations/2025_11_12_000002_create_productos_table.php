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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->decimal('precio_venta', 12, 2)->default(0);
            $table->decimal('costo', 12, 2)->default(0);
            $table->decimal('iva_porcentaje', 5, 2)->default(0);
            $table->integer('stock_minimo')->default(0);
            $table->string('unidad')->nullable();
            $table->boolean('activo')->default(true);
            $table->foreignId('proveedor_id')->nullable()->constrained('proveedores')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};

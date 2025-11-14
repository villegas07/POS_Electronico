<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('venta_id');
            $table->string('metodo'); // cash|card|transfer|other
            $table->decimal('monto', 15, 2);
            $table->json('datos')->nullable(); // datos de transacción (card token, referencia)
            $table->timestamps();

            $table->foreign('venta_id')->references('id')->on('ventas')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pagos');
    }
};

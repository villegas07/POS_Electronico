<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('factus_invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('venta_id')->nullable();
            $table->string('external_id')->nullable()->index();
            $table->string('status')->default('pending'); // pending|sent|error
            $table->json('payload');
            $table->json('response')->nullable();
            $table->string('error_message')->nullable();
            $table->integer('attempts')->default(0);
            $table->timestamps();

            // optional foreign key; keep nullable to avoid migration ordering issues
            // $table->foreign('venta_id')->references('id')->on('ventas')->nullOnDelete();
            $table->index(['venta_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('factus_invoices');
    }
};

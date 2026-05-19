<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {

            $table->id('id_pedido');

            $table->unsignedBigInteger('id_mesa');

            $table->dateTime('fecha')->useCurrent();

            $table->enum('estado', [
                'pendiente',
                'preparando',
                'entregado',
                'pagado',
                'cancelado'
            ])->default('pendiente');

            $table->decimal('total', 10, 2)->default(0.00);

            $table->foreign('id_mesa')
                  ->references('id_mesa')
                  ->on('mesas');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};

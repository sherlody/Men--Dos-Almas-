<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ventas', function (Blueprint $table) {

            $table->id('id_venta');

            $table->unsignedBigInteger('id_pedido')->unique();

            $table->dateTime('fecha_venta')->useCurrent();

            $table->decimal('total', 10, 2);

            $table->enum('metodo_pago', [
                'efectivo',
                'tarjeta',
                'transferencia'
            ])->default('efectivo');

            $table->foreign('id_pedido')
                  ->references('id_pedido')
                  ->on('pedidos');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};

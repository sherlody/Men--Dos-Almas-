<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detalles_pedido', function (Blueprint $table) {

            $table->id('id_detalle');

            $table->unsignedBigInteger('id_pedido');

            $table->unsignedBigInteger('id_producto');

            $table->integer('cantidad');

            $table->decimal('precio_unitario', 10, 2);

            $table->decimal('subtotal', 10, 2);

            $table->foreign('id_pedido')
                  ->references('id_pedido')
                  ->on('pedidos');

            $table->foreign('id_producto')
                  ->references('id_producto')
                  ->on('productos');
        });

        DB::statement("
            ALTER TABLE detalles_pedido
            MODIFY subtotal DECIMAL(10,2)
            GENERATED ALWAYS AS (cantidad * precio_unitario) STORED
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('detalles_pedido');
    }
};

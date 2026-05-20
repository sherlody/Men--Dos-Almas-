<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {

            $table->id('id_producto');

            $table->string('clave', 30)->unique();

            $table->string('nombre_producto', 100);

            $table->text('descripcion')->nullable();

            $table->decimal('precio', 10, 2);

            $table->boolean('disponible')->default(true);

            $table->string('imagen')->nullable();

            $table->boolean('recomendacion')->default(false);

            $table->boolean('preferencia')->default(false);

            $table->unsignedBigInteger('id_categoria')->nullable();

            $table->foreign('id_categoria')
                  ->references('id_categoria')
                  ->on('categorias');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};

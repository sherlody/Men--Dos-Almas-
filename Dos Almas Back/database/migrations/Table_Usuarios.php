<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('id_usuario');

            $table->string('nombre', 100);

            $table->string('telefono', 15)->nullable();

            $table->string('username', 50)->unique();

            $table->string('password');

            $table->unsignedBigInteger('id_rol');

            $table->foreign('id_rol')
                  ->references('id_rol')
                  ->on('roles');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};

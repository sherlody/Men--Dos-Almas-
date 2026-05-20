<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mesas', function (Blueprint $table) {

            $table->id('id_mesa');

            $table->integer('num_mesa')->unique();

            $table->boolean('disponible')->default(true);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mesas');
    }
};

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categorias')->insert([
            [
                'id_categoria' => 1,
                'nombre_categoria' => 'Snacks'
            ],
            [
                'id_categoria' => 2,
                'nombre_categoria' => 'Bebidas calientes'
            ],
            [
                'id_categoria' => 3,
                'nombre_categoria' => 'Bebidas frías'
            ],
            [
                'id_categoria' => 4,
                'nombre_categoria' => 'Bebidas frías a base de café'
            ],
            [
                'id_categoria' => 5,
                'nombre_categoria' => 'Cervezas'
            ]
        ]);
    }
}

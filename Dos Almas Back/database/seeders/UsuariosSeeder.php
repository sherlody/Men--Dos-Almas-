<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('usuarios')->insert([
            [
                'id_usuario' => 1,
                'nombre' => 'Sherlin Magaña Peralta',
                'telefono' => '9514204276',
                'username' => 'sherlin123',
                'password' => Hash::make('toto-122'),
                'id_rol' => 1
            ],
            [
                'id_usuario' => 2,
                'nombre' => 'Alejandro',
                'telefono' => '9999',
                'username' => 'cocinero123',
                'password' => Hash::make('1234'),
                'id_rol' => 2
            ],
            [
                'id_usuario' => 3,
                'nombre' => 'Jose',
                'telefono' => '95100',
                'username' => 'mesas123',
                'password' => Hash::make('mesa-122'),
                'id_rol' => 3
            ]
        ]);
    }
}

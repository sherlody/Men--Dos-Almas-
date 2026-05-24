<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MesasSeeder extends Seeder
{
    public function run(): void
    {
        // Insertamos las 4 mesas que tienes en tu React
        $mesas = [1, 2, 3, 4];

        foreach ($mesas as $num) {
            DB::table('mesas')->insertOrIgnore([
                'num_mesa' => $num,
                'disponible' => true
            ]);
        }
    }
}
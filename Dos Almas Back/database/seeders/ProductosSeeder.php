<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('productos')->insert([
            ['id_producto' => 1, 'clave' => 's-01', 'nombre_producto' => 'Nachos', 'precio' => 55, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/nachos.jpeg', 'recomendacion' => 1, 'preferencia' => 1, 'id_categoria' => 1],
            ['id_producto' => 2, 'clave' => 's-02', 'nombre_producto' => 'Papas a la francesa', 'precio' => 45, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/papas-francesa.jpeg', 'recomendacion' => 1, 'preferencia' => 1, 'id_categoria' => 1],
            ['id_producto' => 3, 'clave' => 's-03', 'nombre_producto' => 'Papas dos almas', 'precio' => 40, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/papas-dos-almas.jpeg', 'recomendacion' => 1, 'preferencia' => 1, 'id_categoria' => 1],
            ['id_producto' => 4, 'clave' => 's-04', 'nombre_producto' => 'Maruchan', 'precio' => 40, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/maruchan.jpeg', 'recomendacion' => 1, 'preferencia' => 0, 'id_categoria' => 1],
            ['id_producto' => 5, 'clave' => 's-05', 'nombre_producto' => 'Fresas con crema', 'precio' => 60, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/fresas.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 1],
            ['id_producto' => 6, 'clave' => 's-06', 'nombre_producto' => 'Mini hot cakes', 'precio' => 45, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/mini-hotcakes.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 1],
            ['id_producto' => 7, 'clave' => 's-07', 'nombre_producto' => 'Waffles', 'precio' => 55, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/waffles.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 1],
            ['id_producto' => 9, 'clave' => 'c-01', 'nombre_producto' => 'Latte', 'precio' => 45, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/latte-caliente.jpeg', 'recomendacion' => 1, 'preferencia' => 0, 'id_categoria' => 2],
            ['id_producto' => 10, 'clave' => 'c-02', 'nombre_producto' => 'Latte moka', 'precio' => 50, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/moka-caliente.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 2],
            ['id_producto' => 11, 'clave' => 'c-03', 'nombre_producto' => 'Capuccino', 'precio' => 50, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/capuccino-caliente.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 2],
            ['id_producto' => 12, 'clave' => 'c-04', 'nombre_producto' => 'Caramel macchiato', 'precio' => 55, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/caramel-caliente.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 2],
            ['id_producto' => 13, 'clave' => 'c-05', 'nombre_producto' => 'Horchata', 'precio' => 55, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/horchata.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 2],
            ['id_producto' => 14, 'clave' => 'c-06', 'nombre_producto' => 'Tisana frutal', 'precio' => 45, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/tisana.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 2],
            ['id_producto' => 15, 'clave' => 'c-07', 'nombre_producto' => 'Té', 'precio' => 25, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/te.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 2],
            ['id_producto' => 16, 'clave' => 'f-01', 'nombre_producto' => 'Frappe', 'precio' => 50, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/frappe.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 3],
            ['id_producto' => 17, 'clave' => 'f-02', 'nombre_producto' => 'Smoothie', 'precio' => 45, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/smoothie.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 3],
            ['id_producto' => 18, 'clave' => 'f-03', 'nombre_producto' => 'Sodas italianas', 'precio' => 45, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/soda-italiana.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 3],
            ['id_producto' => 19, 'clave' => 'f-04', 'nombre_producto' => 'Chocomilk', 'precio' => 30, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/chocomilk.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 3],
            ['id_producto' => 20, 'clave' => 'f-05', 'nombre_producto' => 'Licuados', 'precio' => 40, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/licuado.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 3],
            ['id_producto' => 21, 'clave' => 't-01', 'nombre_producto' => 'Michelada tarro', 'precio' => 55, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/michelada-tarro.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 5],
            ['id_producto' => 22, 'clave' => 't-02', 'nombre_producto' => 'Michelada 1Lt', 'precio' => 100, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/michelada-litro.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 5],
            ['id_producto' => 23, 'clave' => 't-03', 'nombre_producto' => 'Cerveza 1/2', 'precio' => 25, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/cerveza.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 5],
            ['id_producto' => 24, 'clave' => 't-04', 'nombre_producto' => 'Caguama', 'precio' => 70, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/caguama.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 5],
            ['id_producto' => 25, 'clave' => 'fc-01', 'nombre_producto' => 'Latte', 'precio' => 50, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/latte-frio.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 4],
            ['id_producto' => 26, 'clave' => 'fc-02', 'nombre_producto' => 'Latte moka', 'precio' => 55, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/moka-frio.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 4],
            ['id_producto' => 27, 'clave' => 'fc-03', 'nombre_producto' => 'Capuccino', 'precio' => 55, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/capuccino-frio.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 4],
            ['id_producto' => 28, 'clave' => 'fc-04', 'nombre_producto' => 'Caramel macchiato', 'precio' => 60, 'disponible' => 1, 'imagen' => 'http://localhost:8000/imagenes/caramel-frio.jpeg', 'recomendacion' => 0, 'preferencia' => 0, 'id_categoria' => 4],
        ]);
    }
}

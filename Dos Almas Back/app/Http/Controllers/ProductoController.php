<?php

namespace App\Http\Controllers;

use App\Models\Productos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
    public function getMenu()
    {
        // 1. Obtener Preferencias (Lo más pedido)
        $preferencias = Productos::where('disponible', 1)
            ->where('preferencia', 1)
            ->get();

        // 2. Obtener Recomendados
        $recomendados = Productos::where('disponible', 1)
            ->where('recomendacion', 1)
            ->get();

        // 3. Obtener el resto agrupado por categorías
        // Traemos las categorías y sus productos relacionados
        $categorias = DB::table('categorias')->get();
        
        $menuCategorias = [];
        foreach ($categorias as $cat) {
            $productos = Productos::where('id_categoria', $cat->id_categoria)
                ->where('disponible', 1)
                ->get();
            
            if ($productos->isNotEmpty()) {
                $menuCategorias[] = [
                    'titulo' => $cat->nombre_categoria,
                    'items' => $productos
                ];
            }
        }

        return response()->json([
            'preferencias' => $preferencias,
            'recomendados' => $recomendados,
            'categorias' => $menuCategorias
        ]);
    }
}
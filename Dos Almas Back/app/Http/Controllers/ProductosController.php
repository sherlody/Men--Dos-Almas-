<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Productos;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ProductosController extends Controller
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

    public function obtenerProductos()
    {
        $productos = Productos::join(
                'categorias',
                'productos.id_categoria',
                '=',
                'categorias.id_categoria'
            )
            ->select(
                'productos.id_producto',
                'productos.clave',
                'productos.nombre_producto',
                'productos.precio',
                'productos.imagen',
                'categorias.nombre_categoria'
            )
            ->orderBy(
                'productos.id_producto', 'asc'
            )
            ->get();


        return response()->json($productos);
    }

    public function guardarProducto(Request $request)
    {
        $request->validate([

            'clave' => 'required',

            'nombre_producto' => 'required',

            'precio' => 'required|numeric',

            'imagen' => 'required',

            'id_categoria' => 'required'
        ]);

        $producto = Productos::create([

            'clave' => $request->clave,

            'nombre_producto' => $request->nombre_producto,

            'precio' => $request->precio,

            'imagen' => $request->imagen,

            'id_categoria' => $request->id_categoria,

            'disponible' => 1,

            'preferencia' => 0,

            'recomendacion' => 0
        ]);

        return response()->json([
            'success' => true,
            'producto' => $producto
        ]);
    }

    public function editar(Request $request, $id)
    {
        $producto = Productos::find($id);

        if (!$producto) {
            return response()->json([
                'message' => 'Producto no encontrado'
            ], 404);
        }

        $producto->clave = $request->clave;
        $producto->nombre_producto = $request->nombre_producto;
        $producto->precio = $request->precio;
        $producto->imagen = $request->imagen;
        $producto->id_categoria = $request->id_categoria;

        $producto->save();

        return response()->json([
            'success' => true,
            'message' => 'Producto actualizado'
        ]);
    }

    public function recomendar($id)
    {
        $producto = Productos::find($id);

        if (!$producto) {

            return response()->json([
                'message' => 'Producto no encontrado'
            ], 404);
        }

        $producto->recomendacion = 1;

        $producto->save();

        return response()->json([
            'success' => true
        ]);
    }

    public function limpiarRecomendaciones()
    {
        Productos::query()->update([
            'recomendacion' => 0
        ]);

        return response()->json([
            'success' => true
        ]);
    }
}

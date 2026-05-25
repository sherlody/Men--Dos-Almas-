<?php

namespace App\Http\Controllers;

use App\Models\Categorias;

class CategoriasController extends Controller
{
    // =========================================
    // OBTENER TODAS LAS CATEGORIAS
    // =========================================
    public function index()
    {
        $categorias = Categorias::all();

        return response()->json($categorias);
    }
}

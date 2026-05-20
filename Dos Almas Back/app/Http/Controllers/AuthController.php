<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $usuario = DB::table('usuarios')
            ->where('username', $request->username)
            ->first();

        // Verificar usuario
        if (!$usuario) {

            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 401);
        }

        // Verificar contraseña
        if (!Hash::check($request->password, $usuario->password)) {

            return response()->json([
                'message' => 'Contraseña incorrecta'
            ], 401);
        }

        return response()->json([
            'message' => 'Login correcto',
            'usuario' => $usuario
        ]);
    }
}

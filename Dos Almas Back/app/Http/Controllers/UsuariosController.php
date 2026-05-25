<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosController extends Controller
{
    // =========================================
    // LISTAR USUARIOS
    // =========================================
    public function index()
    {
        $usuarios = DB::table('usuarios')
            ->join('roles', 'usuarios.id_rol', '=', 'roles.id_rol')
            ->select(
                'usuarios.id_usuario',
                'usuarios.nombre',
                'usuarios.telefono',
                'usuarios.username',
                'usuarios.id_rol',
                'roles.nombre_rol'
            )
            ->get();

        return response()->json($usuarios);
    }

    // =========================================
    // LISTAR ROLES
    // =========================================
    public function roles()
    {
        return DB::table('roles')->get();
    }

    // =========================================
    // GUARDAR USUARIO
    // =========================================
    public function store(Request $request)
    {
        DB::table('usuarios')->insert([

            'nombre' => $request->nombre,

            'telefono' => $request->telefono,

            'username' => $request->username,

            'password' => Hash::make($request->password),

            'id_rol' => $request->id_rol
        ]);

        return response()->json([
            'success' => true
        ]);
    }

    // =========================================
    // ACTUALIZAR USUARIO
    // =========================================
    public function update(Request $request, $id)
    {
        $datos = [

            'nombre' => $request->nombre,

            'telefono' => $request->telefono,

            'username' => $request->username,

            'id_rol' => $request->id_rol
        ];

        // SOLO ACTUALIZA PASSWORD SI EXISTE
        if ($request->password) {

            $datos['password'] =
                Hash::make($request->password);
        }

        DB::table('usuarios')
            ->where('id_usuario', $id)
            ->update($datos);

        return response()->json([
            'success' => true
        ]);
    }
}

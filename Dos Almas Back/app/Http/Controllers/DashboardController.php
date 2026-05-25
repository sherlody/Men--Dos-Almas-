<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function dashboardHome()
    {
        // =========================================
        // FECHA ACTUAL
        // =========================================
        $hoy = Carbon::today();

        // =========================================
        // TOTAL VENTAS HOY
        // =========================================
        $ventasHoy = DB::table('ventas')
            ->whereDate('fecha_venta', $hoy)
            ->sum('total');

        // =========================================
        // MESAS ATENDIDAS HOY
        // =========================================
        $mesasHoy = DB::table('ventas')
            ->join('pedidos', 'ventas.id_pedido', '=', 'pedidos.id_pedido')
            ->whereDate('ventas.fecha_venta', $hoy)
            ->pluck('pedidos.id_mesa');

        // =========================================
        // PRODUCTOS PREFERIDOS
        // =========================================
        $productosPreferidos = DB::table('productos')
            ->where('preferencia', 1)
            ->select(
                'id_producto',
                'nombre_producto',
                'precio',
                'imagen'
            )
            ->get();

        return response()->json([
            'ventas_hoy' => $ventasHoy,
            'mesas_hoy' => $mesasHoy,
            'productos_preferidos' => $productosPreferidos
        ]);
    }
}

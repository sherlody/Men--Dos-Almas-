<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Venta;
use App\Models\Pedido;
use App\Models\Mesa;

class VentasController extends Controller
{
    public function cobrarPedido(Request $request, $id)
    {
        $request->validate([
            'metodo_pago' => 'required|string'
        ]);

        // Buscar pedido
        $pedido = Pedido::find($id);

        if (!$pedido) {

            return response()->json([
                'success' => false,
                'mensaje' => 'Pedido no encontrado'
            ], 404);
        }

        // Verificar si ya existe venta
        $ventaExistente = Venta::where(
            'id_pedido',
            $pedido->id_pedido
        )->first();

        if ($ventaExistente) {

            return response()->json([
                'success' => false,
                'mensaje' => 'Este pedido ya fue cobrado'
            ], 400);
        }

        // Crear venta
        Venta::create([

            'id_pedido' => $pedido->id_pedido,

            'total' => $pedido->total,

            'metodo_pago' => $request->metodo_pago
        ]);

        // Cambiar estado
        $pedido->estado = 'pagado';

        $pedido->save();

        // Liberar mesa
        $mesa = Mesa::find($pedido->id_mesa);

        if ($mesa) {

            $mesa->disponible = true;

            $mesa->save();
        }

        return response()->json([
            'success' => true,
            'mensaje' => 'Venta registrada correctamente'
        ]);
    }
}

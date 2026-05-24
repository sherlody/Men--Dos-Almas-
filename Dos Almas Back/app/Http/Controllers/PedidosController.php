<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\DetallePedido;
use App\Models\Mesa; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidosController extends Controller
{
    // Función que ya tenías (se queda igual)
    public function procesarOrden(Request $request)
    {
        $request->validate([
            'id_mesa' => 'required|integer', 
            'total' => 'required|numeric',
            'productos' => 'required|array'
        ]);

        try {
            DB::beginTransaction();

            $mesa = Mesa::where('num_mesa', $request->id_mesa)->first();

            if (!$mesa) {
                return response()->json([
                    'success' => false,
                    'mensaje' => 'La mesa seleccionada no existe en el sistema.'
                ], 404);
            }

            $pedido = new Pedido();
            $pedido->id_mesa = $mesa->id_mesa; 
            $pedido->total = $request->total;
            $pedido->estado = 'pendiente'; 
            $pedido->save();

            foreach ($request->productos as $item) {
                $detalle = new DetallePedido();
                $detalle->id_pedido = $pedido->id_pedido; 
                $detalle->id_producto = $item['id_producto'];
                $detalle->cantidad = $item['cantidad'];
                $detalle->precio_unitario = floatval($item['precio']); 
                $detalle->save();
            }

            $mesa->disponible = false;
            $mesa->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'mensaje' => '¡Orden enviada a cocina exitosamente!',
                'id_pedido' => $pedido->id_pedido
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'mensaje' => 'Hubo un error al procesar el pedido.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // --- NUEVAS FUNCIONES PARA LA COCINA ---

    // 1. Obtener pedidos para la pantalla del cocinero
    public function obtenerPedidosActivos()
    {
        // Traemos pedidos con estado pendiente o preparando, y anexamos la información de mesa y productos
        $pedidos = Pedido::with(['detalles.producto', 'mesa'])
            ->whereIn('estado', ['pendiente', 'preparando'])
            ->get()
            ->map(function($pedido) {
                return [
                    'id' => $pedido->id_pedido,
                    'mesa' => str_pad($pedido->mesa->num_mesa, 2, '0', STR_PAD_LEFT),
                    'estado' => $pedido->estado,
                    'items' => $pedido->detalles->map(function($d) {
                        // Concatenamos "Cantidad x NombreProducto" (Ej: "2x Hamburguesa")
                        return $d->cantidad . 'x ' . ($d->producto ? $d->producto->nombre_producto : 'Producto eliminado');
                    })
                ];
            });

        return response()->json($pedidos);
    }

    // 2. Actualizar el estado del pedido al darle clic en "Comenzar" u "Orden Lista"
    public function actualizarEstado(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|string'
        ]);

        $pedido = Pedido::find($id);
        
        if($pedido) {
            $pedido->estado = $request->estado;
            $pedido->save();
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'mensaje' => 'Pedido no encontrado'], 404);
    }


// Función para que el DashboardCliente consulte cómo va su pedido
    public function verEstadoPedido($id)
    {
        $pedido = Pedido::find($id);
        
        if ($pedido) {
            return response()->json(['estado' => $pedido->estado]);
        }

        return response()->json(['error' => 'Pedido no encontrado'], 404);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\DetallePedido;
use App\Models\Mesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidosController extends Controller
{
    // --- 1. NUEVAS FUNCIONES PARA CONTROL DE MESAS ---

    public function obtenerEstadoMesas() 
    {
        try {
            // Esto obtiene todas las mesas para la PaginaPrincipal
            return response()->json(Mesa::all(['num_mesa', 'disponible']));
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function verificarDisponibilidadMesa($num_mesa)
    {
        // Esto verifica una sola mesa cuando entras al DashboardCliente
        $mesa = Mesa::where('num_mesa', $num_mesa)->first();
        
        if (!$mesa) {
            return response()->json(['disponible' => false, 'mensaje' => 'Mesa no encontrada'], 404);
        }
        
        // Forzamos que sea un booleano puro
        $estaDisponible = ($mesa->disponible == 1 || $mesa->disponible == true);

        return response()->json([
            'disponible' => $estaDisponible,
            'mensaje' => $estaDisponible ? 'Libre' : 'Ocupada'
        ]);
    }

    // --- 2. TUS FUNCIONES ORIGINALES ---

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
            $pedido->solicita_pago = false; // Inicializamos en falso
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

    public function obtenerPedidosActivos()
    {
        $pedidos = Pedido::with(['detalles.producto', 'mesa'])
            ->whereIn('estado', ['pendiente', 'preparando'])
            ->get()
            ->map(function($pedido) {
                return [
                    'id' => $pedido->id_pedido,
                    'mesa' => str_pad($pedido->mesa->num_mesa, 2, '0', STR_PAD_LEFT),
                    'estado' => $pedido->estado,
                    'items' => $pedido->detalles->map(function($d) {
                        return $d->cantidad . 'x ' . ($d->producto ? $d->producto->nombre_producto : 'Producto eliminado');
                    })
                ];
            });

        return response()->json($pedidos);
    }

    public function obtenerPedidosMesero()
    {
        $pedidos = Pedido::with(['detalles.producto', 'mesa'])
            ->whereIn('estado', ['pendiente', 'preparando', 'listo', 'entregado'])
            ->get()
            ->map(function($pedido) {
                return [
                    'id' => $pedido->id_pedido,
                    'mesa' => str_pad($pedido->mesa->num_mesa, 2, '0', STR_PAD_LEFT),
                    'estado' => $pedido->estado,
                    'solicita_pago' => $pedido->solicita_pago,
                    'items' => $pedido->detalles->map(function($d) {
                        return $d->cantidad . 'x ' . ($d->producto ? $d->producto->nombre_producto : 'Producto eliminado');
                    })
                ];
            });

        return response()->json($pedidos);
    }

    public function actualizarEstado(Request $request, $id)
    {
        $request->validate(['estado' => 'required|string']);
        $pedido = Pedido::with('mesa')->find($id);

        if (!$pedido) {
            return response()->json(['success' => false, 'mensaje' => 'Pedido no encontrado'], 404);
        }

        $estadosValidos = ['pendiente', 'preparando', 'listo', 'entregado', 'pagado'];
        if (!in_array($request->estado, $estadosValidos)) {
            return response()->json(['success' => false, 'mensaje' => 'Estado inválido'], 400);
        }

        $pedido->estado = $request->estado;

        // Si se marca como pagado, reseteamos la alerta de pago y liberamos mesa
        if ($request->estado === 'pagado') {
            $pedido->solicita_pago = false; 
            $pedido->mesa->disponible = true;
            $pedido->mesa->save();
        }

        $pedido->save();
        return response()->json(['success' => true]);
    }

    public function verEstadoPedido($id)
    {
        $pedido = Pedido::find($id);
        if ($pedido) {
            return response()->json(['estado' => $pedido->estado]);
        }
        return response()->json(['error' => 'Pedido no encontrado'], 404);
    }

    // --- NUEVAS FUNCIONES PARA NOTIFICACIÓN DE PAGO ---

    // 1. El cliente activa la alerta
    public function solicitarPago($id)
    {
        $pedido = Pedido::find($id);
        if (!$pedido) {
            return response()->json(['success' => false, 'mensaje' => 'Pedido no encontrado'], 404);
        }

        $pedido->solicita_pago = true;
        $pedido->save();

        return response()->json([
            'success' => true,
            'mensaje' => 'Mesero notificado'
        ]);
    }

    // 2. El mesero consulta quiénes quieren pagar
    public function obtenerAlertasPago()
    {
        $pedidosConAlerta = Pedido::with('mesa')
            ->where('solicita_pago', true)
            ->where('estado', '!=', 'pagado')
            ->get()
            ->map(function($p) {
                return [
                    'id_pedido' => $p->id_pedido,
                    'mesa' => $p->mesa->num_mesa
                ];
            });

        return response()->json($pedidosConAlerta);
    }
}
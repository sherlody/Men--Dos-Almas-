<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\VentasController;
use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UsuariosController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/categorias', [CategoriasController::class, 'index']);
Route::get('/menu', [ProductosController::class, 'getMenu']);
Route::post('/ordenar', [PedidosController::class, 'procesarOrden']);
Route::get('/pedidos-activos', [PedidosController::class, 'obtenerPedidosActivos']);
Route::put('/pedido/{id}/estado', [PedidosController::class, 'actualizarEstado']);
Route::get('/pedido/{id}/estado', [PedidosController::class, 'verEstadoPedido']);
Route::get('/pedidos-mesero', [PedidosController::class, 'obtenerPedidosMesero']);
Route::post('/pedido/{id}/cobrar', [VentasController::class, 'cobrarPedido']);
Route::get('/productos-obtener', [ProductosController::class, 'obtenerProductos']);
Route::post('/productos-guardar', [ProductosController::class, 'guardarProducto']);
Route::put('/productos-editar/{id}', [ProductosController::class, 'editar']);
Route::put('/productos-recomendar/{id}/recomendar', [ProductosController::class, 'recomendar']);
Route::put('/recomendaciones/limpiar', [ProductosController::class, 'limpiarRecomendaciones']);
Route::get('/dashboard-home', [DashboardController::class, 'dashboardHome']);
Route::get('/usuarios', [UsuariosController::class, 'index']);
Route::post('/usuarios', [UsuariosController::class, 'store']);
Route::put('/usuarios/{id}', [UsuariosController::class, 'update']);
Route::get('/roles', [UsuariosController::class, 'roles']);
Route::put('/pedido/{id}/solicitar-pago', [PedidosController::class, 'solicitarPago']);

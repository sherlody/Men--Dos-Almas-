<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\PedidosController;



Route::post('/login', [AuthController::class, 'login']);
Route::get('/menu', [ProductosController::class, 'getMenu']);
Route::post('/ordenar', [PedidosController::class, 'procesarOrden']);

Route::get('/pedidos-activos', [PedidosController::class, 'obtenerPedidosActivos']);
Route::put('/pedido/{id}/estado', [PedidosController::class, 'actualizarEstado']);
Route::get('/pedido/{id}/estado', [PedidosController::class, 'verEstadoPedido']);
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\ProductosController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/menu', [ProductosController::class, 'getMenu']);

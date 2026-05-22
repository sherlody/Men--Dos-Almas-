<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductosController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/menu', [ProductosController::class, 'getMenu']);

<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CounselorController;
use Illuminate\Support\Facades\Route;

Route::get('/templates/auth', fn() => inertia('templates/auth'));
Route::get('/templates/conselordetail', fn() => inertia('templates/conselordetail'));
Route::get('/templates/myreservation', fn() => inertia('templates/myreservation'));
Route::get('/templates/conselordashboard', fn() => inertia('templates/conselordashboard'));



Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'index']);
    Route::post('/login', [LoginController::class, 'store']);
});

Route::get('/{category?}', [CounselorController::class, 'index']);
Route::get('/psikolog/{couonselor?}', [CounselorController::class, 'details']);

<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CounselorController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;



Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'index']);
    Route::post('/login', [LoginController::class, 'store']);
});
Route::post('/logout', [LoginController::class, 'destroy']);

Route::get('/{category?}', [CounselorController::class, 'index']);
Route::get('/psikolog/{couonselor?}', [CounselorController::class, 'details']);

Route::get('/reservation/{counselor?}', [ReservationController::class, 'create']);
Route::post('reservation', [ReservationController::class, 'store']);

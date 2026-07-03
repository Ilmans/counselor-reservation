<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CounselorController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;


Route::get('/template/tes', function () {
    return inertia("templates/myreservation");
});
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name("login");
    Route::post('/login', [LoginController::class, 'store']);
});

Route::middleware('auth')->group(function () {
     Route::get('/my-reservations',[ReservationController::class,'index']);
    Route::get('/my-reservations/{reference}', [ReservationController::class, 'show'])->name('reservations.detail');

    Route::get('/invoice/{id}', [InvoiceController::class, 'show']);
    Route::post('/invoice/{invoice}/payment-method', [InvoiceController::class, 'updatePaymentMethod']);
    Route::get('/invoice/{id}/download', [InvoiceController::class, 'downloadPdf']);
});
Route::post('/logout', [LoginController::class, 'destroy']);

Route::get('/{category?}', [CounselorController::class, 'index']);
Route::get('/psikolog/{couonselor?}', [CounselorController::class, 'details']);

Route::get('/reservation/{counselor?}', [ReservationController::class, 'create']);
Route::post('reservation', [ReservationController::class, 'store']);

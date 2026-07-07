<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Counselor\ConsultationController;
use App\Http\Controllers\Counselor\DashboardController;
use App\Http\Controllers\CounselorController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'can:counselor'])->group(function () {
    Route::get('/counselor/dashboard', [DashboardController::class, 'index']);
   Route::get('/counselor/consultations',[ConsultationController::class,'index']);
});
Route::get('/tes',function(){
    return inertia('tes');
});
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name("login");
    Route::post('/login', [LoginController::class, 'store']);
});

Route::middleware('auth')->group(function () {
     Route::get('/my-reservations',[ReservationController::class,'index']);
    Route::get('/my-invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::get('/my-reservations/{reference}', [ReservationController::class, 'show'])->name('reservations.detail');

    Route::post('/invoice/{invoice}/payment-method', [InvoiceController::class, 'updatePaymentMethod']);
    Route::get('/invoice/{reference}', [InvoiceController::class, 'show'])->name('invoices.show');
    Route::get('/invoice/{id}/download', [InvoiceController::class, 'downloadPdf']);
});
Route::post('/logout', [LoginController::class, 'destroy']);

Route::get('/',[HomeController::class,'index']);
Route::get('/about-us', [HomeController::class, 'about']);
Route::get('/counselors/{category?}', [CounselorController::class, 'index']);
Route::get('/psikolog/{couonselor?}', [CounselorController::class, 'details']);

Route::get('/reservation/{counselor?}', [ReservationController::class, 'create']);
Route::post('reservation', [ReservationController::class, 'store']);

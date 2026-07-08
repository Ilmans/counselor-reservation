<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminCounselorController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AdminAuthController::class, 'AdminLogin'])->name('admin.login');
    Route::post('/admin/login', [AdminAuthController::class, 'AdminLoginStore'])->name('admin.login.store');
});


Route::middleware(['auth', 'can:admin'])->group(function () {
    Route::post('/admin/logout', [AdminAuthController::class, 'AdminLogout'])->name('admin.logout');

    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/counselors', [AdminCounselorController::class, 'index']);
    Route::get('/admin/{id}/edit', [AdminCounselorController::class, 'edit']);
    Route::post('/admin/{counselor}/edit/profile', [AdminCounselorController::class, 'updateProfile']);
    Route::post('/admin/{counselor}/edit/address', [AdminCounselorController::class, 'updateAddress']);
    Route::post('/admin/{counselor}/edit/services', [AdminCounselorController::class, 'updateServices']);
    Route::put('/admin/{counselor}/edit/schedules', [AdminCounselorController::class, 'updateSchedule']);

    // route admin lain menyusul di sini
});

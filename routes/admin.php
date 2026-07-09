<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminConsultationController;
use App\Http\Controllers\Admin\AdminCounselorController;
use App\Http\Controllers\Admin\AdminInvoiceController;
use App\Http\Controllers\Admin\AdminMasterDataController;
use App\Http\Controllers\Admin\AdminReviewController;
use App\Http\Controllers\Admin\AdminUserSearchController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ManageUserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AdminAuthController::class, 'AdminLogin'])->name('admin.login');
    Route::post('/admin/login', [AdminAuthController::class, 'AdminLoginStore'])->name('admin.login.store');
});


Route::middleware(['auth', 'can:admin'])->group(function () {
    Route::post('/admin/logout', [AdminAuthController::class, 'AdminLogout'])->name('admin.logout');

    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/users', [ManageUserController::class, 'index']);

    Route::get('/admin/counselors', [AdminCounselorController::class, 'index'])->name('admin.counselors');
    Route::get('/admin/{id}/edit', [AdminCounselorController::class, 'edit']);
    Route::post('/admin/{counselor}/edit/profile', [AdminCounselorController::class, 'updateProfile']);
    Route::post('/admin/{counselor}/edit/address', [AdminCounselorController::class, 'updateAddress']);
    Route::post('/admin/{counselor}/edit/services', [AdminCounselorController::class, 'updateServices']);
    Route::put('/admin/{counselor}/edit/schedules', [AdminCounselorController::class, 'updateSchedule']);
    Route::get('/admin/counselor/create', [AdminCounselorController::class, 'create']);
    Route::post('/admin/counselor/store', [AdminCounselorController::class, 'store']);
    Route::delete('/admin/{counselor}/delete', [AdminCounselorController::class, 'delete']);

    Route::get('/admin/search/user', [AdminUserSearchController::class, 'search']);

    Route::get('/admin/users', [ManageUserController::class, 'index'])->name('users');
    Route::post('/admin/users', [ManageUserController::class, 'store'])->name('users.store');
    Route::post('/admin/users/{user}', [ManageUserController::class, 'update'])->name('users.update');
    Route::delete('/admin/users/{user}', [ManageUserController::class, 'delete'])->name('users.delete');

    // Category
    Route::get('/admin/categories', [AdminMasterDataController::class, 'indexCategory'])->name('categories');
    Route::post('categories', [AdminMasterDataController::class, 'storeCategory'])->name('categories.store');
    Route::post('categories/{category}', [AdminMasterDataController::class, 'updateCategory'])->name('categories.update');
    Route::delete('categories/{category}', [AdminMasterDataController::class, 'deleteCategory'])->name('categories.delete');

    // Specialization
    Route::get('specializations', [AdminMasterDataController::class, 'indexSpecialization'])->name('specializations');
    Route::post('specializations', [AdminMasterDataController::class, 'storeSpecialization'])->name('specializations.store');
    Route::post('specializations/{specialization}', [AdminMasterDataController::class, 'updateSpecialization'])->name('specializations.update');
    Route::delete('specializations/{specialization}', [AdminMasterDataController::class, 'deleteSpecialization'])->name('specializations.delete');


    Route::get('/admin/consultations', [AdminConsultationController::class, 'index'])->name('consultations');
    Route::get('/admin/consultations/{reference}', [AdminConsultationController::class, 'show'])->name('consultations.show');
    Route::post('consultations/{consultation}/status', [AdminConsultationController::class, 'updateStatus'])->name('consultations.update-status');
    Route::delete('/admin/consultations/{consultation}', [AdminConsultationController::class, 'delete'])->name('consultations.delete');


    Route::get('/admin/reviews', [AdminReviewController::class, 'index'])->name('reviews');
    Route::delete('/admin/reviews/{feedback}', [AdminReviewController::class, 'delete'])->name('reviews.delete');


    Route::get('/admin/invoices', [AdminInvoiceController::class, 'index'])->name('invoices');
    Route::put('/admin/invoices/{invoice}/mark-as-paid', [AdminInvoiceController::class, 'markAsPaid'])->name('invoices.mark-as-paid');
    Route::delete('/admin/invoices/{invoice}', [AdminInvoiceController::class, 'delete'])->name('invoices.delete');

    // Route::put('consultations/{consultation}/status', [AdminConsultationController::class, 'updateStatus'])->name('consultations.update-status');
});

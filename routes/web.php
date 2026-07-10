<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Chat\ConsultationChatController;
use App\Http\Controllers\ConsultationSummaryController;
use App\Http\Controllers\Counselor\ConsultationController;
use App\Http\Controllers\Counselor\CounselorSettingController;
use App\Http\Controllers\Counselor\DashboardController;
use App\Http\Controllers\Counselor\FinanceController;
use App\Http\Controllers\Counselor\ManageStatusConsultationController;
use App\Http\Controllers\Counselor\ReviewController;
use App\Http\Controllers\Counselor\ScheduleController;
use App\Http\Controllers\CounselorController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileSettingController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/admin.php';

Route::middleware(['auth', 'can:counselor'])->group(function () {
    Route::get('/counselor/dashboard', [DashboardController::class, 'index']);
    Route::get('/counselor/consultations', [ConsultationController::class, 'index']);
    Route::get('/counselor/consultations/{reference}/detail', [ConsultationController::class, 'show']);


    Route::get('/counselor/schedules', [ScheduleController::class, 'index']);
    Route::put('/counselor/schedules', [ScheduleController::class, 'update']);

    Route::get('/counselor/reviews', [ReviewController::class, 'index']);

    Route::get('/counselor/settings', [CounselorSettingController::class, 'index']);
    Route::post('/counselor/{counselor}/setting/profile', [CounselorSettingController::class, 'updateProfile']);
    Route::post('/counselor/{counselor}/setting/address', [CounselorSettingController::class, 'updateAddress']);
    Route::post('/counselor/{counselor}/setting/services', [CounselorSettingController::class, 'updateServices']);
    Route::post('/counselor/{counselor}/setting/bank', [CounselorSettingController::class, 'updateBank']);

    Route::get('/counselor/finance', [FinanceController::class, 'index']);
    Route::post('/counselor/finance/withdraw', [\App\Http\Controllers\Counselor\FinanceController::class, 'store']);

    Route::prefix('counselor/consultations/{consultation}')->group(function () {
        Route::post('/approve', [ManageStatusConsultationController::class, 'approve'])->name('consultation.approve');
        Route::post('/reject', [ManageStatusConsultationController::class, 'reject'])->name('consultation.reject');
        Route::post('/start', [ManageStatusConsultationController::class, 'start'])->name('consultation.start');
        Route::post('/complete', [ManageStatusConsultationController::class, 'complete'])->name('consultation.complete');
        Route::post('/notes', [ManageStatusConsultationController::class, 'storeNote'])->name('consultation.notes.store');
        Route::post('/meetink_link', [ManageStatusConsultationController::class, 'updateMeetingLink']);
    });
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'index'])->name("login");
    Route::post('/login', [LoginController::class, 'store']);

    Route::get('/register', [RegisterController::class, 'index'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::get('/reservation/appointment/{counselor?}', [ReservationController::class, 'create']);

    Route::get('/my-reservations', [ReservationController::class, 'index']);
    Route::get('/my-invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::get('/my-reservations/{reference}', [ReservationController::class, 'show'])->name('reservations.detail');
    Route::get('/reservations/{reference}/summary-pdf', [ConsultationSummaryController::class, 'download']);
    Route::post('/reservations/{reference}/review', [ConsultationController::class, 'storeReview']);

    Route::post('/invoice/{invoice}/payment-method', [InvoiceController::class, 'updatePaymentMethod']);
    Route::get('/invoice/{reference}', [InvoiceController::class, 'show'])->name('invoices.show');
    Route::get('/invoice/{id}/download', [InvoiceController::class, 'downloadPdf']);

    Route::get('/profile/setting', [ProfileSettingController::class, 'index']);
    Route::post('/profile/setting', [ProfileSettingController::class, 'update']);
});

Route::post('/logout', [LoginController::class, 'destroy']);
Route::get('/', [HomeController::class, 'index']);
Route::get('/about-us', [HomeController::class, 'about']);
Route::get('/counselors/{category?}', [CounselorController::class, 'index']);
Route::get('/psikolog/{couonselor?}', [CounselorController::class, 'details']);


Route::post('reservation', [ReservationController::class, 'store']);


Route::middleware('auth')->group(function () {
    Route::get('/consultations/{consultation}/chat/messages', [ConsultationChatController::class, 'index'])
        ->name('consultations.chat.index');
    Route::post('/consultations/{consultation}/chat/messages', [ConsultationChatController::class, 'store'])
        ->name('consultations.chat.store');
    Route::patch('/consultations/{consultation}/chat/messages/read', [ConsultationChatController::class, 'markRead'])
        ->name('consultations.chat.read');
});

<?php

use App\Http\Controllers\CounselorController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/counselors', [CounselorController::class, 'index']);

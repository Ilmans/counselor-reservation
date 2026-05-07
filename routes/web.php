<?php

use App\Http\Controllers\CounselorController;
use Illuminate\Support\Facades\Route;

Route::get('/welcome', fn () => inertia('welcome'));

Route::get('/{category?}', [CounselorController::class, 'index']);

<?php

use App\Http\Controllers\CounselorController;
use Illuminate\Support\Facades\Route;



Route::get('/{category?}', [CounselorController::class, 'index']);

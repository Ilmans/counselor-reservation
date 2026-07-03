<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        return inertia('home/index');
    }

    public function about()
    {
        return inertia('home/about-us');
    }
}

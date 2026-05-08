<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return inertia('auth/login');
    }


    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return back()->with('alert', [
                'type' => 'error',
                'message' => 'Email atau kata sandi tidak sesuai.',
            ]);
        }
        $request->session()->regenerate();
        return redirect()->intended('/');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function AdminLogin()
    {
        return inertia('Admin/auth/login');
    }

    public function AdminLoginStore(Request $request)
    {
        $validated = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::guard('admin')->attempt(
            $validated,
            $request->boolean('remember')
        )) {
            return back()->withErrors([
                'email' => 'Email atau password salah.',
            ]);
        }
        if (Auth::guard('admin')->user()->role !== 'admin') {

            Auth::guard('admin')->logout();

            return back()->withErrors([
                'email' => 'Bukan akun admin.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->route('admin.dashboard');
    }

    public function AdminLogout(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}

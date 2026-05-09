<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepository
{

    // UserRepository
    public function createAndLogin(
        string $name,
        string $email,
        string $whatsapp,
        int $age,
        string $gender,
        string $password,
    ): User {
        $user = User::create(compact('name', 'email', 'whatsapp', 'age', 'gender', 'password'));
        Auth::login($user);
        return $user;
    }
}

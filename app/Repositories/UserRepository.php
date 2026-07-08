<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;
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



    // for admin add counselor
    public function searchAvailableUsers(string $query, int $limit = 10): Collection
    {
        $query = trim($query);

        if ($query === '') {
            return new Collection();
        }

        return User::query()
            ->select(['id', 'name', 'email'])
            ->whereDoesntHave('counselor') // sesuaikan nama relasi kalau beda
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('email', 'like', "%{$query}%");
            })
            ->orderBy('name')
            ->limit($limit)
            ->get();
    }
}

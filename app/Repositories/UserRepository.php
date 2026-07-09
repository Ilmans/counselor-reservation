<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

    //crud
    public function getAllUsers(array $roles, int $perPage = 12, ?string $search = null)
    {
        return User::select('id', 'name', 'email', 'whatsapp', 'avatar_path', 'age', 'gender', 'role', 'created_at')
            ->withCount('consultations')
            ->whereIn('role', $roles)
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createUser(array $data): User
    {
        if (!empty($data['avatar'])) {
            $data['avatar_path'] = $data['avatar']->store('avatars', 'public');
        }
        unset($data['avatar']);
        $data['password'] = bcrypt($data['password']);
        return User::create($data);
    }

    public function updateUser(User $user, array $data): User
    {
        if (!empty($data['avatar'])) {
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }
            $data['avatar_path'] = $data['avatar']->store('avatars', 'public');
        }
        unset($data['avatar']);
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }
        $user->update($data);
        return $user->fresh();
    }

    public function deleteUser(User $user): void
    {
        $user->delete();
    }
}

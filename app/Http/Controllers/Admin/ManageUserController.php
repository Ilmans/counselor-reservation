<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserListResource;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class ManageUserController extends Controller
{
    public function __construct(protected UserRepository $userRepo) {}

    public function index(Request $request)
    {
        $filters = $request->only('role', 'search');
        $roles = $request->filled('role') ? (array) $request->role : ['user', 'counselor', 'admin'];
        $users = UserListResource::collection(
            $this->userRepo->getAllUsers($roles, 12, $request->search)
        );

        return inertia('Admin/user/index', compact('users', 'filters'));
    }

    public function store(StoreUserRequest $request)
    {
        $this->userRepo->createUser($request->validated());

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'User berhasil ditambahkan.',
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $this->userRepo->updateUser($user, $request->validated());
        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'User berhasil diperbarui.',
        ]);
    }

    public function delete(User $user)
    {
        $this->userRepo->deleteUser($user);
        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'User berhasil dihapus.',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminUserSearchController extends Controller
{
    public function __construct(
        protected UserRepository $userRepository,
    ) {}

    /**
     * GET /admin/users/search?q=...
     *
     * Dipanggil oleh <UserCombobox />. Sengaja tidak mengembalikan data
     * kalau q kosong / terlalu pendek untuk menghindari full-table scan
     * saat user banyak.
     */
    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => ['required', 'string', 'min:2', 'max:100'],
        ]);

        $users = $this->userRepository->searchAvailableUsers($validated['q']);

        return response()->json([
            'data' => $users,
        ]);
    }
}

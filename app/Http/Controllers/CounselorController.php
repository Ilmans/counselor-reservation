<?php

namespace App\Http\Controllers;

use App\Repositories\CounselorRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CounselorController extends Controller
{
    public function __construct(protected CounselorRepository $repo) {}

    public function index(Request $request, ?string $category = null)
    {
        $search = $request->query('search');
        $counselors = Inertia::scroll(
            fn() => $this->repo->getAllCounselors($category, $search)
        );
        $filters = [
            'category' => $category,
            'search'   => $search,
        ];

        return inertia('counselors/index', compact('counselors', 'filters'));
    }

    /* Detail Counselor page - show details conselor */
    public function details(string $counselor)
    {
        $counselor = $this->repo->getCounselorBySlug($counselor);
        return inertia('counselors/details', compact('counselor'));
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\CounselorListResource;
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
            fn() => CounselorListResource::collection($this->repo->getAllCounselors(['active'], 6, $category, $search))
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

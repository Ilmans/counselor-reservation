<?php

namespace App\Http\Controllers;

use App\Services\CounselorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CounselorController extends Controller
{
    public function __construct(protected CounselorService $service) {}

    public function index(Request $request, ?string $category = null)
    {
        $search = $request->query('search');
        $counselors = Inertia::scroll(
            fn() => $this->service->getCounselors($category, $search)
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

        $counselor = $this->service->getCounselor($counselor);

        return inertia('counselors/details', compact('counselor'));
    }
}

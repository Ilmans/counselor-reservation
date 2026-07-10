<?php

namespace App\Http\Controllers;

use App\Http\Resources\CounselorDetailResource;
use App\Http\Resources\CounselorListResource;
use App\Http\Resources\CounselorResource;
use App\Http\Resources\ReviewListResource;
use App\Repositories\CounselorRepository;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CounselorController extends Controller
{
    public function __construct(protected CounselorRepository $repo, protected ReviewRepository $reviewRepo) {}

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
        $counselor = new CounselorDetailResource($this->repo->getCounselorBySlug($counselor));
        abort_if(! $counselor, 404);

        $reviews = Inertia::scroll(
            fn() => ReviewListResource::collection(
                $this->reviewRepo->getCounselorReviews(counselorId: $counselor->id, perPage: 6)
            )
        );

        return inertia('counselors/details', [
            'counselor' => new CounselorDetailResource($counselor),
            'reviews' => $reviews,
            'rating_breakdown' => $this->reviewRepo->getRatingBreakdown($counselor->id),
        ]);
    }
}

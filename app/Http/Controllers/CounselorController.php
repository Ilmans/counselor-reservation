<?php

namespace App\Http\Controllers;

use App\Constants\CacheKey;
use App\Http\Resources\CounselorDetailResource;
use App\Http\Resources\CounselorListResource;
use App\Http\Resources\CounselorResource;
use App\Http\Resources\ReviewListResource;
use App\Repositories\CounselorRepository;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
        $totalCounselors = $this->repo->countAllCounselors(['active'], $category, $search);


        return inertia('counselors/index', compact('counselors', 'filters','totalCounselors'));
    }

    /* Detail Counselor page - show details conselor */
    public function details(string $counselor)
    {
        $counselorData = Cache::remember(
            CacheKey::counselorBySlug($counselor),
            now()->addMinutes(30),
            function () use ($counselor) {
                $model = $this->repo->getCounselorBySlug($counselor);

                if (! $model) {
                    return null;
                }

                // Full flatten: nested Collection/Resource ikut ke-convert jadi array murni
                return json_decode(
                    json_encode(new CounselorDetailResource($model)),
                    true
                );
            }
        );

        abort_if(! $counselorData, 404);

        $reviews = Inertia::scroll(
            fn() => ReviewListResource::collection(
                $this->reviewRepo->getCounselorReviews(counselorId: $counselorData['id'], perPage: 6)
            )
        );

        return inertia('counselors/details', [
            'counselor' => $counselorData,
            'reviews' => $reviews,
            'rating_breakdown' => $this->reviewRepo->getRatingBreakdown($counselorData['id']),
        ]);
    }
}

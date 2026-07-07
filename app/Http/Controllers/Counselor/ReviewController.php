<?php


namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewListResource;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function __construct(
        protected ReviewRepository $repo
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only('rating', 'search', 'date');
        $counselorId = Auth::user()->counselor->id;

        $reviews = ReviewListResource::collection(
            $this->repo->getCounselorReviews(
                $counselorId,
                $request->filled('rating') ? (int) $request->rating : null,
                $request->search,
                $request->date,
            )
        );

        return inertia('Counselor/review/index', compact('reviews', 'filters'));
    }
}

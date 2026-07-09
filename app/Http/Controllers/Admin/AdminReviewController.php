<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewListResource;
use App\Models\ConsultationFeedback;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class AdminReviewController extends Controller
{
    public function __construct(protected ReviewRepository $repo) {}

    public function index(Request $request)
    {
        $filters = $request->only('rating', 'search', 'date');

        $reviews = ReviewListResource::collection(
            $this->repo->getAllReviewsForAdmin(
                $request->filled('rating') ? (int) $request->rating : null,
                $request->search,
                $request->date,
            )
        );

        return inertia('Admin/review/index', compact('reviews', 'filters'));
    }

    public function delete(ConsultationFeedback $feedback)
    {
        $this->repo->deleteReview($feedback);
        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Review berhasil dihapus.',
        ]);
    }
}

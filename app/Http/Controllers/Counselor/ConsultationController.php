<?php

namespace App\Http\Controllers\Counselor;

use App\Constants\CacheKey;
use App\Http\Controllers\Controller;
use App\Http\Resources\ConsultationDetailResource;
use App\Http\Resources\ConsultationListResource;
use App\Repositories\ConsultationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class ConsultationController extends Controller
{
    public function __construct(
        protected ConsultationRepository $repo
    ) {}


    public function index(Request $request)
    {
        $filters = $request->only('status', 'search', 'date');
        $counselorId = Auth::user()->counselor->id;
        $statuses = $request->filled('status') ? [$request->status] : null;
        $consultations = ConsultationListResource::collection(
            $this->repo->getCounselorConsultations(
                $counselorId,
                $statuses,
                $request->search,
                $request->date,
            )
        );
        return inertia('Counselor/consultation/index', compact('consultations', 'filters'));
    }

    public function show(Request $request, string $reference)
    {
        $consultation = new ConsultationDetailResource($this->repo->findByReference($reference));
        abort_if($consultation->counselor_id != Auth::user()->counselor->id, 403);
        return inertia('Counselor/consultation/show', compact('consultation'));
    }

    public function storeReview(Request $request, string $reference)
    {
        $validated = $request->validate([
            'rating'       => ['required', 'integer', 'min:1', 'max:5'],
            'comment'      => ['nullable', 'string', 'max:1000'],
            'is_anonymous' => ['boolean'],
        ], [
            'rating.required' => 'Rating wajib diisi.',
            'rating.min'      => 'Rating minimal 1 bintang.',
            'rating.max'      => 'Rating maksimal 5 bintang.',
            'comment.max'     => 'Komentar maksimal 1000 karakter.',
        ]);

        $consultation = $this->repo->findByReference($reference, Auth::id());

        if (!$consultation || $consultation->user_id != Auth::id()) {
            abort(404);
        }

        if ($consultation->status !== 'completed') {
            return back()->with('toast', [
                'type'    => 'error',
                'message' => 'Konsultasi belum selesai, belum bisa memberi ulasan.',
            ]);
        }

        if ($consultation->feedback()->exists()) {
            return back()->with('toast', [
                'type'    => 'error',
                'message' => 'Ulasan untuk konsultasi ini sudah pernah dikirim.',
            ]);
        }

        $consultation->feedback()->create($validated);

        Cache::forget(CacheKey::counselorBySlug($consultation->counselor->slug));
        return back()->with('toast', [
            'type'    => 'success',
            'message' => 'Ulasan berhasil dikirim. Terima kasih!',
        ]);
    }
}

<?php
// app/Repositories/ReviewRepository.php

namespace App\Repositories;

use App\Models\ConsultationFeedback;

class ReviewRepository
{
    public function getCounselorReviews(
        int $counselorId,
        ?int $rating = null,
        ?string $search = null,
        ?string $date = null,
        int $perPage = 10
    ) {
        return ConsultationFeedback::query()
            ->with(['consultation.user'])
            ->whereHas('consultation', function ($query) use ($counselorId, $search) {
                $query->where('counselor_id', $counselorId);
                if ($search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('reference', 'like', "%{$search}%")
                            ->orWhereHas('user', function ($uq) use ($search) {
                                $uq->where('name', 'like', "%{$search}%");
                            });
                    });
                }
            })
            ->when($rating, fn($query) => $query->where('rating', $rating))
            ->when($date, fn($query) => $query->whereDate('created_at', $date))
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }


    public function findFeedback(int $consultationId)
    {
        return ConsultationFeedback::where('consultation_id', $consultationId)->first();
    }
}

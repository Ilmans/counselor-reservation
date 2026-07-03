<?php

namespace App\Repositories;

use App\Models\Consultation;
use Carbon\Carbon;

class ConsultationRepository
{
    public function getUserStatistic(): array
    {
        return (array) Consultation::selectRaw("
        COUNT(*) total_sessions,
        SUM(status IN ('pending_payment','pending_confirmation','confirmed','in_queue','in_progress')) upcoming_sessions,
        SUM(status = 'completed') completed_sessions,
        SUM(status IN ('cancelled','rejected')) cancelled_sessions,
        (SELECT COUNT(*) FROM counselors) total_counselors
    ")->first();
    }

    /**
     * Reservasi milik user, opsional difilter berdasarkan sekumpulan status.
     * $statuses = null artinya tidak difilter (tab "Semua").
     */
    public function getUserConsultations(int $userId, ?array $statuses, int $perPage = 10)
    {
        return Consultation::with(['counselor.specialization', 'notes'])
            ->where('user_id', $userId)
            ->when($statuses, fn($q) => $q->whereIn('status', $statuses))
            ->orderByDesc('consultation_date')
            ->orderByDesc('estimated_time')
            ->paginate($perPage)
            ->withQueryString();
    }

   

    public function getCounselorConsultationsBetween(int $counselorId, Carbon $from, Carbon $to)
    {
        return Consultation::where('counselor_id', $counselorId)
            ->whereBetween('consultation_date', [
                $from->toDateString(),
                $to->toDateString(),
            ])
            ->whereNotIn('status', ['cancelled', 'rejected'])
            ->get();
    }

    public function isSlotBooked(int $counselorId, string $date, string $time): bool
    {
        return Consultation::where('counselor_id', $counselorId)
            ->where('consultation_date', $date)
            ->where('estimated_time', $time)
            ->whereNotIn('status', ['cancelled', 'rejected'])
            ->exists();
    }

    public function countQueueForDate(int $counselorId, string $date): int
    {
        return Consultation::where('counselor_id', $counselorId)
            ->where('consultation_date', $date)
            ->whereNotIn('status', ['cancelled', 'rejected'])
            ->count();
    }

    public function referenceExists(string $reference): bool
    {
        return Consultation::where('reference', $reference)->exists();
    }

    public function create($data)
    {
        return Consultation::create($data);
    }
}

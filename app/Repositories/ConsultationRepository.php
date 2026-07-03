<?php

namespace App\Repositories;

use App\Models\Consultation;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ConsultationRepository
{
    public function getUserStatistic(int $userId): array
    {
        return Consultation::query()
            ->where('user_id', $userId)
            ->selectRaw("
            COUNT(*) as total_sessions,
            SUM(status IN ('pending_payment','pending_confirmation','confirmed','in_queue','in_progress')) as upcoming_sessions,
            SUM(status = 'completed') as completed_sessions,
            SUM(status IN ('cancelled','rejected')) as cancelled_sessions,
            COUNT(DISTINCT counselor_id) as total_counselors
        ")
            ->first()
            ?->toArray() ?? [];
    }

    public function findDetailForUser($reference, int $userId): ?Consultation
    {
        return Consultation::with([
            'counselor.specialization',
            'counselor.address',
            'notes',
            'invoice',
        ])->where('reference', $reference)
            ->where('user_id', $userId)
            ->first();
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
        $data['reference'] = $this->generateReference();
        return Consultation::create($data);
    }

    private function generateReference(): string
    {
        return 'RSV-' . now()->format('Ymd') . '-' . Str::upper(Str::random(6));
    }
}

<?php

namespace App\Repositories;

use App\Enums\ConsultationStatus;
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
            COALESCE(SUM(status IN ('pending_payment','pending_confirmation','confirmed','in_queue','in_progress')), 0) as upcoming_sessions,
            COALESCE(SUM(status = 'completed'), 0) as completed_sessions,
            COALESCE(SUM(status IN ('cancelled','rejected')), 0) as cancelled_sessions,
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
     * consultation list
     */
    private function baseQuery(?array $statuses, $search, ?string $date = null)
    {
        return Consultation::query()
            ->when($statuses, fn($q) => $q->whereIn('status', $statuses))
            ->when($search, function ($query, $s) {
                $query->where('reference', $s);
            })
            ->when($date, function ($query, $d) {
                $query->whereDate('consultation_date', $d);
            })
            ->orderByDesc('consultation_date')
            ->orderByDesc('estimated_time');
    }
    public function getUserConsultations(int $userId, ?array $statuses, $search = "", int $perPage = 10)
    {
        return $this->baseQuery($statuses, $search)->where('user_id', $userId)->with(['counselor.specialization', 'notes'])
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getCounselorConsultations(
        int $counselorId,
        ?array $statuses,
        ?string $search = null,
        ?string $date = null,
        int $perPage = 10
    ) {
        $statuses = $statuses
            ? array_diff($statuses, [ConsultationStatus::PENDING_PAYMENT->value])
            : array_diff(
                ConsultationStatus::values(),
                [ConsultationStatus::PENDING_PAYMENT->value]
            );

        return $this->baseQuery($statuses, $search, $date)
            ->where('counselor_id', $counselorId)
            ->with(['user', 'notes', 'invoice'])
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

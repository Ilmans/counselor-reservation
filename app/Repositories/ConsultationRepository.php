<?php

namespace App\Repositories;

use App\Models\Consultation;
use Carbon\Carbon;

class ConsultationRepository
{


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

    public function create($data)
    {
        return Consultation::create($data);
    }
}

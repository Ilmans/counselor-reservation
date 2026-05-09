<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\Consultation;
use App\Models\Counselor;
use Carbon\Carbon;

class ConsultationRepository
{


    // Di ConsultationRepository
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
}

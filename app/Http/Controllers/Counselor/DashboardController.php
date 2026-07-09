<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\ConsultationFeedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $counselorId = Auth::user()->counselor->id;

        return inertia('Counselor/dashboard/index', [
            'statistics' => $this->getCounselorStatistic($counselorId),
            'rating' => $this->getCounselorRatingStatistic($counselorId),
        ]);
    }


    public function getCounselorStatistic(int $counselorId): array
    {
        $today = now()->toDateString();
        $startOfMonth = now()->startOfMonth()->toDateString();
        $endOfMonth = now()->endOfMonth()->toDateString();

        return Consultation::query()
            ->where('counselor_id', $counselorId)
            ->selectRaw("
    COALESCE(SUM(consultation_date = ?), 0) as today_sessions,
    COALESCE(SUM(consultation_date = ? AND method = 'online'), 0) as today_online_sessions,
    COALESCE(SUM(consultation_date = ? AND method = 'offline'), 0) as today_offline_sessions,

    COALESCE(SUM(status = 'pending_confirmation'), 0) as pending_confirmation_sessions,

    COALESCE(SUM(status = 'completed'
        AND consultation_date BETWEEN ? AND ?), 0) as completed_this_month,

    COALESCE(SUM(consultation_date BETWEEN ? AND ?), 0) as scheduled_this_month
", [
                $today,
                $today,
                $today,
                $startOfMonth,
                $endOfMonth,
                $startOfMonth,
                $endOfMonth,
            ])
            ->first()
            ?->toArray() ?? [];
    }

    public function getCounselorRatingStatistic(int $counselorId): array
    {
        return ConsultationFeedback::query()
            ->join('consultations', 'consultations.id', '=', 'consultation_feedback.consultation_id')
            ->where('consultations.counselor_id', $counselorId)
            ->selectRaw("
    COALESCE(ROUND(AVG(consultation_feedback.rating), 1), 0) as average_rating,
    COALESCE(COUNT(*), 0) as total_reviews
")
            ->first()
            ?->toArray() ?? [];
    }
}

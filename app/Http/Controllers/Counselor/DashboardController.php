<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Http\Resources\ScheduleResource;
use App\Models\Consultation;
use App\Models\ConsultationFeedback;
use App\Repositories\ScheduleRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __construct(protected ScheduleRepository $scheduleRepository) {}

    public function index(Request $request)
    {
        $counselor = Auth::user()->counselor;
        $counselorId = $counselor->id;

        return inertia('Counselor/dashboard/index', [
            'counselor' => [
                'pricing_type' => $counselor->pricing_type,
                'price_per_hour' => $counselor->price_per_hour,
            ],
            'statistics' => $this->getCounselorStatistic($counselorId),
            'rating' => $this->getCounselorRatingStatistic($counselorId),
            // Selalu dihitung — riwayat invoice paid tidak hilang meski status pricing berubah jadi free
            'earnings' => $this->getCounselorEarnings($counselorId),
            'todayQueue' => $this->getTodayQueue($counselorId),
            'pendingConfirmations' => $this->getPendingConfirmations($counselorId),
            'schedules' => ScheduleResource::collection(
                $this->scheduleRepository->getCounselorSchedule($counselorId)
            ),
            'reviews' => $this->getRecentReviews($counselorId),
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

    private function getCounselorEarnings(int $counselorId): array
    {
        $startOfMonth = now()->startOfMonth();
        $endOfMonth = now()->endOfMonth();

        $base = DB::table('invoices')
            ->join('consultations', 'consultations.id', '=', 'invoices.consultation_id')
            ->where('consultations.counselor_id', $counselorId)
            ->where('invoices.status', 'paid');

        $thisMonth = (clone $base)
            ->whereBetween('invoices.paid_at', [$startOfMonth, $endOfMonth])
            ->sum('invoices.amount');

        $lifetime = (clone $base)->sum('invoices.amount');

        return [
            'this_month' => (float) $thisMonth,
            'lifetime' => (float) $lifetime,
        ];
    }

    private function getTodayQueue(int $counselorId): array
    {
        $today = now()->toDateString();

        return Consultation::query()
            ->where('counselor_id', $counselorId)
            ->whereDate('consultation_date', $today)
            ->whereNotIn('status', ['cancelled', 'rejected'])
            ->with('user')
            ->orderBy('estimated_time')
            ->get()
            ->map(fn($c) => $this->mapConsultation($c))
            ->values()
            ->all();
    }

    private function getPendingConfirmations(int $counselorId, int $limit = 5): array
    {
        return Consultation::query()
            ->where('counselor_id', $counselorId)
            ->where('status', 'pending_confirmation')
            ->with('user')
            ->orderBy('consultation_date')
            ->orderBy('estimated_time')
            ->limit($limit)
            ->get()
            ->map(fn($c) => $this->mapConsultation($c, includeDate: true))
            ->values()
            ->all();
    }

    private function mapConsultation(Consultation $c, bool $includeDate = false): array
    {
        return [
            'id' => $c->id,
            'reference' => $c->reference,
            'date' => $includeDate ? Carbon::parse($c->consultation_date)->translatedFormat('D, j M') : null,
            'time' => Carbon::parse($c->estimated_time)->format('H:i'),
            'client' => $c->is_anonymous ? null : $c->user->name,
            'is_anonymous' => $c->is_anonymous,
            'category' => $c->categories,
            'method' => $c->method,
            'status' => $c->status,
            'status_label' => \App\Constants\StatusConstant::STATUS_LABELS[$c->status] ?? $c->status,
        ];
    }

    private function getRecentReviews(int $counselorId, int $limit = 3): array
    {
        return ConsultationFeedback::query()
            ->whereHas('consultation', fn($q) => $q->where('counselor_id', $counselorId))
            ->with('consultation.user')
            ->latest()
            ->limit($limit)
            ->get()
            ->map(fn($f) => [
                'name' => $f->is_anonymous ? null : $f->consultation->user->name,
                'is_anonymous' => $f->is_anonymous,
                'rating' => $f->rating,
                'comment' => $f->comment,
                'when' => $f->created_at->diffForHumans(),
            ])
            ->values()
            ->all();
    }
}

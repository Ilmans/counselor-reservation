<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // ── Kartu statistik ──────────────────────────────────
        $activeCounselors = DB::table('counselors')
            ->where('status', 'approved')
            ->where('visibility', 'active')
            ->count();

        $pendingCounselorsCount = DB::table('counselors')
            ->where('status', 'pending')
            ->count();

        $todayConsultations = DB::table('consultations')
            ->whereDate('consultation_date', $today)
            ->count();

        $monthRevenue = DB::table('invoices')
            ->where('status', 'paid')
            ->whereBetween('paid_at', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        // ── Widget "perlu tindakan" ──────────────────────────
        $pendingConfirmationCount = DB::table('consultations')
            ->where('status', 'pending_confirmation')
            ->count();

        $pendingInvoiceCount = DB::table('invoices')
            ->whereIn('status', ['pending', 'expired'])
            ->count();

        $pendingCounselors = DB::table('counselors')
            ->select('id', 'name', 'photo_path', 'created_at')
            ->where('status', 'pending')
            ->orderBy('created_at')
            ->limit(5)
            ->get();

        // ── Konsultasi terbaru ───────────────────────────────
        $recentConsultations = DB::table('consultations')
            ->join('users', 'users.id', '=', 'consultations.user_id')
            ->join('counselors', 'counselors.id', '=', 'consultations.counselor_id')
            ->select(
                'consultations.id',
                'consultations.reference',
                'users.name as user_name',
                'counselors.name as counselor_name',
                'consultations.consultation_date',
                'consultations.method',
                'consultations.status',
                'consultations.created_at'
            )
            ->orderByDesc('consultations.created_at')
            ->limit(8)
            ->get();

        // ── Invoice terbaru ──────────────────────────────────
        $recentInvoices = DB::table('invoices')
            ->join('users', 'users.id', '=', 'invoices.user_id')
            ->select(
                'invoices.id',
                'invoices.reference',
                'users.name as user_name',
                'invoices.amount',
                'invoices.status',
                'invoices.created_at'
            )
            ->orderByDesc('invoices.created_at')
            ->limit(8)
            ->get();

        // ── Tren konsultasi 14 hari terakhir (diisi rapat, termasuk hari kosong) ──
        $rawTrend = DB::table('consultations')
            ->selectRaw('DATE(consultation_date) as date, COUNT(*) as total')
            ->where('consultation_date', '>=', Carbon::today()->subDays(13))
            ->groupBy('date')
            ->pluck('total', 'date');

        $dailyTrend = collect(range(0, 13))->map(function ($i) use ($rawTrend) {
            $date = Carbon::today()->subDays(13 - $i)->toDateString();
            return [
                'date' => $date,
                'label' => Carbon::parse($date)->translatedFormat('d M'),
                'total' => $rawTrend[$date] ?? 0,
            ];
        });

        // ── Distribusi status konsultasi ─────────────────────
        $statusDistribution = DB::table('consultations')
            ->select('status', DB::raw('COUNT(*) as total'))
            ->groupBy('status')
            ->orderByDesc('total')
            ->get();

        // ── Rating rata-rata ──────────────────────────────────
        $averageRating = (float) (DB::table('consultation_feedback')->avg('rating') ?? 0);
        $totalFeedback = DB::table('consultation_feedback')->count();

        return inertia('Admin/dashboard/index', [
            'stats' => [
                'activeCounselors' => $activeCounselors,
                'pendingCounselors' => $pendingCounselorsCount,
                'todayConsultations' => $todayConsultations,
                'monthRevenue' => (float) $monthRevenue,
            ],
            'actionItems' => [
                'pendingCounselors' => $pendingCounselorsCount,
                'pendingConfirmation' => $pendingConfirmationCount,
                'pendingInvoices' => $pendingInvoiceCount,
            ],
            'pendingCounselorsList' => $pendingCounselors,
            'recentConsultations' => $recentConsultations,
            'recentInvoices' => $recentInvoices,
            'dailyTrend' => $dailyTrend,
            'statusDistribution' => $statusDistribution,
            'feedback' => [
                'average' => round($averageRating, 1),
                'total' => $totalFeedback,
            ],
        ]);
    }
}

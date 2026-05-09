<?php

namespace App\Services;

use App\Helpers\ScheduleHelpers;
use App\Repositories\ConsultationRepository;
use App\Repositories\CounselorRepository;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class ReservationService
{
    public function __construct(
        protected CounselorRepository $counselorRepository,
        protected ConsultationRepository $consultationRepository
    ) {}

    public function getCounselorScheduleOverview(string $slug): array
    {
        $counselor = $this->counselorRepository->getCounselorBySlug($slug);
        $schedules = $counselor->schedules()->where('is_active', true)->get();
        // nearest date
        $availableDaysOfWeek = $schedules->pluck('day_of_week')->unique()->toArray();
        $startDate           = ScheduleHelpers::findNearestScheduleDate($availableDaysOfWeek);

        if (!$startDate) {
            return [
                'counselor' => $counselor,
                'overview'  => [],
            ];
        }

        $endDate = $startDate->copy()->addWeeks(3);

        $consultations = $this->consultationRepository
            ->getCounselorConsultationsBetween($counselor->id, $startDate, $endDate)
            ->groupBy(fn($item) => Carbon::parse($item->consultation_date)->toDateString());

        $overview = $this->buildOverview($schedules, $consultations, $startDate, $endDate);

        return [
            'counselor' => $counselor,
            'overview'  => $overview,
        ];
    }



    private function buildOverview($schedules, $consultations, Carbon $startDate, Carbon $endDate): array
    {
        $results = [];

        foreach (CarbonPeriod::create($startDate, $endDate) as $date) {
            $matched = $schedules->filter(fn($s) => $s->day_of_week == $date->format('N'));
            if ($matched->isEmpty()) continue;

            $dateKey = $date->toDateString();

            $slots = $matched
                ->flatMap(fn($s) => $this->generateTimeSlots($s->open_time, $s->close_time, 60))
                ->unique()->sort()->values();

            $bookedConsultations = $consultations[$dateKey] ?? collect();
            $bookedTimes = $bookedConsultations
                ->pluck('estimated_time')
                ->map(fn($t) => Carbon::parse($t)->format('H:i'))
                ->values()->toArray();

            $total = $slots->count();

            $results[$dateKey] = [
                'total'        => $total,
                'booked'       => $bookedConsultations->count(),
                'booked_times' => $bookedTimes,
                'slots'        => $slots->toArray(),
                'method'       => $matched->first()->method,
                'percentage'   => $total > 0 ? round(($bookedConsultations->count() / $total) * 100) : 0,
            ];
        }

        return $results;
    }

    /**
     * Generate daftar jam dari open_time ke close_time dengan interval menit.
     * Contoh: open=08:00, close=17:00, interval=60 → ['08:00','09:00',...,'16:00']
     */
    private function generateTimeSlots(string $openTime, string $closeTime, int $intervalMinutes = 60): array
    {
        $slots = [];
        $cur   = Carbon::createFromTimeString($openTime);
        $close = Carbon::createFromTimeString($closeTime);

        while ($cur->lt($close)) {
            $slots[] = $cur->format('H:i');
            $cur->addMinutes($intervalMinutes);
        }

        return $slots;
    }

}

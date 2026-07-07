<?php

namespace App\Services;

use App\Repositories\ConsultationRepository;
use App\Repositories\CounselorRepository;
use App\Repositories\InvoiceRepository;
use App\Repositories\ScheduleRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Carbon\CarbonPeriod;


class CounselorScheduleService
{

    public function __construct(
        protected CounselorRepository $counselorRepository,
        protected ConsultationRepository $consultationRepository,
        protected InvoiceRepository $invoiceRepository,
        protected ScheduleRepository $scheduleRepository,
        protected UserRepository $userRepo
    ) {}

    public function getSimpleCounselorScheduleOverview(int $counselorId)
    {
        $startDate = Carbon::today();
        $endDate = $startDate->copy()->addWeeks(3);
        $activeSchedules = $this->scheduleRepository->getActiveScheduleByCounselor($counselorId);

        $consultations = $this->consultationRepository
            ->getCounselorConsultationsBetween($counselorId, $startDate, $endDate)
            ->groupBy(fn($item) => Carbon::parse($item->consultation_date)->toDateString());

        $schedules = [];

        foreach (CarbonPeriod::create($startDate, $endDate) as $date) {
            $matched = $activeSchedules->filter(fn($s) => $s->day_of_week == $date->format('N'));
            if ($matched->isEmpty()) {
                continue;
            }
            $dateKey = $date->toDateString();
            $bookedConsultations = $consultations[$dateKey] ?? collect();
            $total = $bookedConsultations->count();
            $schedules[$dateKey] = [
                'totalBooked' => $total,
                'method'     => $matched->first()->method,
            ];
        }

        return [
            'startDate' => $startDate,
            'endDate' => $endDate,
            'schedule' => $schedules
        ];
    }

    public function getCounselorScheduleOverview(string $slug): array
    {
        $counselor = $this->counselorRepository->getCounselorBySlug($slug);
        $schedules = $counselor->schedules()->where('is_active', true)->get();
        $startDate = Carbon::today();

        $endDate = $startDate->copy()->addWeeks(3);
        $consultations = $this->consultationRepository
            ->getCounselorConsultationsBetween($counselor->id, $startDate, $endDate)
            ->groupBy(fn($item) => Carbon::parse($item->consultation_date)->toDateString());

        $avaibilityDate = $this->formatAvaibilitySchedule($schedules, $consultations, $startDate, $endDate);

        return [
            'counselor' => $counselor,
            'overview'  => [
                'startDate' => $startDate,
                'endDate' => $endDate,
                'avaibility' => $avaibilityDate,
            ]
        ];
    }


    private function formatAvaibilitySchedule($schedules, $consultations, Carbon $startDate, Carbon $endDate): array
    {
        $results = [];

        foreach (CarbonPeriod::create($startDate, $endDate) as $date) {
            $matched = $schedules->filter(fn($s) => $s->day_of_week == $date->format('N'));
            if ($matched->isEmpty()) {
                continue;
            }

            $dateKey = $date->toDateString();
            $times = $matched
                ->flatMap(fn($s) => $this->generateTimeSlots($s->open_time, $s->close_time, 60))
                ->unique()
                ->sort()
                ->values();
            $bookedConsultations = $consultations[$dateKey] ?? collect();
            $bookedTimes = $bookedConsultations
                ->pluck('estimated_time')
                ->map(fn($time) => Carbon::parse($time)->format('H:i'))
                ->values()
                ->toArray();
            $slots = $times->map(function (string $time) use ($dateKey, $bookedTimes) {
                $slotDateTime = Carbon::parse("{$dateKey} {$time}");
                $booked = in_array($time, $bookedTimes, true);
                $reason = $booked ? 'Telah dibooking' : ($slotDateTime->isPast() ? 'Terlewat' : ($slotDateTime->lte(now()->addHour()) ? 'Terlalu dekat' : null));
                return [
                    'time'    => $time,
                    'enabled' => $reason === null,
                    'booked'  => $booked,
                    'reason'  => $reason,
                ];
            })->values();

            $total = $slots->count();

            $results[$dateKey] = [
                'slots'      => $slots,
                'method'     => $matched->first()->method,
                'percentage' => $total > 0 ? round((count($bookedTimes) / $total) * 100) : 0,
            ];
        }

        return $results;
    }


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

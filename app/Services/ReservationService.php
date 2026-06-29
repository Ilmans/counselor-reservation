<?php

namespace App\Services;

use App\Helpers\ScheduleHelpers;
use App\Repositories\ConsultationRepository;
use App\Repositories\CounselorRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class ReservationService
{
    public function __construct(
        protected CounselorRepository $counselorRepository,
        protected ConsultationRepository $consultationRepository,
        protected UserRepository $userRepo
    ) {}

    public function getCounselorScheduleOverview(string $slug): array
    {
        $counselor = $this->counselorRepository->getCounselorBySlug($slug);
        $schedules = $counselor->schedules()->where('is_active', true)->get();
        // nearest date
        $startDate           = $startDate = ScheduleHelpers::findNearestScheduleDate($schedules);

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

    public function store(array $data, bool $isLoggedIn)
    {
        if ($isLoggedIn) {
            $user = Auth::user();
        } else {
            $isBooked = $this->consultationRepository->isSlotBooked($data['counselor'], $data['date'], $data['time']);
            if ($isBooked) {

                throw ValidationException::withMessages([
                    'time' => 'Slot waktu ini sudah penuh, silakan pilih jam lain.',
                ]);
            }
            $user = $this->userRepo->createAndLogin($data['full_name'], $data['email'], $data['whatsapp'], $data['age'], $data['gender'], bcrypt(Str::random(12)));
        }
        $queuePosition = $this->consultationRepository->countQueueForDate($data['counselor'], $data['date'], $data['time']) + 1;
        $consultation = $this->consultationRepository->create([
            'user_id'                 => $user->id,
            'counselor_id'            => $data['counselor'],
            'categories'              => $data['concerns'],
            'consultation_date'       => $data['date'],
            'estimated_time'          => $data['time'],
            'method'                  => $data['method'],
            'client_first_experience' => $data['is_first'],
            'queue_position'          => $queuePosition,
            'status'                  => 'pending_payment',
            'meeting_link'            => null,
        ]);

        if (!empty($data['notes'])) {
            $consultation->notes()->create([
                'type'    => 'client_pre_sesi',
                'content' => $data['notes'],
            ]);
        }

        return ['consultation' => $consultation];
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

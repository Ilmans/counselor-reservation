<?php

namespace App\Services;

use App\Helpers\ScheduleHelpers;
use App\Models\Consultation;
use App\Repositories\ConsultationRepository;
use App\Repositories\CounselorRepository;
use App\Repositories\InvoiceRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ReservationService
{
   //tab
    private const STATUS_GROUPS = [
        'upcoming'  => ['pending_payment', 'pending_confirmation', 'confirmed', 'in_queue', 'in_progress'],
        'completed' => ['completed'],
        'cancelled' => ['cancelled', 'rejected'],
        'all'       => null,
    ];

    private const STATUS_LABELS = [
        'pending_payment'      => 'Menunggu Pembayaran',
        'pending_confirmation' => 'Menunggu Konfirmasi',
        'confirmed'            => 'Terkonfirmasi',
        'in_queue'             => 'Dalam Antrian',
        'in_progress'          => 'Sedang Berlangsung',
        'completed'            => 'Selesai',
        'cancelled'            => 'Dibatalkan',
        'rejected'             => 'Ditolak',
    ];

    public function __construct(
        protected CounselorRepository $counselorRepository,
        protected ConsultationRepository $consultationRepository,
        protected InvoiceRepository $invoiceRepository,
        protected UserRepository $userRepo
    ) {}

    public function getCounselorScheduleOverview(string $slug): array
    {
        $counselor = $this->counselorRepository->getCounselorBySlug($slug);
        $schedules = $counselor->schedules()->where('is_active', true)->get();
        $startDate = ScheduleHelpers::findNearestScheduleDate($schedules);

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

    public function getUserReservations(int $userId, string $status): array
    {
        $statuses = array_key_exists($status, self::STATUS_GROUPS)
            ? self::STATUS_GROUPS[$status]
            : self::STATUS_GROUPS['upcoming'];

        $reservations = $this->consultationRepository
            ->getUserConsultations($userId, $statuses)
            ->through(fn(Consultation $c) => $this->formatReservation($c));

        return [
            'reservations' => $reservations,
            'stats'        => $this->consultationRepository->getUserStatistic(),
            'activeStatus' => $status,
        ];
    }



    public function store(array $data, bool $isLoggedIn)
    {
        if ($isLoggedIn) {
            $user = Auth::user();
        } else {
            $isBooked = $this->consultationRepository
                ->isSlotBooked($data['counselor'], $data['date'], $data['time']);

            if ($isBooked) {
                throw ValidationException::withMessages([
                    'time' => 'Slot waktu ini sudah penuh, silakan pilih jam lain.',
                ]);
            }

            $user = $this->userRepo->createAndLogin(
                $data['full_name'],
                $data['email'],
                $data['whatsapp'],
                $data['age'],
                $data['gender'],
                bcrypt(Str::random(12))
            );
        }

        $queuePosition =
            $this->consultationRepository->countQueueForDate(
                $data['counselor'],
                $data['date']
            ) + 1;

        // 1. CREATE CONSULTATION
        $consultation = $this->consultationRepository->create([
            'reference'                => $this->generateReference(),
            'user_id'                 => $user->id,
            'counselor_id'            => $data['counselor'],
            'categories'              => $data['concerns'],
            'consultation_date'       => $data['date'],
            'estimated_time'          => $data['time'],
            'method'                  => $data['method'],
            'client_first_experience' => $data['is_first'],
            'is_anonymous'            => $data['is_anonymous'],
            'queue_position'          => $queuePosition,
            'status'                  => 'pending_confirmation',
            'meeting_link'            => null,
        ]);

        // 2. AMBIL PRICE DARI COUNSELOR
        $amount = $this->counselorRepository->getCounselorPrice($data['counselor']);

        // 3. CREATE INVOICE
        $invoice = $this->invoiceRepository->create([
            'user_id'          => $user->id,
            'consultation_id'  => $consultation->id,
            'amount'           => $amount,
        ]);

        // 4. NOTES
        if (!empty($data['notes'])) {
            $consultation->notes()->create([
                'type'    => 'client_pre_sesi',
                'content' => $data['notes'],
            ]);
        }

        return [
            'consultation' => $consultation,
            'invoice'      => $invoice,
        ];
    }

    private function formatReservation(Consultation $c): array
    {
        $counselor = $c->counselor;
        $note = $c->notes->firstWhere('type', 'client_pre_sesi');

        return [
            'id'                       => $c->id,
            'reference'                => $c->reference,
            'counselor_name'           => $counselor->name,
            'counselor_specialization' => $counselor->specialization->name ?? '-',
            'counselor_photo'          => $counselor->photo_url,
            'date'                     => Carbon::parse($c->consultation_date)->translatedFormat('D, j M Y'),
            'time'                     => Carbon::parse($c->estimated_time)->format('H:i') . ' WIB',
            'duration'                 => $counselor->session_duration_minutes . ' menit',
            'mode'                     => $c->method === 'online' ? 'Online' : 'Tatap Muka',
            'price'                    => $counselor->pricing_type === 'free'
                ? 'Gratis'
                : 'Rp ' . number_format((float) $counselor->price_per_hour, 0, ',', '.'),
            'status'                   => $c->status,
            'status_label'             => self::STATUS_LABELS[$c->status] ?? $c->status,
            'notes'                    => $note?->content,
        ];
    }



    private function generateReference(): string
    {
        do {
            $reference = 'RSV-' . now()->format('Ymd') . '-' . Str::upper(Str::random(6));
        } while ($this->consultationRepository->referenceExists($reference));

        return $reference;
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

<?php

namespace App\Services;

use App\Models\Consultation;
use App\Repositories\ConsultationRepository;
use App\Repositories\CounselorRepository;
use App\Repositories\InvoiceRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Constants\ConsultationConstant;

class ReservationService
{

    public function __construct(
        protected CounselorRepository $counselorRepository,
        protected ConsultationRepository $consultationRepository,
        protected InvoiceRepository $invoiceRepository,
        protected UserRepository $userRepo
    ) {}


    public function getUserReservations(int $userId, string $status): array
    {
        $statuses = array_key_exists($status, ConsultationConstant::STATUS_GROUPS)
            ? ConsultationConstant::STATUS_GROUPS[$status]
            : ConsultationConstant::STATUS_GROUPS['upcoming'];

        $reservations = $this->consultationRepository
            ->getUserConsultations($userId, $statuses)
            ->through(fn(Consultation $c) => $this->formatReservation($c));

        return [
            'reservations' => $reservations,
            'stats'        => $this->consultationRepository->getUserStatistic($userId),
            'activeStatus' => $status,
        ];
    }

    public function getReservationDetail($reference, int $userId): array
    {
        $consultation = $this->consultationRepository->findDetailForUser($reference, $userId);
        abort_if(!$consultation, 404);
        return [
            'reservation' => $this->formatReservationDetail($consultation),
        ];
    }

    private function formatReservationDetail(Consultation $c): array
    {
        $counselor = $c->counselor;

        // status "sudah dikonfirmasi ke atas" -> tampilkan meeting_link / lokasi
        $isConfirmedOrBeyond = in_array($c->status, ['confirmed', 'in_queue', 'in_progress', 'completed'], true);
        $isCancelledLike     = in_array($c->status, ['cancelled', 'rejected'], true);

        $preNote      = $c->notes->firstWhere('type', 'client_pre_sesi');
        $cancelNote   = $c->notes->firstWhere('type', 'cancel');
        $progressNote = $c->notes->firstWhere('type', 'progress');
        $pascaNote    = $c->notes->firstWhere('type', 'pasca_sesi');

        $needsPayment = $c->invoice && $c->invoice->status === 'pending';

        return [
            'id'             => $c->id,
            'reference'      => $c->reference,
            'status'         => $c->status,
            'status_label'   => ConsultationConstant::STATUS_LABELS[$c->status] ?? $c->status,
            'status_group'   => $this->resolveStatusGroup($c->status),
            'queue_position' => $c->status === 'in_queue' ? $c->queue_position : null,

            'counselor' => [
                'name'           => $counselor->name,
                'slug'           => $counselor->slug,
                'photo_url'      => $counselor->photo_url,
                'specialization' => $counselor->specialization->name ?? '-',
                'whatsapp'       => $counselor->whatsapp,
            ],

            'schedule' => [
                'date'     => Carbon::parse($c->consultation_date)->translatedFormat('l, j F Y'),
                'time'     => Carbon::parse($c->estimated_time)->format('H:i') . ' WIB',
                'duration' => $counselor->session_duration_minutes . ' menit',
            ],

            'method'       => $c->method,
            'method_label' => $c->method === 'online' ? 'Online' : 'Tatap Muka',
            'is_anonymous' => (bool) $c->is_anonymous,
            'is_first'     => (bool) $c->client_first_experience,
            'categories'   => $c->categories,

            'meeting_link' => ($c->method === 'online' && $isConfirmedOrBeyond)
                ? $c->meeting_link
                : null,

            'location' => ($c->method === 'offline' && $isConfirmedOrBeyond)
                ? [
                    'name'     => $counselor->address->name ?? null,
                    'address'  => $counselor->address->address ?? null,
                    'city'     => $counselor->address->city ?? null,
                    'maps_url' => $counselor->address->maps_url ?? null,
                ]
                : null,

            'notes' => [
                'client'               => $preNote?->content,
                'progress'             => $isConfirmedOrBeyond ? $progressNote?->content : null,
                'post_session'         => $c->status === 'completed' ? $pascaNote?->content : null,
                'cancellation_reason'  => $isCancelledLike ? $cancelNote?->content : null,
            ],

            'invoice' => $c->invoice ? [
                'id'               => $c->invoice->id,
                'reference'        => $c->invoice->reference,
                'amount'           => (float) $c->invoice->amount,
                'amount_formatted' => 'Rp ' . number_format((float) $c->invoice->amount, 0, ',', '.'),
                'status'           => $c->invoice->status,
                'payment_method'   => $c->invoice->payment_method,
                'expired_at'       => optional($c->invoice->expired_at)->toISOString(),
                'paid_at'          => optional($c->invoice->paid_at)->toISOString(),
            ] : null,

            'needs_payment' => $needsPayment,

            'price_label' => $counselor->pricing_type === 'free'
                ? 'Gratis'
                : 'Rp ' . number_format((float) $counselor->price_per_hour, 0, ',', '.'),
        ];
    }

    private function resolveStatusGroup(string $status): string
    {
        foreach (ConsultationConstant::STATUS_GROUPS as $group => $statuses) {
            if ($statuses && in_array($status, $statuses, true)) {
                return $group;
            }
        }

        return 'all';
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


        $consultation = $this->consultationRepository->create([
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

        $amount = $this->counselorRepository->getCounselorPrice($data['counselor']);

        $invoice = $this->invoiceRepository->create([
            'user_id'         => $user->id,
            'consultation_id' => $consultation->id,
            'amount'          => $amount,
            'expired_at'      => now()->addMinutes(10),
        ]);

        if (!empty($data['notes'])) {
            $consultation->notes()->create([
                'type'    => 'client_pre_sesi',
                'content' => $data['notes'],
            ]);
        }
return $consultation->reference;
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
            'status_label'             => ConsultationConstant::STATUS_LABELS[$c->status] ?? $c->status,
            'notes'                    => $note?->content,
        ];
    }


}

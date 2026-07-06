<?php

namespace App\Services;

use App\Repositories\ConsultationRepository;
use App\Repositories\CounselorRepository;
use App\Repositories\InvoiceRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Constants\StatusConstant;
use App\Http\Resources\ConsultationDetailResource;
use App\Http\Resources\ConsultationListResource;

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
        $statuses = array_key_exists($status, StatusConstant::STATUS_GROUPS)
            ? StatusConstant::STATUS_GROUPS[$status]
            : StatusConstant::STATUS_GROUPS['upcoming'];

        $reservations = $this->consultationRepository
            ->getUserConsultations($userId, $statuses);

        return [
            'reservations' => ConsultationListResource::collection($reservations),
            'stats'        => $this->consultationRepository->getUserStatistic($userId),
            'activeStatus' => $status,
        ];
    }

    public function getReservationDetail($reference, int $userId): array
    {
        $consultation = $this->consultationRepository->findDetailForUser($reference, $userId);
        abort_if(!$consultation, 404);
        return [
            'reservation' => new ConsultationDetailResource($consultation)
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


}

<?php

namespace App\Http\Controllers;

use App\Services\CounselorScheduleService;
use App\Services\ReservationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    private const ALLOWED_STATUSES = ['upcoming', 'completed', 'cancelled', 'all'];

    public function __construct(protected ReservationService $service,protected CounselorScheduleService $CounselorScheduleService) {}

    public function index(Request $request)
    {
        $status = $request->query('status', 'upcoming');
        if (!in_array($status, self::ALLOWED_STATUSES, true)) {
            $status = 'upcoming';
        }
        $data = $this->service->getUserReservations(Auth::id(), $status);
        return inertia('reservation/index', $data);
    }

    public function create($counselor)
    {
        $data = $this->CounselorScheduleService->getCounselorScheduleOverview($counselor);
        return inertia('reservation/create', [
            'counselor'    => $data['counselor'],
            'availability' => $data['overview'],
        ]);
    }

    public function show($reference)
    {
        $data = $this->service->getReservationDetail($reference, Auth::id());
        return inertia('reservation/detail', $data);
    }

    public function store(Request $request)
    {
        $isLoggedIn = Auth::check();

        $data = $request->validate([
            'counselor'    => ['required', 'integer', 'exists:counselors,id'],
            'date'         => ['required', 'date', 'after_or_equal:today'],
            'time'         => ['required', 'date_format:H:i'],
            'method'       => ['required', 'in:online,offline'],
            'is_anonymous' => ['required', 'boolean'],
            'concerns'     => ['required', 'string'],
            'full_name'    => ['required', 'string', 'max:255'],
            'age'          => ['required', 'integer', 'min:12', 'max:99'],
            'whatsapp'     => ['required', 'string', 'max:20'],
            'email'        => ['required', 'email', 'max:255'],
            'gender'       => ['required', 'in:L,P'],
            'is_first'     => ['required', 'boolean'],
            'notes'        => ['nullable', 'string', 'max:1000'],
        ]);

        $reference = $this->service->store($data, $isLoggedIn);

        return redirect()
            ->route('reservations.detail', $reference)
            ->with('toast', [
                'type' => 'success',
                'message' => 'Reservasi berhasil dibuat'
            ]);
    }
}

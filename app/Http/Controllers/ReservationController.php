<?php

namespace App\Http\Controllers;

use App\Services\CounselorService;
use App\Services\ReservationService;
use Illuminate\Http\Request;

class ReservationController extends Controller
{

    public function __construct(protected ReservationService $service) {}

    public function create($counselor)
    {
        $data = $this->service->getCounselorScheduleOverview($counselor);

        return inertia('reservation/create', [
            "counselor" => $data['counselor'],
            "availability" => $data['overview']
        ]);
    }
}

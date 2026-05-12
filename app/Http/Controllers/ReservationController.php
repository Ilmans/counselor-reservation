<?php

namespace App\Http\Controllers;

use App\Services\CounselorService;
use App\Services\ReservationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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


    public function store(Request $request)
    {
        $isLoggedIn = Auth::check();
        
        $data =  $request->validate([
            'counselor'    => ['required', 'integer', 'exists:counselors,id'],
            'date'         => ['required', 'date', 'after_or_equal:today'],
            'time'         => ['required', 'date_format:H:i'],
            'method'       => ['required', 'in:online,offline'],
            'is_anonymous' => ['required', 'boolean'],
            'concerns'     => ['required', 'string'],
            'full_name'    => ['required', 'string', 'max:255'],
            'age'          => ['required', 'integer', 'min:12', 'max:99'],
            'whatsapp'        => ['required', 'string', 'max:20'],
            'email'        => ['required', 'email', 'max:255'],
            'gender'       => ['required', 'in:L,P'],
            'is_first'     => ['required', 'boolean'],
            'notes'        => ['nullable', 'string', 'max:1000'],
        ]);

        $result = $this->service->store($data, $isLoggedIn);
       
        return back();
    }
}

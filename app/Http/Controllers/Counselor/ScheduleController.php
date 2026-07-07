<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Repositories\ScheduleRepository;
use App\Services\CounselorScheduleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{

    public function __construct(
        protected CounselorScheduleService $scheduleService,
        protected ScheduleRepository $scheduleRepository,
    ) {}

    public function index()
    {
        $counselorId = Auth::user()->counselor->id;
        $calendar = $this->scheduleService->getSimpleCounselorScheduleOverview($counselorId);
        $schedules = $this->scheduleRepository->getCounselorSchedule($counselorId);

        return inertia('Counselor/schedule/index', compact('schedules', 'calendar'));
    }

    public function update(Request $request)
    {
        $counselorId = Auth::user()->counselor->id;

        $validated = $request->validate([
            'schedules' => ['required', 'array', 'size:7'],
            'schedules.*.day_of_week' => ['required', 'integer', 'between:0,6', 'distinct'],
            'schedules.*.open_time' => ['required', 'date_format:H:i:s'],
            'schedules.*.close_time' => ['required', 'date_format:H:i:s', 'after:schedules.*.open_time'],
            'schedules.*.method' => ['required', 'in:online,offline,both'],
            'schedules.*.is_active' => ['required', 'boolean'],
        ]);

        $this->scheduleRepository->upsertCounselorSchedule($counselorId, $validated['schedules']);

        return redirect()
            ->back()
            ->with('alert', [
                'type' => 'success',
                'msg' => 'Jadwal konsultasi berhasil diperbarui. Perubahan ini hanya berlaku untuk sesi baru; sesi yang sudah dikonfirmasi tidak terpengaruh.'
            ]);
    }
}

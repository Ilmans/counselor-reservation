<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateScheduleRequest;
use App\Repositories\ScheduleRepository;
use App\Services\CounselorScheduleService;
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

    public function update(UpdateScheduleRequest $request)
    {
        $counselorId = Auth::user()->counselor->id;
        $validated = $request->validated();
        $this->scheduleRepository->upsertCounselorSchedule($counselorId, $validated['schedules']);
        return redirect()
            ->back()
            ->with('alert', [
                'type' => 'success',
                'msg' => 'Jadwal konsultasi berhasil diperbarui. Perubahan ini hanya berlaku untuk sesi baru; sesi yang sudah dikonfirmasi tidak terpengaruh.'
            ]);
    }
}

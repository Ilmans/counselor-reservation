<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\ManagesCounselorProfile;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateScheduleRequest;
use App\Http\Resources\CounselorListResource;
use App\Http\Resources\CounselorResource;
use App\Models\Counselor;
use App\Repositories\CounselorRepository;
use App\Repositories\ScheduleRepository;
use Illuminate\Http\Request;

class AdminCounselorController extends Controller
{
    use ManagesCounselorProfile;

    public function __construct(
        protected CounselorRepository $counselorRepo,
        protected ScheduleRepository $scheduleRepository
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only('status', 'search', 'category');
        $status = $request->filled('status') ? (array) $request->status : ['active', 'inactive'];
        $counselors = CounselorListResource::collection(
            $this->counselorRepo->getAllCounselors($status, 12, $request->category, $request->search)
        );

        return inertia('Admin/counselor/index', compact('counselors', 'filters'));
    }

    public function edit(int $id)
    {
        $counselor = new CounselorResource($this->counselorRepo->findCounselor($id));
        abort_if(!$counselor, 404);
        $schedules = $this->scheduleRepository->getCounselorSchedule($counselor->id);

        return inertia('Admin/counselor/edit', compact('counselor', 'schedules'));
    }

    public function updateSchedule(UpdateScheduleRequest $request, Counselor $counselor)
    {
        $validated = $request->validated();
        $this->scheduleRepository->upsertCounselorSchedule($counselor->id, $validated['schedules']);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Jadwal konsultasi berhasil diperbarui. Perubahan ini hanya berlaku untuk sesi baru; sesi yang sudah dikonfirmasi tidak terpengaruh.',
            'code' => rand(1, 5),
        ]);
    }
}

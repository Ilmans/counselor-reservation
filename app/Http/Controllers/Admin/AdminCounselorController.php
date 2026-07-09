<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Concerns\ManagesCounselorProfile;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCounselorRequest;
use App\Http\Requests\UpdateScheduleRequest;
use App\Http\Resources\CounselorListResource;
use App\Http\Resources\CounselorResource;
use App\Models\Counselor;
use App\Models\CounselorAddress;
use App\Models\User;
use App\Repositories\CounselorRepository;
use App\Repositories\ScheduleRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminCounselorController extends Controller
{
    use ManagesCounselorProfile;

    public function __construct(
        protected CounselorRepository $counselorRepo,
        protected ScheduleRepository $scheduleRepository
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only('visibility', 'search', 'category');
        $visibilities = $request->filled('visibility') ? (array) $request->visibility : ['active', 'inactive'];
        $counselors = CounselorListResource::collection(
            $this->counselorRepo->getAllCounselors($visibilities, 12, $request->category, $request->search)
        );
        return inertia('Admin/counselor/index', compact('counselors', 'filters'));
    }

    public function create()
    {
        return inertia('Admin/counselor/create');
    }

    public function store(StoreCounselorRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $request) {
            $user = User::findOrFail($validated['user_id']);
            $user->update(['role' => 'counselor']);
            $address = CounselorAddress::create($validated['address']);
            $photoPath = $request->hasFile('photo')
                ? $request->file('photo')->store('counselors', 'public')
                : null;

            $profileOnly = Arr::except($validated, [
                'user_id',
                'address',
                'category_ids',
                'photo',
                'schedules',
            ]);
            $counselor = Counselor::create([
                ...$profileOnly,
                'user_id' => $validated['user_id'],
                'address_id' => $address->id,
                'photo_path' => $photoPath,
                'slug' => Str::slug($validated['name']),
            ]);
            $counselor->categories()->sync($validated['category_ids']);

            if (!empty($validated['schedules'])) {
                foreach ($validated['schedules'] as $schedule) {
                    $counselor->schedules()->create($schedule);
                }
            }
        });

        return redirect()
            ->route('admin.counselors')
            ->with('toast', [
                'type' => 'success',
                'message' => 'Konselor berhasil ditambahkan.',
            ]);
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

    //soft deletes
    public function delete(Counselor $counselor)
    {
        $hasActiveConsultations = $counselor->consultations()
            ->whereNotIn('status', [
                'cancelled',
                'rejected',
                'completed',
            ])
            ->exists();

        if ($hasActiveConsultations) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Konselor tidak dapat dihapus karena masih memiliki konsultasi yang sedang berjalan.',
                'code' => rand(1, 5),
            ]);
        }

        $counselor->delete();

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Data konselor berhasil dihapus.',
            'code' => rand(1, 5),
        ]);
    }
}

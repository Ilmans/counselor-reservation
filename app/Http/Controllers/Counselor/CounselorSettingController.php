<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Concerns\ManagesCounselorProfile;
use App\Http\Controllers\Controller;
use App\Http\Resources\CounselorResource;
use App\Repositories\CounselorRepository;
use Illuminate\Support\Facades\Auth;

class CounselorSettingController extends Controller
{
    use ManagesCounselorProfile;

    public function __construct(protected CounselorRepository $counselorRepo) {}

    public function index()
    {
        $counselorId = Auth::user()->counselor->id;
        $counselor = new CounselorResource($this->counselorRepo->findCounselor($counselorId));

        return inertia('Counselor/settings/index', compact('counselor'));
    }
}

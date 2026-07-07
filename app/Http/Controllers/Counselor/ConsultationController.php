<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConsultationListResource;
use App\Repositories\ConsultationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsultationController extends Controller
{
    public function __construct(
        protected ConsultationRepository $repo
    ) {}


    public function index(Request $request)
    {
        $filters = $request->only('status', 'search', 'date');
        $counselorId = Auth::user()->counselor->id;
        $statuses = $request->filled('status') ? [$request->status] : null;
        $consultations = ConsultationListResource::collection(
            $this->repo->getCounselorConsultations(
                $counselorId,
                $statuses,
                $request->search,
                $request->date,
            )
        );
        return inertia('Counselor/consultation/index', compact('consultations', 'filters'));
    }
}

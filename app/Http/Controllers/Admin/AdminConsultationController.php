<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConsultationDetailResource;
use App\Http\Resources\ConsultationListResource;
use App\Models\Consultation;
use App\Repositories\ConsultationRepository;
use App\Repositories\ReviewRepository;
use Illuminate\Http\Request;

class AdminConsultationController extends Controller
{
    public function __construct(
        protected ConsultationRepository $consultationRepo,
        protected ReviewRepository $feedbackRepo
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only('status', 'method', 'date', 'search');
        $statuses = $request->filled('status') ? (array) $request->status : null;

        $consultations = ConsultationListResource::collection(
            $this->consultationRepo->getAllConsultationsForAdmin(
                $statuses,
                $request->search,
                $request->date,
                $request->method,
            )
        );

        return inertia('Admin/consultation/index', compact('consultations', 'filters'));
    }

    public function show(string $reference)
    {
        $consultation = $this->consultationRepo->findByReference($reference);
        abort_if(!$consultation, 404);
        $feedback= $this->feedbackRepo->findFeedback($consultation->id);

        return inertia('Admin/consultation/show', [
            'consultation' => new ConsultationDetailResource($consultation),
            'feedback'  => $feedback,
        ]);
    }


    public function updateStatus(Request $request, Consultation $consultation)
    {
        $validated = $request->validate([
            'status' => [
                'required',
                'in:pending_payment,pending_confirmation,confirmed,in_queue,in_progress,completed,cancelled,rejected',
            ],
            'note' => ['required_if:status,cancelled,rejected', 'nullable', 'string', 'max:2000'],
        ]);

        $this->consultationRepo->updateConsultationStatus(
            $consultation,
            $validated['status'],
            $validated['note'] ?? null,
        );

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Status konsultasi berhasil diperbarui.',
        ]);
    }

    public function delete(Consultation $consultation)
    {
        $consultation->delete();

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Data konsultasi berhasil dihapus.',
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Services\ReservationService;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConsultationSummaryController extends Controller
{
    public function __construct(protected ReservationService $service) {}

    public function download(Request $request, string $reference)
    {
        $reservationDetail = $this->service->getReservationDetail($reference, Auth::id());
        $reservation = $reservationDetail['reservation'];

        // Defensif walau service sudah scoping by Auth::id() — jangan sampai
        // ada celah kalau logika service berubah nanti.
        abort_unless(
            $reservation->user_id === $request->user()->id,
            403,
        );
        // Dokumen ringkasan cuma masuk akal untuk sesi yang sudah kelar —
        // jangan generate untuk sesi yang masih berjalan / belum pasti isinya.
        abort_unless($reservation->status === 'completed', 404);

        $reservation->load([
            'counselor',
            // Hanya catatan yang memang boleh dilihat klien yang masuk ke
            // dokumen — catatan internal konselor tidak pernah ikut.
            'notes' => fn($query) => $query
                ->where('visibility', 'shared')
                ->orderBy('created_at'),
        ]);

        // Sanitasi ringan tanpa dependency tambahan: batasi tag yang boleh
        // lolos ke PDF. Kalau nanti mews/purifier ter-install, baris ini bisa
        // diganti clean($note->content).
        $allowedTags = '<p><br><strong><em><u>
                <ul>
                    <ol>
                        <li>';
        foreach ($reservation->notes as $note) {
            $note->content = strip_tags($note->content, $allowedTags);
        }

        // Kelompokkan per tipe catatan supaya bisa dipetakan ke section
        // laporan formal: keluhan awal, proses, hasil, saran. Satu tipe bisa
        // berisi lebih dari satu catatan kalau kliennya sudah sesi lanjutan.
        $notesByType = $reservation->notes->groupBy('type');

        $pdf = Pdf::loadView('reservation-summary', [
            'reference' => $reservation->reference,
            'counselorName' => $reservation->counselor->name,
            'counselorSpecialization' => $reservation->counselor->specialization,
            'date' => Carbon::parse($reservation->consultation_date)->translatedFormat('l, j F Y'),
            'time' => Carbon::parse($reservation->estimated_time)->format('H:i') . ' WIB',
            'methodLabel' => $reservation->method === 'online' ? 'Online' : 'Tatap Muka',
            'categories' => $reservation->categories,
            'isFirst' => (bool) $reservation->client_first_experience,
            'isAnonymous' => (bool) $reservation->is_anonymous,
            'preSessionNotes' => $notesByType->get('pre_session', collect()),
            'sessionNotes' => $notesByType->get('session', collect()),
            'summaryNotes' => $notesByType->get('summary', collect()),
            'followUpNotes' => $notesByType->get('follow_up', collect()),
            'generatedAt' => now()->translatedFormat('j F Y'),
            'documentYear' => Carbon::parse($reservation->consultation_date)->year,
        ])->setPaper('a4');

        $filename = "ringkasan-sesi-{$reservation->reference}.pdf";

        return $pdf->download($filename);
    }
}

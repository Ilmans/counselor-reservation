<?php

namespace App\Observers;

use App\Models\Consultation;
use App\Services\ConsultationChatService;

class ConsultationObserver
{
    public function __construct(protected ConsultationChatService $chatService) {}

    /**
     * Dipanggil saat consultation baru dibuat (mis. dari ConsultationService::store()).
     * Cuma bikin row consultation_chats-nya (status closed), belum ada AI/apapun
     * karena status awal masih pending_confirmation.
     */
    public function created(Consultation $consultation): void
    {
        try {
            $this->chatService->getOrCreateChat($consultation);
            $this->chatService->sendMessage(
                $consultation,
                "system",
                null,
                "Halo, fitur chat ini disediakan sebagai media komunikasi utama antara konselor dan klien setelah konsultasi dikonfirmasi.

Selain melalui chat, konselor maupun klien juga dapat menggunakan media komunikasi eksternal seperti Zoom atau meeting link lainnya yang tersedia apabila diperlukan. Fitur tersebut hanya sebagai media pendukung untuk mempermudah proses konsultasi."
            );
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Dipanggil setiap ->update() ke consultation, termasuk semua status
     * transition di ManagesConsultationStatus (approve/reject/start/complete).
     * Cuma proses kalau kolom status yang berubah, biar update lain (mis.
     * meeting_link) tidak ikut trigger sync yang tidak perlu.
     */
    public function updated(Consultation $consultation): void
    {
        if ($consultation->isDirty('status')) {
            $this->chatService->syncStatus($consultation);
        }
    }
}

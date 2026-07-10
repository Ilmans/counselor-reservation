<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Concerns\ManagesConsultationStatus;
use App\Http\Controllers\Controller;
use App\Models\Consultation;
use Illuminate\Http\Request;

class ManageStatusConsultationController extends Controller
{
    use ManagesConsultationStatus;


    public function storeNote(Request $request, Consultation $consultation)
    {
        if (! $this->authorizeConsultationAccess($consultation)) {
            return $this->alert('error', 'Anda tidak memiliki akses ke sesi ini.');
        }

        $allowedTypes = ['session', 'summary', 'follow_up'];
        $type = $request->input('type');

        if (! in_array($type, $allowedTypes, true)) {
            return $this->alert('error', 'Kategori catatan tidak valid.');
        }

        $allowedVisibility = ['shared', 'counselor_only'];
        $visibility = $request->input('visibility', 'shared');

        if (! in_array($visibility, $allowedVisibility, true)) {
            return $this->alert('error', 'Visibilitas catatan tidak valid.');
        }

        $content = trim((string) $request->input('content'));

        if ($content === '' || $content === '<p><br></p>') {
            return $this->alert('error', 'Catatan tidak boleh kosong.');
        }

        if (mb_strlen(strip_tags($content)) < 3) {
            return $this->alert('error', 'Catatan terlalu singkat.');
        }

        $consultation->notes()->create([
            'type' => $type,
            'visibility' => $visibility,
            'content' => $content,
        ]);

        return $this->alert('success', 'Catatan berhasil disimpan.');
    }

    public function updateMeetingLink(Request $request, Consultation $consultation)
    {
        $request->validate([
            'meeting_link' => 'required|url'
        ]);
        $consultation->meeting_link = $request->meeting_link;
        $consultation->update();
        return back();
    }
}

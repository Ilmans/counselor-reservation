<?php

namespace App\Http\Controllers\Concerns;

use App\Models\Consultation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

trait ManagesConsultationStatus
{
    /**
     * pending_confirmation -> confirmed
     */
    public function approve(Consultation $consultation)
    {
        if (! $this->authorizeConsultationAccess($consultation)) {
            return $this->alert('error', 'Anda tidak memiliki akses ke sesi ini.');
        }

        if ($consultation->status !== 'pending_confirmation') {
            return $this->alert('error', "Sesi ini berstatus \"{$consultation->status_label}\", tidak bisa dikonfirmasi.");
        }

        $consultation->update(['status' => 'confirmed']);

        return $this->alert('success', 'Sesi berhasil dikonfirmasi. Jadwal kini mengikat kedua pihak.');
    }

    /**
     * pending_confirmation -> rejected
     * catatan disimpan ke consultation_notes (type: cancellation, visibility: shared)
     */
    public function reject(Request $request, Consultation $consultation)
    {
        if (! $this->authorizeConsultationAccess($consultation)) {
            return $this->alert('error', 'Anda tidak memiliki akses ke sesi ini.');
        }

        if ($consultation->status !== 'pending_confirmation') {
            return $this->alert('error', "Sesi ini berstatus \"{$consultation->status_label}\", tidak bisa ditolak.");
        }

        $note = trim((string) $request->input('note'));

        if ($note === '' || $note === '<p><br></p>') {
            return $this->alert('error', 'Catatan penolakan wajib diisi.');
        }

        if (mb_strlen(strip_tags($note)) < 5) {
            return $this->alert('error', 'Catatan penolakan terlalu singkat, jelaskan alasannya.');
        }

        $consultation->status = 'rejected';
        $consultation->save();

        $consultation->notes()->create([
            'type' => 'cancellation',
            'visibility' => 'shared',
            'content' => $note,
        ]);

        return $this->alert('success', 'Sesi berhasil ditolak.');
    }

    /**
     * confirmed / in_queue -> in_progress
     */
    public function start(Consultation $consultation)
    {
        if (! $this->authorizeConsultationAccess($consultation)) {
            return $this->alert('error', 'Anda tidak memiliki akses ke sesi ini.');
        }

        if (! in_array($consultation->status, ['confirmed', 'in_queue'], true)) {
            return $this->alert('error', "Sesi berstatus \"{$consultation->status_label}\" tidak bisa langsung dimulai.");
        }

        $ongoing = Consultation::where('counselor_id', $consultation->counselor_id)
            ->where('id', '!=', $consultation->id)
            ->where('status', 'in_progress')
            ->exists();

        if ($ongoing) {
            return $this->alert('error', 'Masih ada sesi lain yang sedang berlangsung. Selesaikan sesi tersebut terlebih dahulu sebelum memulai sesi ini.');
        }

        // $scheduledAt = Carbon::parse(
        //     $consultation->consultation_date . ' ' . $consultation->estimated_time
        // );
        // $earliestStart = $scheduledAt->copy()->subMinutes(10);

        // if (now()->lt($earliestStart)) {
        //     return $this->alert('error', 'Belum waktunya memulai sesi ini. Jadwal sesi pada '
        //         . $scheduledAt->translatedFormat('d M Y, H:i') . ' WIB.');
        // }

        if ($consultation->status === 'in_queue') {
            $aheadInQueue = Consultation::where('counselor_id', $consultation->counselor_id)
                ->where('consultation_date', $consultation->consultation_date)
                ->whereIn('status', ['confirmed', 'in_queue'])
                ->where('estimated_time', '<', $consultation->estimated_time)
                ->exists();

            if ($aheadInQueue) {
                return $this->alert('error', 'Masih ada sesi lain dalam antrian sebelum sesi ini. Mohon tunggu giliran.');
            }
        }

        $consultation->update(['status' => 'in_progress']);

        return $this->alert('success', 'Sesi dimulai.');
    }

    /**
     * in_progress -> completed
     */
    public function complete(Consultation $consultation)
    {
        if (! $this->authorizeConsultationAccess($consultation)) {
            return $this->alert('error', 'Anda tidak memiliki akses ke sesi ini.');
        }

        if ($consultation->status !== 'in_progress') {
            return $this->alert('error', "Sesi berstatus \"{$consultation->status_label}\" belum berjalan, tidak bisa ditandai selesai.");
        }

        $consultation->update(['status' => 'completed']);

        return $this->alert('success', 'Sesi telah ditandai selesai.');
    }

    /**
     * admin bebas akses semua sesi, konselor hanya sesi miliknya.
     * NOTE: asumsi ada $user->role === 'admin'. Kalau pakai Spatie permission
     * atau mekanisme lain, ganti baris pengecekan admin ini saja.
     */
    protected function authorizeConsultationAccess(Consultation $consultation): bool
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return true;
        }

        return $consultation->counselor_id === $user->counselor?->id;
    }

    protected function alert(string $type, string $msg)
    {
        return back()->with('alert', [
            'type' => $type,
            'message' => $msg,
        ]);
    }
}

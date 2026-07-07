<?php

namespace App\Repositories;

use App\Models\CounselorSchedule;

class ScheduleRepository
{
    public function getActiveScheduleByCounselor(int $CounselorId)
    {
        return CounselorSchedule::where('is_active', true)->where('counselor_id', $CounselorId)
            ->get();
    }

    public function getCounselorSchedule(int $counselorId)
    {
        return CounselorSchedule::where('counselor_id', $counselorId)->get();
    }

    /**
     * Simpan/perbarui jadwal mingguan seorang counselor.
     *
     * Hanya menyentuh baris di `counselor_schedules` (definisi jam buka per
     * hari). Sesi yang sudah dipesan/dikonfirmasi klien hidup di tabel lain
     * (mis. konsultasi/booking) dan TIDAK disentuh oleh method ini, sehingga
     * perubahan jadwal di sini otomatis hanya berlaku untuk pemesanan baru
     * ke depan.
     *
     * @param  int    $counselorId
     * @param  array<int, array{
     *     day_of_week: int,
     *     open_time: string,
     *     close_time: string,
     *     method: string,
     *     is_active: bool
     * }>  $days
     */
    public function upsertCounselorSchedule(int $counselorId, array $days): void
    {
        foreach ($days as $day) {
            CounselorSchedule::updateOrCreate(
                [
                    'counselor_id' => $counselorId,
                    'day_of_week' => $day['day_of_week'],
                ],
                [
                    'open_time' => $day['open_time'],
                    'close_time' => $day['close_time'],
                    'method' => $day['method'],
                    'is_active' => $day['is_active'],
                ]
            );
        }
    }
}

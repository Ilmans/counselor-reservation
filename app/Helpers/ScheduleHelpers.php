<?php

namespace App\Helpers;

use Carbon\Carbon;

class ScheduleHelpers
{
    /**
     * Core: cari tanggal terdekat yang ada jadwalnya.
     * Return Carbon date atau null.
     */
    public static function findNearestScheduleDate($schedules): ?Carbon
    {
        if (!$schedules || $schedules->isEmpty()) return null;

        $now = Carbon::now(); // ← ganti dari now()
        $availableDays = $schedules->pluck('day_of_week')->unique()->toArray();

        for ($i = 0; $i < 7; $i++) {
            $date      = $now->copy()->startOfDay()->addDays($i);
            $dayOfWeek = (int) $date->format('N');

            if (!in_array($dayOfWeek, $availableDays)) continue;

            $matchedSchedules = $schedules->filter(fn($s) => $s->day_of_week == $dayOfWeek);

            if ($i === 0) {
                $stillOpen = $matchedSchedules->contains(function ($s) use ($now, $date) {
                    $close = Carbon::parse($date->toDateString() . ' ' . $s->close_time);
                    return $now->lt($close);
                });
                if (!$stillOpen) continue;
            }

            return $date;
        }

        return null;
    }

    /**
     * Wrapper: return schedule array + date string (untuk response API/view).
     */
    public static function findUpcomingSchedule($schedules): ?array
    {
        $date = self::findNearestScheduleDate($schedules);
        if (!$date) return null;

        $dayOfWeek = (int) $date->format('N');
        $schedule  = $schedules->first(fn($s) => $s->day_of_week == $dayOfWeek);

        return array_merge($schedule->toArray(), [
            'date' => $date->toDateString(),
        ]);
    }

    /**
     * Jika semua jadwal minggu ini terlewat, ambil jadwal pertama minggu depan.
     */
    public static function wrapToNextWeek($schedules): ?array
    {
        if (!$schedules || $schedules->isEmpty()) return null;

        $now   = now();
        $first = $schedules->sortBy('day_of_week')->first();

        $daysUntil = (7 - $now->isoWeekday()) + $first->day_of_week;

        return array_merge($first->toArray(), [
            'date' => $now->copy()->addDays($daysUntil)->toDateString(),
        ]);
    }
}

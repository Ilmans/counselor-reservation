<?php

namespace App\Helpers;

use Carbon\Carbon;
use Carbon\CarbonImmutable;

class ScheduleHelpers
{


    // to get next nearest schedule from all schedules
    public static function findUpcomingSchedule($schedules)
    {
        $now = now();
        foreach ($schedules as $schedule) {
            $dayDiff = $schedule->day_of_week - $now->isoWeekDay();
            // still on this week
            if ($dayDiff > 0) {
                return array_merge($schedule->toArray(), [
                    'date' => $now->copy()->addDays($dayDiff)->toDateString(),
                ]);
            }
            // today, check the time
            if ($dayDiff === 0) {
                $openTime = Carbon::parse($now->toDateString() . ' ' . $schedule->open_time);
                if ($now->lt($openTime)) {
                    return array_merge($schedule->toArray(), [
                        'date' => $now->toDateString(),
                    ]);
                }
            }
        }
        // missed day
        return null;
    }

    public static function wrapToNextWeek($schedules)
    {
        $now = now();
        if ($schedules->isEmpty()) return null;

        $first = $schedules->first();
        $daysUntil = (7 - $now->isoWeekday()) + $first->day_of_week;

        return array_merge($first->toArray(), [
            'date' => $now->copy()->addDays($daysUntil)->toDateString(),
        ]);
    }




    public static function findNearestScheduleDate(array $availableDaysOfWeek): ?Carbon
    {
        if (empty($availableDaysOfWeek)) return null;

        for ($i = 0; $i < 7; $i++) {
            $date = Carbon::now()->startOfDay()->addDays($i);

            if (in_array((int) $date->format('N'), $availableDaysOfWeek)) {
                return $date;
            }
        }

        return null;
    }
}

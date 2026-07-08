<?php

namespace App\Http\Resources;

use App\Helpers\ScheduleHelpers;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class CounselorListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'email' => $this->email,
            'whatsapp' => $this->whatsapp,
            'photo_path' => $this->photo_path,
            'photo' => $this->photo_path
                ? (filter_var($this->photo_path, FILTER_VALIDATE_URL)
                    ? $this->photo_path
                    : Storage::disk('public')->url($this->photo_path))
                : null,
            'specialization' => $this->specialization?->name,

            'categories' => $this->categories
                ->pluck('name')
                ->implode(', '),

            'pricing_type' => $this->pricing_type,

            'price_per_hour' => $this->pricing_type == "free"  ? "Gratis" : 'Rp ' . number_format((float) $this->price_per_hour, 0, ',', '.'),
            'status' => $this->status,
            'visibility' => $this->visibility,
            'visibility_label' => $this->visibility == "active" ? "Aktif" : "Non-Aktif",

            'consultations_count' => $this->consultations_count,
            'feedbacks_avg_rating' => $this->feedbacks_avg_rating
                ? round($this->feedbacks_avg_rating, 1)
                : null,
            'next_schedule' => $this->when(
                $this->relationLoaded('schedules'),
                function () {
                    $schedules = $this->schedules->sortBy('day_of_week');

                    $schedule = ScheduleHelpers::findUpcomingSchedule($schedules)
                        ?? ScheduleHelpers::wrapToNextWeek($schedules);

                    if (! $schedule) {
                        return null;
                    }

                    return [
                        'date' => $schedule['date'],

                        'day_of_week' => $schedule['day_of_week'],

                        'day_label' => match (true) {
                            $schedule['day_of_week'] === Carbon::now()->dayOfWeekIso
                            => 'Hari ini',

                            $schedule['day_of_week'] === Carbon::now()->addDay()->dayOfWeekIso
                            => 'Besok',

                            default => match ($schedule['day_of_week']) {
                                1 => 'Senin',
                                2 => 'Selasa',
                                3 => 'Rabu',
                                4 => 'Kamis',
                                5 => 'Jumat',
                                6 => 'Sabtu',
                                7 => 'Minggu',
                                default => null,
                            },
                        },

                        'open_time' => Carbon::parse($schedule['open_time'])
                            ->format('H:i'),

                        'close_time' => Carbon::parse($schedule['close_time'])
                            ->format('H:i'),

                        'time_label' =>
                        Carbon::parse($schedule['open_time'])->format('H:i')
                            . ' - ' .
                            Carbon::parse($schedule['close_time'])->format('H:i'),

                        'method' => $schedule['method'],

                        'method_label' => match ($schedule['method']) {
                            'online' => 'Online',
                            'offline' => 'Offline',
                            'both' => 'Online & Offline',
                            default => null,
                        },
                    ];
                }


            ),
        ];
    }
}

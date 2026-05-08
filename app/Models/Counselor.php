<?php

namespace App\Models;

use App\Helpers\ScheduleHelpers;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Counselor extends Model
{
    protected $appends = ['next_schedule'];
    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, "counselor_categories");
    }

    public function schedules()
    {
        return $this->hasMany(CounselorSchedule::class);
    }

    public function consultations()
    {
        return $this->hasMany(Consultation::class);
    }

    public function feedbacks()
    {
        return $this->hasManyThrough(
            ConsultationFeedback::class,
            Consultation::class,
            'counselor_id',
            'consultation_id',
            'id',
            'id'
        );
    }


    protected function nextSchedule(): Attribute
    {
        return Attribute::make(function () {
            $schedules = $this->schedules()
                ->where('is_active', true)->select('open_time', 'close_time', 'day_of_week', 'method')
                ->orderBy('day_of_week')
                ->get();

            $next = ScheduleHelpers::findUpcomingSchedule($schedules)
                ?? ScheduleHelpers::wrapToNextWeek($schedules);

            return $next;
        });
    }
}

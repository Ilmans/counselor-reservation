<?php

namespace App\Models;

use App\Helpers\ScheduleHelpers;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Counselor extends Model
{

    use SoftDeletes;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }

    public function address()
    {
        return $this->belongsTo(CounselorAddress::class);
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

    public function wallet()
    {
        return $this->hasOne(CounselorWallet::class);
    }
}

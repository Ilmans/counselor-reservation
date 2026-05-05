<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Counselor extends Model
{
    public function specialization(){
        return $this->belongsTo(Specialization::class);
    }

    public function categories(){
        return $this->belongsToMany(Category::class,"counselor_categories");
    }

    public function schedules (){
        return $this->hasMany(CounselorSchedule::class);
    }

    public function consultations (){
        return $this->hasMany(Consultation::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function counselor()
    {
        return $this->belongsTo(Counselor::class);
    }
    public function note()
    {
        return $this->hasOne(ConsultationNote::class);
    }
    public function feedback()
    {
        return $this->hasOne(ConsultationFeedback::class);
    }
}

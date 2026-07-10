<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{

    protected $guarded = ['id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function counselor()
    {
        return $this->belongsTo(Counselor::class);
    }
    public function notes()
    {
        return $this->hasMany(ConsultationNote::class);
    }
    public function feedback()
    {
        return $this->hasOne(ConsultationFeedback::class);
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }
    // di dalam App\Models\Consultation


    public function chat()
    {
        return $this->hasOne(ConsultationChat::class);
    }

    public function messages()
    {
        return $this->hasMany(ConsultationChatMessage::class);
    }

}

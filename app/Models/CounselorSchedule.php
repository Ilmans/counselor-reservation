<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CounselorSchedule extends Model
{
    public function counselor()
    {
        return $this->belongsTo(Counselor::class);
    }
}

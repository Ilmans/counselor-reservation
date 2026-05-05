<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialization extends Model
{

    public function counselors (){
        return $this->hasMany(Counselor::class);
    }
}

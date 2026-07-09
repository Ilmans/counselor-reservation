<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialization extends Model
{

protected $guarded = ["id"];
public $timestamps = false;
    public function counselors (){
        return $this->hasMany(Counselor::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = ['id'];
    public $timestamps = false;
    public function counselors()
    {
        return $this->belongsToMany(Counselor::class, 'counselor_categories');
    }
}

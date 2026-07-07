<?php
// app/Models/ConsultationFeedback.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsultationFeedback extends Model
{
    use HasFactory;

    protected $fillable = [
        'consultation_id',
        'rating',
        'comment',
        'is_anonymous',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
        'rating' => 'integer',
    ];

    public function consultation()
    {
        return $this->belongsTo(Consultation::class);
    }
}

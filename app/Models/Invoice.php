<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{

    public $timestamps = false;
    protected $fillable = [
        'reference',
        'user_id',
        'consultation_id',
        'amount',
        'status',
    ];


    // 🔥 RELASI: Invoice belongs to User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // 🔥 RELASI: Invoice belongs to Consultation
    public function consultation(): BelongsTo
    {
        return $this->belongsTo(Consultation::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Withdrawal extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference',
        'counselor_id',
        'amount',
        'bank_name',
        'account_number',
        'account_holder_name',
        'status',
        'notes',
        'processed_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'processed_at' => 'datetime',
    ];

    public function counselor(): BelongsTo
    {
        return $this->belongsTo(Counselor::class);
    }
}

<?php

use App\Models\Consultation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('consultation.{consultationId}', function ($user, $consultationId) {
    $consultation = Consultation::find($consultationId);
    if (! $consultation) {
        return false;
    }

    if ($user->id === $consultation->user_id) {
        return true;
    }

    if ($consultation->counselor && $user->id === $consultation->counselor->user_id) {
        return true;
    }

    return false;
});

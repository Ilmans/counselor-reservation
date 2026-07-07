<?php

namespace App\Enums;

enum ConsultationStatus: string
{
    case PENDING_PAYMENT = 'pending_payment';
    case PENDING_CONFIRMATION = 'pending_confirmation';
    case CONFIRMED = 'confirmed';
    case IN_QUEUE = 'in_queue';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';
    case REJECTED = 'rejected';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

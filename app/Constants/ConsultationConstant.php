<?php

namespace App\Constants;

class ConsultationConstant
{
    public const STATUS_GROUPS = [
        'upcoming'  => ['pending_payment', 'pending_confirmation', 'confirmed', 'in_queue', 'in_progress'],
        'completed' => ['completed'],
        'cancelled' => ['cancelled', 'rejected'],
        'all'       => null,
    ];

    public const STATUS_LABELS = [
        'pending_payment'      => 'Menunggu Pembayaran',
        'pending_confirmation' => 'Menunggu Konfirmasi',
        'confirmed'            => 'Terkonfirmasi',
        'in_queue'             => 'Dalam Antrian',
        'in_progress'          => 'Sedang Berlangsung',
        'completed'            => 'Selesai',
        'cancelled'            => 'Dibatalkan',
        'rejected'             => 'Ditolak',
    ];
}

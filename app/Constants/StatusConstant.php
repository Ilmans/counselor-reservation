<?php

namespace App\Constants;

class StatusConstant
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


    public const INVOICE_STATUS_LABEL = [
        'pending'   => 'Menunggu Pembayaran',
        'paid'      => 'Lunas',
        'expired'   => 'Kedaluwarsa',
        'failed'    => 'Gagal',
        'cancelled' => 'Dibatalkan',
        'refunded'  => 'Dikembalikan',
    ];

}

<?php

namespace App\Support;

use Carbon\Carbon;

class AppContext
{
    public static function make(): array
    {
        $now = Carbon::now();

        return [
            'name' => "Tenang.Id",
            'desc' => " Platform reservasi konseling yang menghubungkan kamu
                            dengan konselor profesional tersertifikasi.",
            'logo' => asset('images/logo.png'),
            'date' => [
                'day' => $now->translatedFormat('l'),
                'date' => $now->translatedFormat('d F Y'),
                'time' => $now->format('H:i'),
                'datetime' => $now->toIso8601String(),
            ],

            'greeting' => self::greeting($now),
            'availableBank' => [
                ['code' => 'BCA', 'name' => 'Bank Central Asia (BCA)'],
                ['code' => 'BRI', 'name' => 'Bank Rakyat Indonesia (BRI)'],
                ['code' => 'BNI', 'name' => 'Bank Negara Indonesia (BNI)'],
                ['code' => 'MANDIRI', 'name' => 'Bank Mandiri'],
                ['code' => 'BSI', 'name' => 'Bank Syariah Indonesia (BSI)'],
                ['code' => 'CIMB', 'name' => 'CIMB Niaga'],
                ['code' => 'PERMATA', 'name' => 'Bank Permata'],
                ['code' => 'DANAMON', 'name' => 'Bank Danamon'],
                ['code' => 'BTN', 'name' => 'Bank Tabungan Negara (BTN)'],
                ['code' => 'OCBC', 'name' => 'OCBC NISP'],
                ['code' => 'PANIN', 'name' => 'Bank Panin'],
                ['code' => 'MAYBANK', 'name' => 'Maybank Indonesia'],
                ['code' => 'MEGA', 'name' => 'Bank Mega'],
                ['code' => 'SINARMAS', 'name' => 'Bank Sinarmas'],
                ['code' => 'BJB', 'name' => 'Bank BJB'],
                ['code' => 'SEABANK', 'name' => 'SeaBank'],
                ['code' => 'JAGO', 'name' => 'Bank Jago'],
                ['code' => 'BLU', 'name' => 'blu by BCA Digital'],
            ],
        ];
    }

    protected static function greeting(Carbon $now): string
    {
        $hour = $now->hour;

        return match (true) {
            $hour < 11 => 'Selamat Pagi',
            $hour < 15 => 'Selamat Siang',
            $hour < 18 => 'Selamat Sore',
            default => 'Selamat Malam',
        };
    }
}

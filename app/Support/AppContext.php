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

<?php

namespace App\Support;

/**
 * NOTE: dayLabel() & methodLabel() ini kemungkinan besar duplikat logic yang
 * udah ada di CounselorListResource kamu (karena itu udah nghasilin
 * next_schedule.day_label & method_label). Kalau iya, mending pindahin
 * logicnya ke sini juga biar satu sumber kebenaran (DRY), nggak dobel.
 *
 * Asumsi: kolom `day` di tabel schedules itu integer 0-6 (0 = Minggu,
 * ikutin konvensi Carbon::dayOfWeek). Asumsi method value: 'online' / 'offline'.
 * Sesuaikan array di bawah kalau beda.
 */
class Formatter
{
    protected static array $days = [
        0 => 'Minggu',
        1 => 'Senin',
        2 => 'Selasa',
        3 => 'Rabu',
        4 => 'Kamis',
        5 => 'Jumat',
        6 => 'Sabtu',
    ];

    protected static array $methods = [
        'online' => 'Online',
        'offline' => 'Tatap Muka',
        'both' => 'Online & Offline'
    ];

    public static function dayLabel(int|string|null $day): ?string
    {
        if ($day === null) {
            return null;
        }

        return static::$days[(int) $day] ?? (string) $day;
    }

    public static function methodLabel(?string $method): ?string
    {
        if ($method === null) {
            return null;
        }

        return static::$methods[$method] ?? ucfirst($method);
    }

    public static function rupiah(?int $amount): string
    {
        return 'Rp' . number_format($amount ?? 0, 0, ',', '.');
    }

    // Asumsi: nomor disimpan lokal (mis. "0812...") atau sudah 62-prefixed.
    public static function whatsappLink(?string $number): ?string
    {
        if (! $number) {
            return null;
        }

        $normalized = preg_replace('/[^0-9]/', '', $number);

        if (str_starts_with($normalized, '0')) {
            $normalized = '62' . substr($normalized, 1);
        } elseif (! str_starts_with($normalized, '62')) {
            $normalized = '62' . $normalized;
        }

        return "https://wa.me/{$normalized}";
    }
}

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

    {{-- Basic SEO --}}
    <title>{{ config('app.name', 'Tenang.Id') }}</title>

    <meta name="application-name" content="Tenang.Id">
    <meta name="author" content="Tenang.Id">
    <meta name="generator" content="Laravel">
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">

    <meta name="description"
        content="Tenang.Id adalah platform marketplace konsultasi profesional yang menghubungkan Anda dengan konselor dan ahli terpercaya.">

    <meta name="keywords"
        content="konseling,konselor,konsultasi,psikologi,mentor,ahli,marketplace konsultasi,Tenang.Id">

    {{-- Theme --}}
    <meta name="theme-color" content="#ffffff">
    <meta name="color-scheme" content="light dark">

    {{-- Open Graph (Default, nanti bisa dioverride oleh Inertia Head) --}}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Tenang.Id">
    <meta property="og:title" content="Tenang.Id">
    <meta property="og:description"
        content="Temukan solusi, rasakan tenang bersama konselor dan profesional terpercaya.">
    <meta property="og:image" content="{{ asset('images/android-chrome-512x512.png') }}">
    <meta property="og:locale" content="id_ID">

    {{-- Twitter --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Tenang.Id">
    <meta name="twitter:description"
        content="Temukan solusi, rasakan tenang bersama konselor dan profesional terpercaya.">
    <meta name="twitter:image" content="{{ asset('images/android-chrome-512x512.png') }}">

    {{-- Icons --}}
    <link rel="icon" type="image/x-icon" href="{{ asset('images/favicon.ico') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon-32x32.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/apple-touch-icon.png') }}">
    <link rel="icon" sizes="192x192" href="{{ asset('images/android-chrome-192x192.png') }}">
    <link rel="icon" sizes="512x512" href="{{ asset('images/android-chrome-512x512.png') }}">

    @fonts

    @viteReactRefresh
    @vite([
    'resources/css/app.css',
    'resources/js/app.tsx',
    "resources/js/pages/{$page['component']}.tsx",
    ])

    <x-inertia::head />
</head>

<body class="antialiased">
    <x-inertia::app />

    <script>
        (() => {
            const theme = localStorage.getItem('tenang-theme3');

            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>
</body>

</html>

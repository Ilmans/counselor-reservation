import { Head } from '@inertiajs/react';
import Wrapper from '@/layouts/wrapper';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen  font-sans text-zinc-900 antialiased bg-background dark:text-zinc-200">
                {/* ─────────────────────────────────────────
          HEADER
      ───────────────────────────────────────── */}

                {/* ─────────────────────────────────────────
          HERO
      ───────────────────────────────────────── */}
                <div className="mx-auto max-w-5xl px-6 pt-14 pb-10">
                    <div className="mb-1">
                        <span className="text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-500">
                            Platform Konseling
                        </span>
                    </div>
                    <h1 className="mb-3 font-serif text-4xl leading-tight font-normal tracking-[-0.02em] text-zinc-900 md:text-5xl dark:text-zinc-100">
                        Temukan konselor
                        <br />
                        <span className="text-zinc-400 italic dark:text-zinc-500">
                            yang tepat untuk kamu.
                        </span>
                    </h1>
                    <p className="max-w-md text-sm leading-relaxed font-light text-zinc-500 dark:text-zinc-500">
                        Reservasi sesi konseling online maupun tatap muka dengan
                        konselor berpengalaman dan tersertifikasi.
                    </p>
                </div>

                {/* SEARCH + FILTER */}
                <div className="mx-auto mb-8 max-w-5xl px-6">
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                        {/* Search input */}
                        <div className="relative max-w-xs flex-1">
                            <svg
                                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
                                width={13}
                                height={13}
                                viewBox="0 0 13 13"
                                fill="none"
                            >
                                <circle
                                    cx="5.5"
                                    cy="5.5"
                                    r="4.5"
                                    stroke="#a1a1aa"
                                    strokeWidth="1.2"
                                />
                                <path
                                    d="M9 9l2.5 2.5"
                                    stroke="#a1a1aa"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Cari nama atau spesialisasi…"
                                className="w-full rounded-lg border border-zinc-200 bg-white py-2 pr-4 pl-8 text-[13px] text-zinc-800 transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700/60 dark:bg-transparent dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
                            />
                        </div>

                        {/* Filter pills */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* active */}
                            <button className="rounded-full border border-zinc-900 bg-zinc-900 px-3.5 py-[5px] text-[12px] font-medium text-zinc-100 dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900">
                                Semua
                            </button>
                            <button className="rounded-full border border-zinc-300 px-3.5 py-[5px] text-[12px] font-medium text-zinc-500 transition-all hover:border-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
                                Kecemasan
                            </button>
                            <button className="rounded-full border border-zinc-300 px-3.5 py-[5px] text-[12px] font-medium text-zinc-500 transition-all hover:border-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
                                Depresi
                            </button>
                            <button className="rounded-full border border-zinc-300 px-3.5 py-[5px] text-[12px] font-medium text-zinc-500 transition-all hover:border-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
                                Relationship
                            </button>
                            <button className="rounded-full border border-zinc-300 px-3.5 py-[5px] text-[12px] font-medium text-zinc-500 transition-all hover:border-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
                                Karier
                            </button>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="mx-auto mb-8 max-w-5xl px-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700/60" />
                </div>

                {/* ─────────────────────────────────────────
          KONSELOR LIST
      ───────────────────────────────────────── */}
                <main className="mx-auto max-w-5xl px-6 pb-20">
                    <div className="mb-5 flex items-center justify-between">
                        <p className="text-xs font-medium tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-600">
                            12 Konselor Tersedia
                        </p>
                        <select className="cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] text-zinc-600 transition-colors focus:border-zinc-400 focus:outline-none dark:border-zinc-700/60 dark:bg-zinc-900 dark:text-zinc-400 dark:focus:border-zinc-500">
                            <option>Urut: Rating tertinggi</option>
                            <option>Urut: Harga terendah</option>
                            <option>Urut: Tersedia hari ini</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {/* ── CARD 1 ── */}
                        <div className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-5 transition-[border-color,background] duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#111113] dark:hover:border-zinc-700/40 dark:hover:bg-zinc-800/70">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[15px] font-semibold text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400">
                                    AS
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm leading-tight font-medium text-zinc-900 dark:text-zinc-100">
                                                Arini Setyawati, M.Psi
                                            </p>
                                            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                                                Psikolog Klinis
                                            </p>
                                        </div>
                                        <button className="flex-shrink-0 rounded-lg bg-zinc-900 px-4 py-1.5 text-[12px] font-medium whitespace-nowrap text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                            Reservasi
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1">
                                        <span className="text-xs text-amber-400">
                                            ★★★★★
                                        </span>
                                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                            4.9
                                        </span>
                                        <span className="ml-1 text-xs text-zinc-400 dark:text-zinc-600">
                                            · 127 sesi
                                        </span>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Kecemasan
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Trauma
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Depresi
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade8088]" />
                                            <span className="text-xs text-zinc-500 dark:text-zinc-500">
                                                Tersedia hari ini
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                            Rp 250.000
                                            <span className="font-normal text-zinc-400 dark:text-zinc-600">
                                                /sesi
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── CARD 2 ── */}
                        <div className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-5 transition-[border-color,background] duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#111113] dark:hover:border-zinc-700/40 dark:hover:bg-zinc-800/70">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-50 text-[15px] font-semibold text-green-600 dark:bg-[#1a2e1a] dark:text-green-400">
                                    BR
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm leading-tight font-medium text-zinc-900 dark:text-zinc-100">
                                                Budi Rahardjo, M.Psi
                                            </p>
                                            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                                                Konselor Pernikahan
                                            </p>
                                        </div>
                                        <button className="flex-shrink-0 rounded-lg bg-zinc-900 px-4 py-1.5 text-[12px] font-medium whitespace-nowrap text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                            Reservasi
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1">
                                        <span className="text-xs text-amber-400">
                                            ★★★★★
                                        </span>
                                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                            4.8
                                        </span>
                                        <span className="ml-1 text-xs text-zinc-400 dark:text-zinc-600">
                                            · 89 sesi
                                        </span>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Relationship
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Pernikahan
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Keluarga
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade8088]" />
                                            <span className="text-xs text-zinc-500 dark:text-zinc-500">
                                                Tersedia hari ini
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                            Rp 300.000
                                            <span className="font-normal text-zinc-400 dark:text-zinc-600">
                                                /sesi
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── CARD 3 ── */}
                        <div className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-5 transition-[border-color,background] duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#111113] dark:hover:border-zinc-700/40 dark:hover:bg-zinc-800/70">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-[15px] font-semibold text-red-500 dark:bg-[#2e1a1a] dark:text-red-400">
                                    DP
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm leading-tight font-medium text-zinc-900 dark:text-zinc-100">
                                                Dewi Puspita, M.Sc
                                            </p>
                                            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                                                Psikolog Pendidikan
                                            </p>
                                        </div>
                                        <button className="flex-shrink-0 rounded-lg bg-zinc-900 px-4 py-1.5 text-[12px] font-medium whitespace-nowrap text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                            Reservasi
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1">
                                        <span className="text-xs text-amber-400">
                                            ★★★★
                                        </span>
                                        <span className="text-xs text-zinc-300 dark:text-zinc-700">
                                            ★
                                        </span>
                                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                            4.6
                                        </span>
                                        <span className="ml-1 text-xs text-zinc-400 dark:text-zinc-600">
                                            · 53 sesi
                                        </span>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Akademik
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Remaja
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Karier
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400" />
                                            <span className="text-xs text-zinc-500 dark:text-zinc-500">
                                                Besok, 09.00
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                            Rp 200.000
                                            <span className="font-normal text-zinc-400 dark:text-zinc-600">
                                                /sesi
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── CARD 4 ── */}
                        <div className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-5 transition-[border-color,background] duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#111113] dark:hover:border-zinc-700/40 dark:hover:bg-zinc-800/70">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[15px] font-semibold text-blue-500 dark:bg-[#1a2030] dark:text-blue-400">
                                    FA
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm leading-tight font-medium text-zinc-900 dark:text-zinc-100">
                                                Fajar Alamsyah, M.Psi
                                            </p>
                                            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                                                Psikolog Industri
                                            </p>
                                        </div>
                                        <button className="flex-shrink-0 rounded-lg bg-zinc-900 px-4 py-1.5 text-[12px] font-medium whitespace-nowrap text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                            Reservasi
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1">
                                        <span className="text-xs text-amber-400">
                                            ★★★★★
                                        </span>
                                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                            4.9
                                        </span>
                                        <span className="ml-1 text-xs text-zinc-400 dark:text-zinc-600">
                                            · 201 sesi
                                        </span>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Karier
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Burnout
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Stres Kerja
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade8088]" />
                                            <span className="text-xs text-zinc-500 dark:text-zinc-500">
                                                Tersedia hari ini
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                            Rp 350.000
                                            <span className="font-normal text-zinc-400 dark:text-zinc-600">
                                                /sesi
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── CARD 5 ── */}
                        <div className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-5 transition-[border-color,background] duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#111113] dark:hover:border-zinc-700/40 dark:hover:bg-zinc-800/70">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[15px] font-semibold text-purple-500 dark:bg-[#1e1a2e] dark:text-purple-400">
                                    LN
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm leading-tight font-medium text-zinc-900 dark:text-zinc-100">
                                                Layla Nuraini, M.Psi
                                            </p>
                                            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                                                Terapis Kognitif Perilaku
                                            </p>
                                        </div>
                                        <button className="flex-shrink-0 rounded-lg bg-zinc-900 px-4 py-1.5 text-[12px] font-medium whitespace-nowrap text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                            Reservasi
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1">
                                        <span className="text-xs text-amber-400">
                                            ★★★★
                                        </span>
                                        <span className="text-xs text-zinc-300 dark:text-zinc-700">
                                            ★
                                        </span>
                                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                            4.7
                                        </span>
                                        <span className="ml-1 text-xs text-zinc-400 dark:text-zinc-600">
                                            · 78 sesi
                                        </span>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            CBT
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            OCD
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Fobia
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-400" />
                                            <span className="text-xs text-zinc-500 dark:text-zinc-500">
                                                Rabu, 14.00
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                            Rp 275.000
                                            <span className="font-normal text-zinc-400 dark:text-zinc-600">
                                                /sesi
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── CARD 6 ── */}
                        <div className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-5 transition-[border-color,background] duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#111113] dark:hover:border-zinc-700/40 dark:hover:bg-zinc-800/70">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[15px] font-semibold text-emerald-600 dark:bg-[#1a2820] dark:text-emerald-400">
                                    RP
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="text-sm leading-tight font-medium text-zinc-900 dark:text-zinc-100">
                                                Rizky Prasetyo, M.Sc
                                            </p>
                                            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                                                Konselor Adiksi
                                            </p>
                                        </div>
                                        <button className="flex-shrink-0 rounded-lg bg-zinc-900 px-4 py-1.5 text-[12px] font-medium whitespace-nowrap text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                            Reservasi
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-1">
                                        <span className="text-xs text-amber-400">
                                            ★★★★★
                                        </span>
                                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                            5.0
                                        </span>
                                        <span className="ml-1 text-xs text-zinc-400 dark:text-zinc-600">
                                            · 44 sesi
                                        </span>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Adiksi
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Pemulihan
                                        </span>
                                        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
                                            Motivasi
                                        </span>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade8088]" />
                                            <span className="text-xs text-zinc-500 dark:text-zinc-500">
                                                Tersedia hari ini
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                            Rp 225.000
                                            <span className="font-normal text-zinc-400 dark:text-zinc-600">
                                                /sesi
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Load More */}
                    <div className="mt-8 flex justify-center">
                        <button className="rounded-lg border border-zinc-200 px-5 py-2.5 text-xs font-medium tracking-[0.02em] text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:text-zinc-300">
                            Tampilkan lebih banyak ↓
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
}

Welcome.layout = (Welcome :any) => <Wrapper main={Welcome} />;

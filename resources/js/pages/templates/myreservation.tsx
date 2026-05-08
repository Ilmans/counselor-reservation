// ─────────────────────────────────────────────
// HALAMAN RESERVASI SAYA
// Layout: PERLU Header (standar) / TIDAK perlu Footer
// ─────────────────────────────────────────────

// ── Shared UI Components ──────────────────────

function StatusBadge({
    status,
}: {
    status: 'upcoming' | 'completed' | 'cancelled' | 'waiting';
}) {
    const map = {
        upcoming: {
            label: 'Akan Datang',
            className:
                'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/60',
        },
        completed: {
            label: 'Selesai',
            className:
                'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/60',
        },
        cancelled: {
            label: 'Dibatalkan',
            className:
                'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/60',
        },
        waiting: {
            label: 'Menunggu',
            className:
                'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60',
        },
    };

    const { label, className } = map[status];

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${className}`}
        >
            {label}
        </span>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-zinc-400"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
            </div>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Belum ada reservasi
            </p>
            <p className="mt-1 text-[12px] text-zinc-400 dark:text-zinc-600">
                Kamu belum memiliki sesi terjadwal di kategori ini.
            </p>
            <a
                href="#"
                className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-[12px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
                Cari Konselor
            </a>
        </div>
    );
}

// ── Reservation Card ──────────────────────────

function ReservationCard({
    counselorName,
    counselorTitle,
    initials,
    avatarColor,
    date,
    time,
    duration,
    mode,
    status,
    price,
    notes,
}: {
    counselorName: string;
    counselorTitle: string;
    initials: string;
    avatarColor: string;
    date: string;
    time: string;
    duration: string;
    mode: 'Online' | 'Tatap Muka';
    status: 'upcoming' | 'completed' | 'cancelled' | 'waiting';
    price: string;
    notes?: string;
}) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-5 transition-[border-color] hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-[#111113] dark:hover:border-zinc-700/40">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-[14px] font-semibold ${avatarColor}`}
                >
                    {initials}
                </div>

                <div className="min-w-0 flex-1">
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {counselorName}
                            </p>
                            <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-500">
                                {counselorTitle}
                            </p>
                        </div>
                        <StatusBadge status={status} />
                    </div>

                    {/* Schedule details */}
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium tracking-[0.06em] text-zinc-400 uppercase dark:text-zinc-600">
                                Tanggal
                            </span>
                            <span className="text-[12px] text-zinc-700 dark:text-zinc-300">
                                {date}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium tracking-[0.06em] text-zinc-400 uppercase dark:text-zinc-600">
                                Waktu
                            </span>
                            <span className="text-[12px] text-zinc-700 dark:text-zinc-300">
                                {time}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium tracking-[0.06em] text-zinc-400 uppercase dark:text-zinc-600">
                                Durasi
                            </span>
                            <span className="text-[12px] text-zinc-700 dark:text-zinc-300">
                                {duration}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium tracking-[0.06em] text-zinc-400 uppercase dark:text-zinc-600">
                                Mode
                            </span>
                            <span className="text-[12px] text-zinc-700 dark:text-zinc-300">
                                {mode}
                            </span>
                        </div>
                    </div>

                    {/* Notes */}
                    {notes && (
                        <div className="mt-3 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-900/60">
                            <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                                <span className="font-medium">Catatan:</span>{' '}
                                {notes}
                            </p>
                        </div>
                    )}

                    {/* Bottom row */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                        <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                            {price}
                            <span className="ml-0.5 font-normal text-zinc-400 dark:text-zinc-600">
                                /sesi
                            </span>
                        </span>

                        <div className="flex gap-2">
                            {status === 'upcoming' && (
                                <>
                                    <button className="rounded-lg border border-red-200 px-3 py-1.5 text-[11px] font-medium text-red-500 transition-colors hover:bg-red-50 dark:border-red-800/60 dark:text-red-400 dark:hover:bg-red-950/30">
                                        Batalkan
                                    </button>
                                    <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-[11px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 dark:border-zinc-700/60 dark:text-zinc-400 dark:hover:border-zinc-500">
                                        Reschedule
                                    </button>
                                    <button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                        Gabung Sesi
                                    </button>
                                </>
                            )}
                            {status === 'waiting' && (
                                <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-[11px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 dark:border-zinc-700/60 dark:text-zinc-400">
                                    Lihat Detail
                                </button>
                            )}
                            {status === 'completed' && (
                                <>
                                    <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-[11px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 dark:border-zinc-700/60 dark:text-zinc-400">
                                        Beri Ulasan
                                    </button>
                                    <button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                        Pesan Lagi
                                    </button>
                                </>
                            )}
                            {status === 'cancelled' && (
                                <button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                    Pesan Ulang
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────

export default function MyReservationsPage() {
    // hardcoded active tab: 'upcoming' | 'completed' | 'cancelled'
    const activeTab = 'upcoming';

    const tabs = [
        { key: 'upcoming', label: 'Akan Datang', count: 2 },
        { key: 'completed', label: 'Selesai', count: 14 },
        { key: 'cancelled', label: 'Dibatalkan', count: 1 },
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-zinc-900 antialiased dark:text-zinc-200">
            <div className="mx-auto max-w-3xl px-6 py-10">
                {/* Page heading */}
                <div className="mb-8">
                    <h1 className="font-serif text-3xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                        Reservasi Saya
                    </h1>
                    <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-500">
                        Kelola semua sesi konseling kamu di sini.
                    </p>
                </div>

                {/* Summary stats */}
                <div className="mb-8 grid grid-cols-3 gap-3">
                    {[
                        { label: 'Total Sesi', value: '17' },
                        { label: 'Sesi Selesai', value: '14' },
                        { label: 'Konselor Dicoba', value: '4' },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800/80 dark:bg-[#111113]"
                        >
                            <p className="font-serif text-2xl font-normal text-zinc-900 dark:text-zinc-100">
                                {s.value}
                            </p>
                            <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-600">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="mb-5 flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            className={`flex items-center gap-1.5 px-3 pb-3 text-[12px] font-medium transition-colors ${
                                activeTab === tab.key
                                    ? 'border-b-2 border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100'
                                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
                            }`}
                        >
                            {tab.label}
                            <span
                                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                                    activeTab === tab.key
                                        ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                                        : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500'
                                }`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ── Upcoming Tab Content ── */}
                {activeTab === 'upcoming' && (
                    <div className="flex flex-col gap-3">
                        {/* Upcoming reminder banner */}
                        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800/60 dark:bg-blue-950/20">
                            <div className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                            <p className="text-[12px] leading-relaxed text-blue-700 dark:text-blue-400">
                                <span className="font-medium">Pengingat:</span>{' '}
                                Kamu memiliki sesi besok pukul 10:00 bersama
                                Arini Setyawati. Pastikan koneksi internet kamu
                                stabil.
                            </p>
                        </div>

                        <ReservationCard
                            initials="AS"
                            avatarColor="bg-indigo-50 text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400"
                            counselorName="Arini Setyawati, M.Psi"
                            counselorTitle="Psikolog Klinis"
                            date="Sel, 9 Jan 2024"
                            time="10:00 WIB"
                            duration="60 menit"
                            mode="Online"
                            status="upcoming"
                            price="Rp 250.000"
                            notes="Sesi lanjutan — fokus pada teknik breathing untuk manajemen kecemasan."
                        />

                        <ReservationCard
                            initials="FA"
                            avatarColor="bg-blue-50 text-blue-500 dark:bg-[#1a2030] dark:text-blue-400"
                            counselorName="Fajar Alamsyah, M.Psi"
                            counselorTitle="Psikolog Industri"
                            date="Kam, 18 Jan 2024"
                            time="14:00 WIB"
                            duration="60 menit"
                            mode="Tatap Muka"
                            status="waiting"
                            price="Rp 350.000"
                        />
                    </div>
                )}

                {/* ── Completed Tab Content ── */}
                {activeTab === 'completed' && (
                    <div className="flex flex-col gap-3">
                        <ReservationCard
                            initials="AS"
                            avatarColor="bg-indigo-50 text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400"
                            counselorName="Arini Setyawati, M.Psi"
                            counselorTitle="Psikolog Klinis"
                            date="Sel, 2 Jan 2024"
                            time="10:00 WIB"
                            duration="60 menit"
                            mode="Online"
                            status="completed"
                            price="Rp 250.000"
                        />
                        <ReservationCard
                            initials="BR"
                            avatarColor="bg-green-50 text-green-600 dark:bg-[#1a2e1a] dark:text-green-400"
                            counselorName="Budi Rahardjo, M.Psi"
                            counselorTitle="Konselor Pernikahan"
                            date="Sab, 23 Des 2023"
                            time="09:00 WIB"
                            duration="90 menit"
                            mode="Tatap Muka"
                            status="completed"
                            price="Rp 300.000"
                        />
                    </div>
                )}

                {/* ── Cancelled Tab Content ── */}
                {activeTab === 'cancelled' && (
                    <div className="flex flex-col gap-3">
                        <ReservationCard
                            initials="LN"
                            avatarColor="bg-purple-50 text-purple-500 dark:bg-[#1e1a2e] dark:text-purple-400"
                            counselorName="Layla Nuraini, M.Psi"
                            counselorTitle="Terapis Kognitif Perilaku"
                            date="Rab, 27 Des 2023"
                            time="14:00 WIB"
                            duration="60 menit"
                            mode="Online"
                            status="cancelled"
                            price="Rp 275.000"
                            notes="Dibatalkan oleh klien — 24 jam sebelum sesi."
                        />
                    </div>
                )}

                {/* Empty state example (gunakan jika tab kosong) */}
                {/* <EmptyState /> */}
            </div>
        </div>
    );
}

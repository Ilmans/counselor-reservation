// ─────────────────────────────────────────────
// DASHBOARD KONSELOR
// Layout: TIDAK perlu Header publik — punya sidebar/nav sendiri
// ─────────────────────────────────────────────

// ── Shared UI Components ──────────────────────

function StatCard({
    label,
    value,
    sub,
    trend,
}: {
    label: string;
    value: string;
    sub?: string;
    trend?: { dir: 'up' | 'down'; text: string };
}) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
            <p className="mb-2 text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-600">
                {label}
            </p>
            <p className="font-serif text-3xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                {value}
            </p>
            {sub && (
                <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-600">
                    {sub}
                </p>
            )}
            {trend && (
                <p
                    className={`mt-2 text-[11px] font-medium ${
                        trend.dir === 'up'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-500 dark:text-red-400'
                    }`}
                >
                    {trend.dir === 'up' ? '↑' : '↓'} {trend.text}
                </p>
            )}
        </div>
    );
}

function StatusDot({
    status,
}: {
    status: 'upcoming' | 'completed' | 'cancelled';
}) {
    const map = {
        upcoming: 'bg-blue-400',
        completed: 'bg-green-400',
        cancelled: 'bg-red-400',
    };
    return (
        <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${map[status]}`}
        />
    );
}

function NavItem({
    icon,
    label,
    active,
    badge,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    badge?: number;
}) {
    return (
        <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                active
                    ? 'bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200'
            }`}
        >
            <span className="flex-shrink-0">{icon}</span>
            <span className="flex-1 font-medium">{label}</span>
            {badge !== undefined && badge > 0 && (
                <span className="rounded-full bg-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-200 dark:bg-zinc-700 dark:text-zinc-300">
                    {badge}
                </span>
            )}
        </button>
    );
}

// ── Icon helpers (inline SVG) ─────────────────

const IconHome = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
    >
        <path d="M3 12L12 3l9 9" />
        <path d="M9 21V12h6v9" />
        <path d="M3 12v9h18v-9" />
    </svg>
);
const IconCalendar = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
    >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
);
const IconUsers = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
    >
        <circle cx="8" cy="8" r="4" />
        <path d="M2 20c0-4 2.7-7 6-7" />
        <circle cx="16" cy="8" r="4" />
        <path d="M22 20c0-4-2.7-7-6-7" />
    </svg>
);
const IconMessage = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
    >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
const IconSettings = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
    >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

// ── Upcoming Session Row ──────────────────────

function SessionRow({
    clientName,
    clientInitials,
    time,
    date,
    mode,
    status,
}: {
    clientName: string;
    clientInitials: string;
    time: string;
    date: string;
    mode: string;
    status: 'upcoming' | 'completed' | 'cancelled';
}) {
    return (
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {clientInitials}
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                    {clientName}
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
                    {date} · {time}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                    {mode}
                </span>
                <StatusDot status={status} />
            </div>
        </div>
    );
}

// ── Main Dashboard ────────────────────────────

export default function CounselorDashboard() {
    return (
        <div className="flex min-h-screen bg-background font-sans text-zinc-900 antialiased dark:text-zinc-200">
            {/* ── Sidebar ── */}
            <aside className="hidden w-56 flex-shrink-0 flex-col border-r border-zinc-200 bg-white px-3 py-6 lg:flex dark:border-zinc-800 dark:bg-[#0e0e10]">
                {/* Logo */}
                <div className="mb-8 flex items-center gap-2 px-3">
                    <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-zinc-100" />
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        konseling.id
                    </span>
                </div>

                {/* Profile snippet */}
                <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-[11px] font-semibold text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400">
                        AS
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-[12px] font-medium text-zinc-900 dark:text-zinc-100">
                            Arini Setyawati
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-600">
                                Online
                            </span>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-1">
                    <NavItem icon={<IconHome />} label="Ringkasan" active />
                    <NavItem icon={<IconCalendar />} label="Jadwal" badge={3} />
                    <NavItem icon={<IconUsers />} label="Klien" />
                    <NavItem icon={<IconMessage />} label="Pesan" badge={5} />
                </nav>

                <div className="my-4 h-px bg-zinc-200 dark:bg-zinc-800" />

                <nav className="flex flex-col gap-1">
                    <NavItem icon={<IconSettings />} label="Pengaturan" />
                </nav>

                <div className="mt-auto">
                    <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span className="font-medium">Keluar</span>
                    </button>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="flex flex-1 flex-col overflow-x-hidden">
                {/* Top bar */}
                <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-[#0e0e10]">
                    <div>
                        <h1 className="font-serif text-xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                            Selamat pagi, Arini 👋
                        </h1>
                        <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-500">
                            Selasa, 9 Januari 2024
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Notification bell */}
                        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-transparent dark:text-zinc-400">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                        </button>

                        {/* Toggle availability */}
                        <button className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-[12px] font-medium text-green-700 transition-colors hover:bg-green-100 dark:border-green-800/60 dark:bg-green-950/30 dark:text-green-400 dark:hover:bg-green-950/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Tersedia
                        </button>
                    </div>
                </header>

                {/* Body */}
                <main className="flex-1 overflow-y-auto p-6">
                    {/* ── Stats ── */}
                    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <StatCard
                            label="Sesi Bulan Ini"
                            value="24"
                            sub="dari target 30"
                            trend={{ dir: 'up', text: '+3 dari bulan lalu' }}
                        />
                        <StatCard
                            label="Klien Aktif"
                            value="18"
                            sub="total klien: 47"
                        />
                        <StatCard
                            label="Rating"
                            value="4.9"
                            sub="dari 127 ulasan"
                            trend={{ dir: 'up', text: '+0.1 bulan ini' }}
                        />
                        <StatCard
                            label="Pendapatan"
                            value="6jt"
                            sub="bulan Januari"
                            trend={{ dir: 'up', text: '+12% dari Des' }}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {/* ── Left column ── */}
                        <div className="flex flex-col gap-4 lg:col-span-2">
                            {/* Upcoming sessions */}
                            <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800/80 dark:bg-[#111113]">
                                <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
                                    <p className="text-[11px] font-medium tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-600">
                                        Sesi Hari Ini
                                    </p>
                                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                                        3 sesi
                                    </span>
                                </div>
                                <div className="p-2">
                                    <SessionRow
                                        clientInitials="MR"
                                        clientName="Muhammad Rizki"
                                        date="Hari ini"
                                        time="09:00 WIB"
                                        mode="Online"
                                        status="completed"
                                    />
                                    <SessionRow
                                        clientInitials="SA"
                                        clientName="Sari Andini"
                                        date="Hari ini"
                                        time="11:00 WIB"
                                        mode="Online"
                                        status="upcoming"
                                    />
                                    <SessionRow
                                        clientInitials="DP"
                                        clientName="Dika Pratama"
                                        date="Hari ini"
                                        time="14:00 WIB"
                                        mode="Tatap Muka"
                                        status="upcoming"
                                    />
                                </div>
                                <div className="border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
                                    <a
                                        href="#"
                                        className="text-[12px] text-zinc-500 underline-offset-2 hover:underline dark:text-zinc-500"
                                    >
                                        Lihat semua jadwal →
                                    </a>
                                </div>
                            </div>

                            {/* Weekly schedule overview */}
                            <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800/80 dark:bg-[#111113]">
                                <div className="border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
                                    <p className="text-[11px] font-medium tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-600">
                                        Jadwal Minggu Ini
                                    </p>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-7 gap-1.5">
                                        {[
                                            {
                                                day: 'Sen',
                                                date: '8',
                                                count: 3,
                                                today: false,
                                            },
                                            {
                                                day: 'Sel',
                                                date: '9',
                                                count: 3,
                                                today: true,
                                            },
                                            {
                                                day: 'Rab',
                                                date: '10',
                                                count: 2,
                                                today: false,
                                            },
                                            {
                                                day: 'Kam',
                                                date: '11',
                                                count: 4,
                                                today: false,
                                            },
                                            {
                                                day: 'Jum',
                                                date: '12',
                                                count: 2,
                                                today: false,
                                            },
                                            {
                                                day: 'Sab',
                                                date: '13',
                                                count: 1,
                                                today: false,
                                            },
                                            {
                                                day: 'Min',
                                                date: '14',
                                                count: 0,
                                                today: false,
                                            },
                                        ].map((d) => (
                                            <div
                                                key={d.day}
                                                className={`flex flex-col items-center gap-1.5 rounded-lg p-2 ${
                                                    d.today
                                                        ? 'bg-zinc-900 dark:bg-zinc-100'
                                                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                                }`}
                                            >
                                                <span
                                                    className={`text-[10px] font-medium ${
                                                        d.today
                                                            ? 'text-zinc-400 dark:text-zinc-600'
                                                            : 'text-zinc-400 dark:text-zinc-600'
                                                    }`}
                                                >
                                                    {d.day}
                                                </span>
                                                <span
                                                    className={`text-[13px] font-medium ${
                                                        d.today
                                                            ? 'text-zinc-100 dark:text-zinc-900'
                                                            : 'text-zinc-700 dark:text-zinc-300'
                                                    }`}
                                                >
                                                    {d.date}
                                                </span>
                                                {d.count > 0 ? (
                                                    <span
                                                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                                                            d.today
                                                                ? 'bg-zinc-700 text-zinc-300 dark:bg-zinc-300 dark:text-zinc-700'
                                                                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                                                        }`}
                                                    >
                                                        {d.count}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] text-zinc-300 dark:text-zinc-700">
                                                        —
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recent reviews */}
                            <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800/80 dark:bg-[#111113]">
                                <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
                                    <p className="text-[11px] font-medium tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-600">
                                        Ulasan Terbaru
                                    </p>
                                    <span className="text-[12px] text-amber-400">
                                        ★ 4.9
                                    </span>
                                </div>
                                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {[
                                        {
                                            initials: 'MR',
                                            name: 'Muhammad Rizki',
                                            text: 'Sangat profesional dan empatik. Sesi berjalan sangat baik.',
                                            stars: 5,
                                        },
                                        {
                                            initials: 'SA',
                                            name: 'Sari Andini',
                                            text: 'Teknik CBT yang diajarkan benar-benar membantu saya sehari-hari.',
                                            stars: 5,
                                        },
                                    ].map((r) => (
                                        <div
                                            key={r.name}
                                            className="flex items-start gap-3 px-5 py-3.5"
                                        >
                                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                                {r.initials}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200">
                                                        {r.name}
                                                    </p>
                                                    <span className="text-[11px] text-amber-400">
                                                        {'★'.repeat(r.stars)}
                                                    </span>
                                                </div>
                                                <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                                                    {r.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Right column ── */}
                        <div className="flex flex-col gap-4">
                            {/* Quick actions */}
                            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800/80 dark:bg-[#111113]">
                                <p className="mb-3 text-[11px] font-medium tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-600">
                                    Aksi Cepat
                                </p>
                                <div className="flex flex-col gap-2">
                                    <button className="w-full rounded-lg bg-zinc-900 py-2.5 text-[12px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                        + Tambah Jadwal
                                    </button>
                                    <button className="w-full rounded-lg border border-zinc-200 py-2.5 text-[12px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 dark:border-zinc-700/60 dark:text-zinc-400">
                                        Edit Profil Publik
                                    </button>
                                    <button className="w-full rounded-lg border border-zinc-200 py-2.5 text-[12px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 dark:border-zinc-700/60 dark:text-zinc-400">
                                        Lihat Laporan Bulan Ini
                                    </button>
                                </div>
                            </div>

                            {/* Pending requests */}
                            <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800/80 dark:bg-[#111113]">
                                <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3.5 dark:border-zinc-800">
                                    <p className="text-[11px] font-medium tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-600">
                                        Permintaan Baru
                                    </p>
                                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-950/30 dark:text-amber-400">
                                        2 pending
                                    </span>
                                </div>
                                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {[
                                        {
                                            initials: 'NA',
                                            name: 'Nadia Aulia',
                                            date: 'Kam, 11 Jan · 10:00',
                                            mode: 'Online',
                                        },
                                        {
                                            initials: 'YP',
                                            name: 'Yoga Pratama',
                                            date: 'Jum, 12 Jan · 13:00',
                                            mode: 'Tatap Muka',
                                        },
                                    ].map((r) => (
                                        <div key={r.name} className="px-4 py-3">
                                            <div className="mb-2 flex items-center gap-2">
                                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800">
                                                    {r.initials}
                                                </div>
                                                <div>
                                                    <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200">
                                                        {r.name}
                                                    </p>
                                                    <p className="text-[10px] text-zinc-400 dark:text-zinc-600">
                                                        {r.date} · {r.mode}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <button className="flex-1 rounded-lg border border-red-200 py-1.5 text-[11px] font-medium text-red-500 transition-colors hover:bg-red-50 dark:border-red-800/60 dark:text-red-400">
                                                    Tolak
                                                </button>
                                                <button className="flex-1 rounded-lg bg-zinc-900 py-1.5 text-[11px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900">
                                                    Terima
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Profile completeness */}
                            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800/80 dark:bg-[#111113]">
                                <div className="mb-3 flex items-center justify-between">
                                    <p className="text-[11px] font-medium tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-600">
                                        Kelengkapan Profil
                                    </p>
                                    <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                                        85%
                                    </span>
                                </div>
                                <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                                    <div className="h-full w-[85%] rounded-full bg-zinc-900 dark:bg-zinc-100" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {[
                                        { label: 'Foto profil', done: false },
                                        { label: 'Sertifikasi', done: true },
                                        {
                                            label: 'Jadwal tersedia',
                                            done: true,
                                        },
                                        {
                                            label: 'Deskripsi lengkap',
                                            done: true,
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-center gap-2"
                                        >
                                            <span
                                                className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px] ${
                                                    item.done
                                                        ? 'bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400'
                                                        : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600'
                                                }`}
                                            >
                                                {item.done ? '✓' : '·'}
                                            </span>
                                            <span className="text-[12px] text-zinc-600 dark:text-zinc-400">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

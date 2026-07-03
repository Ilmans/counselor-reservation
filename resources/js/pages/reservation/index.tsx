import React, { ReactNode, useState } from 'react';
import Wrapper from '@/layouts/wrapper';

/* ════════════════════════════════════════════════════════════════════
   Catatan pemisahan komponen
   ────────────────────────────────────────────────────────────────────
   File ini masih satu file (sesuai permintaan: "untuk sementara jadikan
   fungsi di file sama aja"), tapi setiap komponen di bawah sudah ditulis
   agar mudah dipindah ke file terpisah nantinya, misalnya:

     components/reservasi/StatusBadge.tsx
     components/reservasi/EmptyState.tsx
     components/reservasi/ReservationCard.tsx
     components/invoice/InvoiceStatusBadge.tsx
     components/invoice/InvoiceCard.tsx
     components/account/AccountSidebar.tsx
     sections/ReservasiSection.tsx
     sections/InvoiceSection.tsx
     sections/PengaturanSection.tsx

   Tidak ada logic yang bergantung pada urutan komponen di file ini,
   jadi proses "split" nanti tinggal copy-paste + tambah import/export.
   ════════════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────────── */

type ReservationStatus = 'upcoming' | 'completed' | 'cancelled' | 'waiting';
type ReservationTabKey = 'upcoming' | 'completed' | 'cancelled';
type SectionKey = 'reservasi' | 'invoice' | 'pengaturan';
type InvoiceStatus = 'paid' | 'unpaid';

type Reservation = {
    id: string;
    counselorName: string;
    counselorTitle: string;
    initials: string;
    avatarColor: string;
    date: string;
    time: string;
    duration: string;
    mode: 'Online' | 'Tatap Muka';
    status: ReservationStatus;
    price: string;
    notes?: string;
};

type Invoice = {
    id: string;
    number: string;
    counselorName: string;
    date: string;
    amount: string;
    method: string;
    status: InvoiceStatus;
};

/* ──────────────────────────────────────────────────────────────────
   Component: StatusBadge (status sesi konseling)
   ────────────────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: ReservationStatus }) {
    const map: Record<ReservationStatus, { label: string; className: string }> =
        {
            upcoming: {
                label: 'Akan Datang',
                className:
                    'bg-secondary text-primary border-transparent dark:bg-secondary/60',
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

/* ──────────────────────────────────────────────────────────────────
   Component: InvoiceStatusBadge
   ────────────────────────────────────────────────────────────────── */

function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
    const map: Record<InvoiceStatus, { label: string; className: string }> = {
        paid: {
            label: 'Lunas',
            className:
                'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/60',
        },
        unpaid: {
            label: 'Menunggu Pembayaran',
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

/* ──────────────────────────────────────────────────────────────────
   Component: EmptyState (generik, dipakai di semua section akun)
   ────────────────────────────────────────────────────────────────── */

function EmptyState({
    title,
    description,
    actionLabel,
    onAction,
}: {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-muted-foreground"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
            </div>
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="mt-1 max-w-xs text-[12px] text-muted-foreground">
                {description}
            </p>
            {actionLabel && (
                <button
                    onClick={onAction}
                    className="mt-4 rounded-lg bg-primary px-4 py-2 text-[12px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}

/* ──────────────────────────────────────────────────────────────────
   Component: ReservationCard
   ────────────────────────────────────────────────────────────────── */

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
}: Omit<Reservation, 'id'>) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
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
                            <p className="text-sm font-medium text-foreground">
                                {counselorName}
                            </p>
                            <p className="mt-0.5 text-[12px] text-muted-foreground">
                                {counselorTitle}
                            </p>
                        </div>
                        <StatusBadge status={status} />
                    </div>

                    {/* Schedule details */}
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium tracking-[0.06em] text-muted-foreground uppercase">
                                Tanggal
                            </span>
                            <span className="text-[12px] text-foreground/90">
                                {date}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium tracking-[0.06em] text-muted-foreground uppercase">
                                Waktu
                            </span>
                            <span className="text-[12px] text-foreground/90">
                                {time}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium tracking-[0.06em] text-muted-foreground uppercase">
                                Durasi
                            </span>
                            <span className="text-[12px] text-foreground/90">
                                {duration}
                            </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium tracking-[0.06em] text-muted-foreground uppercase">
                                Mode
                            </span>
                            <span className="text-[12px] text-foreground/90">
                                {mode}
                            </span>
                        </div>
                    </div>

                    {/* Notes */}
                    {notes && (
                        <div className="mt-3 rounded-lg bg-muted px-3 py-2">
                            <p className="text-[11px] leading-relaxed text-muted-foreground">
                                <span className="font-medium text-foreground/80">
                                    Catatan:
                                </span>{' '}
                                {notes}
                            </p>
                        </div>
                    )}

                    {/* Bottom row */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                        <span className="text-[12px] font-medium text-foreground/90">
                            {price}
                            <span className="ml-0.5 font-normal text-muted-foreground">
                                /sesi
                            </span>
                        </span>

                        <div className="flex flex-wrap gap-2">
                            {status === 'upcoming' && (
                                <>
                                    <button className="rounded-lg border border-red-200 px-3 py-1.5 text-[11px] font-medium text-red-500 transition-colors hover:bg-red-50 dark:border-red-800/60 dark:text-red-400 dark:hover:bg-red-950/30">
                                        Batalkan
                                    </button>
                                    <button className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
                                        Reschedule
                                    </button>
                                    <button className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                                        Gabung Sesi
                                    </button>
                                </>
                            )}
                            {status === 'waiting' && (
                                <button className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
                                    Lihat Detail
                                </button>
                            )}
                            {status === 'completed' && (
                                <>
                                    <button className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
                                        Beri Ulasan
                                    </button>
                                    <button className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                                        Pesan Lagi
                                    </button>
                                </>
                            )}
                            {status === 'cancelled' && (
                                <button className="rounded-lg bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground transition-colors hover:bg-primary/90">
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

/* ──────────────────────────────────────────────────────────────────
   Component: InvoiceCard
   ────────────────────────────────────────────────────────────────── */

function InvoiceCard({
    number,
    counselorName,
    date,
    amount,
    method,
    status,
}: Omit<Invoice, 'id'>) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                        {number}
                    </p>
                    <InvoiceStatusBadge status={status} />
                </div>
                <p className="mt-1 text-[12px] text-muted-foreground">
                    Sesi bersama {counselorName} &middot; {date}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Metode pembayaran: {method}
                </p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                <span className="font-serif text-lg font-normal text-foreground">
                    {amount}
                </span>
                <button className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
                    Unduh PDF
                </button>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────────────────────────
   Component: AccountSidebar
   ────────────────────────────────────────────────────────────────── */

function AccountSidebar({
    active,
    onChange,
}: {
    active: SectionKey;
    onChange: (key: SectionKey) => void;
}) {
    const items: { key: SectionKey; label: string; icon: ReactNode }[] = [
        {
            key: 'reservasi',
            label: 'Reservasi Saya',
            icon: (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
            ),
        },
        {
            key: 'invoice',
            label: 'Invoice',
            icon: (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M6 2h9l5 5v15H6z" />
                    <path d="M15 2v5h5M9 13h6M9 17h6" />
                </svg>
            ),
        },
        {
            key: 'pengaturan',
            label: 'Pengaturan',
            icon: (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.96 19a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15z" />
                </svg>
            ),
        },
    ];

    return (
        <aside className="w-full shrink-0 md:w-52">
            <nav className="flex gap-2 overflow-x-auto pb-1 md:sticky md:top-24 md:flex-col md:gap-0.5 md:overflow-visible md:pb-0">
                {items.map((item) => {
                    const isActive = active === item.key;
                    return (
                        <button
                            key={item.key}
                            onClick={() => onChange(item.key)}
                            className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors md:w-full md:justify-start md:rounded-lg md:rounded-l-none md:border-l-2 md:px-3 md:py-2 ${
                                isActive
                                    ? 'bg-primary text-primary-foreground md:border-primary md:bg-secondary/60 md:font-semibold md:text-primary'
                                    : 'bg-muted/60 text-muted-foreground hover:bg-muted md:border-transparent md:bg-transparent md:hover:bg-muted md:hover:text-foreground'
                            }`}
                        >
                            <span className={isActive ? '' : 'opacity-70'}>
                                {item.icon}
                            </span>
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}

/* ──────────────────────────────────────────────────────────────────
   Dummy data
   ────────────────────────────────────────────────────────────────── */

const reservationsData: Record<ReservationTabKey, Reservation[]> = {
    upcoming: [
        {
            id: 'res-1',
            initials: 'AS',
            avatarColor: 'bg-secondary text-primary',
            counselorName: 'Arini Setyawati, M.Psi',
            counselorTitle: 'Psikolog Klinis',
            date: 'Sel, 9 Jan 2024',
            time: '10:00 WIB',
            duration: '60 menit',
            mode: 'Online',
            status: 'upcoming',
            price: 'Rp 250.000',
            notes: 'Sesi lanjutan — fokus pada teknik breathing untuk manajemen kecemasan.',
        },
        {
            id: 'res-2',
            initials: 'FA',
            avatarColor:
                'bg-blue-50 text-blue-500 dark:bg-[#1a2030] dark:text-blue-400',
            counselorName: 'Fajar Alamsyah, M.Psi',
            counselorTitle: 'Psikolog Industri',
            date: 'Kam, 18 Jan 2024',
            time: '14:00 WIB',
            duration: '60 menit',
            mode: 'Tatap Muka',
            status: 'waiting',
            price: 'Rp 350.000',
        },
    ],
    completed: [
        {
            id: 'res-3',
            initials: 'AS',
            avatarColor: 'bg-secondary text-primary',
            counselorName: 'Arini Setyawati, M.Psi',
            counselorTitle: 'Psikolog Klinis',
            date: 'Sel, 2 Jan 2024',
            time: '10:00 WIB',
            duration: '60 menit',
            mode: 'Online',
            status: 'completed',
            price: 'Rp 250.000',
        },
        {
            id: 'res-4',
            initials: 'BR',
            avatarColor:
                'bg-green-50 text-green-600 dark:bg-[#1a2e1a] dark:text-green-400',
            counselorName: 'Budi Rahardjo, M.Psi',
            counselorTitle: 'Konselor Pernikahan',
            date: 'Sab, 23 Des 2023',
            time: '09:00 WIB',
            duration: '90 menit',
            mode: 'Tatap Muka',
            status: 'completed',
            price: 'Rp 300.000',
        },
    ],
    cancelled: [
        {
            id: 'res-5',
            initials: 'LN',
            avatarColor:
                'bg-purple-50 text-purple-500 dark:bg-[#1e1a2e] dark:text-purple-400',
            counselorName: 'Layla Nuraini, M.Psi',
            counselorTitle: 'Terapis Kognitif Perilaku',
            date: 'Rab, 27 Des 2023',
            time: '14:00 WIB',
            duration: '60 menit',
            mode: 'Online',
            status: 'cancelled',
            price: 'Rp 275.000',
            notes: 'Dibatalkan oleh klien — 24 jam sebelum sesi.',
        },
    ],
};

const invoicesData: Invoice[] = [
    {
        id: 'inv-1',
        number: 'INV/2024/01/0091',
        counselorName: 'Arini Setyawati, M.Psi',
        date: 'Sel, 2 Jan 2024',
        amount: 'Rp 250.000',
        method: 'Kartu Kredit',
        status: 'paid',
    },
    {
        id: 'inv-2',
        number: 'INV/2023/12/0074',
        counselorName: 'Budi Rahardjo, M.Psi',
        date: 'Sab, 23 Des 2023',
        amount: 'Rp 300.000',
        method: 'Transfer Bank',
        status: 'paid',
    },
    {
        id: 'inv-3',
        number: 'INV/2024/01/0102',
        counselorName: 'Fajar Alamsyah, M.Psi',
        date: 'Kam, 18 Jan 2024',
        amount: 'Rp 350.000',
        method: 'QRIS',
        status: 'unpaid',
    },
];

/* ──────────────────────────────────────────────────────────────────
   Section: ReservasiSection
   ────────────────────────────────────────────────────────────────── */

function ReservasiSection() {
    const [activeTab, setActiveTab] = useState<ReservationTabKey>('upcoming');

    const tabs: { key: ReservationTabKey; label: string; count: number }[] = [
        {
            key: 'upcoming',
            label: 'Akan Datang',
            count: reservationsData.upcoming.length,
        },
        {
            key: 'completed',
            label: 'Selesai',
            count: reservationsData.completed.length,
        },
        {
            key: 'cancelled',
            label: 'Dibatalkan',
            count: reservationsData.cancelled.length,
        },
    ];

    const list = reservationsData[activeTab];

    return (
        <div>
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-normal tracking-[-0.02em] text-foreground">
                    Reservasi Saya
                </h1>
                <p className="mt-1 text-[13px] text-muted-foreground">
                    Kelola semua sesi konseling kamu di sini.
                </p>
            </div>

            {/* Summary stats */}
            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                    { label: 'Total Sesi', value: '17' },
                    { label: 'Sesi Selesai', value: '14' },
                    { label: 'Konselor Dicoba', value: '4' },
                ].map((s) => (
                    <div
                        key={s.label}
                        className="rounded-xl border border-border bg-card px-4 py-3"
                    >
                        <p className="font-serif text-2xl font-normal text-foreground">
                            {s.value}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="mb-5 flex gap-1 overflow-x-auto border-b border-border">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex flex-shrink-0 items-center gap-1.5 px-3 pb-3 text-[12px] font-medium transition-colors ${
                            activeTab === tab.key
                                ? 'border-b-2 border-primary text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {tab.label}
                        <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                                activeTab === tab.key
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                {activeTab === 'upcoming' && list.length > 0 && (
                    <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
                        <div className="pulse-dot mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <p className="text-[12px] leading-relaxed text-foreground/80">
                            <span className="font-medium text-foreground">
                                Pengingat:
                            </span>{' '}
                            Kamu memiliki sesi besok pukul 10:00 bersama Arini
                            Setyawati. Pastikan koneksi internet kamu stabil.
                        </p>
                    </div>
                )}

                {list.length === 0 ? (
                    <EmptyState
                        title="Belum ada reservasi"
                        description="Kamu belum memiliki sesi terjadwal di kategori ini."
                        actionLabel="Cari Konselor"
                    />
                ) : (
                    list.map(({ id, ...reservation }) => (
                        <ReservationCard key={id} {...reservation} />
                    ))
                )}
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────────────────────────
   Section: InvoiceSection
   ────────────────────────────────────────────────────────────────── */

function InvoiceSection() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-normal tracking-[-0.02em] text-foreground">
                    Invoice
                </h1>
                <p className="mt-1 text-[13px] text-muted-foreground">
                    Riwayat pembayaran sesi konseling kamu.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                {invoicesData.length === 0 ? (
                    <EmptyState
                        title="Belum ada invoice"
                        description="Invoice akan muncul setelah kamu menyelesaikan reservasi pertama."
                    />
                ) : (
                    invoicesData.map(({ id, ...invoice }) => (
                        <InvoiceCard key={id} {...invoice} />
                    ))
                )}
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────────────────────────
   Section: PengaturanSection
   ────────────────────────────────────────────────────────────────── */

function PengaturanSection() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="font-serif text-3xl font-normal tracking-[-0.02em] text-foreground">
                    Pengaturan
                </h1>
                <p className="mt-1 text-[13px] text-muted-foreground">
                    Kelola informasi akun dan preferensi kamu.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {/* Informasi akun */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-foreground">
                        Informasi Akun
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">
                        Data ini digunakan konselor untuk mengenal kamu lebih
                        baik.
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="flex flex-col gap-1.5">
                            <span className="text-[11px] font-medium text-muted-foreground">
                                Nama Lengkap
                            </span>
                            <input
                                type="text"
                                defaultValue="Budi Santoso"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-[11px] font-medium text-muted-foreground">
                                Email
                            </span>
                            <input
                                type="email"
                                defaultValue="budi.santoso@email.com"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-[11px] font-medium text-muted-foreground">
                                No. Telepon
                            </span>
                            <input
                                type="text"
                                defaultValue="+62 812-3456-7890"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-[11px] font-medium text-muted-foreground">
                                Kota Domisili
                            </span>
                            <input
                                type="text"
                                defaultValue="Bogor, Jawa Barat"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:border-primary"
                            />
                        </label>
                    </div>

                    <div className="mt-5 flex justify-end">
                        <button className="rounded-lg bg-primary px-4 py-2 text-[12px] font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                            Simpan Perubahan
                        </button>
                    </div>
                </div>

                {/* Preferensi notifikasi */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-foreground">
                        Preferensi Notifikasi
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">
                        Atur pengingat yang ingin kamu terima sebelum sesi
                        berlangsung.
                    </p>

                    <div className="mt-4 flex flex-col divide-y divide-border">
                        {[
                            {
                                label: 'Pengingat sesi via email',
                                enabled: true,
                            },
                            {
                                label: 'Pengingat sesi via WhatsApp',
                                enabled: true,
                            },
                            {
                                label: 'Promo dan info konselor baru',
                                enabled: false,
                            },
                        ].map((pref) => (
                            <div
                                key={pref.label}
                                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                            >
                                <span className="text-[13px] text-foreground/90">
                                    {pref.label}
                                </span>
                                <span
                                    className={`relative h-5 w-9 flex-shrink-0 rounded-full transition-colors ${
                                        pref.enabled ? 'bg-primary' : 'bg-muted'
                                    }`}
                                >
                                    <span
                                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-card transition-transform ${
                                            pref.enabled
                                                ? 'translate-x-4'
                                                : 'translate-x-0.5'
                                        }`}
                                    />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Keamanan */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-foreground">
                        Keamanan
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">
                        Perbarui kata sandi kamu secara berkala untuk menjaga
                        keamanan akun.
                    </p>
                    <div className="mt-4">
                        <button className="rounded-lg border border-border px-4 py-2 text-[12px] font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
                            Ganti Kata Sandi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────────────────────────
   Page: Index
   ────────────────────────────────────────────────────────────────── */

function Index() {
    const [activeSection, setActiveSection] = useState<SectionKey>('reservasi');

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="flex flex-col gap-8 md:flex-row md:gap-10">
                    <AccountSidebar
                        active={activeSection}
                        onChange={setActiveSection}
                    />

                    <div className="min-w-0 flex-1">
                        {activeSection === 'reservasi' && <ReservasiSection />}
                        {activeSection === 'invoice' && <InvoiceSection />}
                        {activeSection === 'pengaturan' && (
                            <PengaturanSection />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;

Index.layout = (page: ReactNode) => <Wrapper main={page} />;

import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Check,
    X,
    Video,
    SlidersHorizontal,
} from 'lucide-react';

const STATUS_STYLES = {
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
    confirmed:
        'bg-secondary text-secondary-foreground ring-1 ring-inset ring-primary/15',
    completed: 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/25',
    cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200',
};

const STATUS_DOT = {
    pending: 'bg-amber-500',
    confirmed: 'bg-primary',
    completed: 'bg-primary',
    cancelled: 'bg-rose-500',
};

const FILTERS = ['Semua', 'Menunggu', 'Terkonfirmasi', 'Selesai', 'Dibatalkan'];

const DUMMY_DATA = [
    {
        reference: 'KSL-2607-0001',
        client: 'Dewi Anggraini',
        date: '07 Jul 2026',
        time: '09:00',
        duration: '60 menit',
        mode: 'Online',
        status: 'pending',
        status_label: 'Menunggu Konfirmasi',
        pra_note: 'Ingin membahas kecemasan menjelang ujian.',
    },
    {
        reference: 'KSL-2607-0002',
        client: 'Rizky Pratama',
        date: '07 Jul 2026',
        time: '10:30',
        duration: '45 menit',
        mode: 'Tatap Muka',
        status: 'confirmed',
        status_label: 'Terkonfirmasi',
        pra_note: null,
    },
    {
        reference: 'KSL-2606-0044',
        client: 'Ahmad Fauzan',
        date: '30 Jun 2026',
        time: '15:00',
        duration: '30 menit',
        mode: 'Online',
        status: 'completed',
        status_label: 'Selesai',
        pra_note: null,
    },
    {
        reference: 'KSL-2606-0038',
        client: 'Bagas Setiawan',
        date: '25 Jun 2026',
        time: '09:30',
        duration: '45 menit',
        mode: 'Online',
        status: 'cancelled',
        status_label: 'Dibatalkan',
        pra_note: null,
    },
];

export function ConsultationTable() {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="rounded-xl border border-border bg-card">
            {/* Toolbar: search & filter (tampilan saja, belum fungsional) */}
            <div className="border-b border-border p-4">
                <div className="flex items-center gap-2">
                    <div className="relative min-w-0 flex-1 sm:max-w-xs">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Cari nama klien atau no. referensi"
                            className="w-full rounded-lg border border-border bg-background py-2 pr-3 pl-9 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                        />
                    </div>

                    {/* Toggle filter, satu-satunya elemen interaktif di toolbar ini */}
                    <button
                        type="button"
                        onClick={() => setShowFilters((v) => !v)}
                        aria-expanded={showFilters}
                        className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[12px] font-medium text-muted-foreground hover:bg-muted sm:hidden"
                    >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        Filter
                    </button>

                    {/* Filter inline, selalu tampil di layar sm ke atas */}
                    <div className="hidden flex-wrap gap-1.5 sm:flex">
                        {FILTERS.map((label, i) => (
                            <button
                                key={label}
                                type="button"
                                className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
                                    i === 0
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter mobile, disembunyikan default */}
                {showFilters && (
                    <div className="mt-3 flex flex-wrap gap-1.5 sm:hidden">
                        {FILTERS.map((label, i) => (
                            <button
                                key={label}
                                type="button"
                                className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
                                    i === 0
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                    <thead className="sticky top-0 z-10 border-b-2 border-primary/15 bg-gradient-to-b from-muted to-muted/60 backdrop-blur-sm">
                        <tr className="text-[11px] font-semibold tracking-[0.06em] text-foreground/70 uppercase">
                            <th className="px-4 py-3">Klien</th>
                            <th className="px-4 py-3">No. Referensi</th>
                            <th className="px-4 py-3">Tanggal &amp; Waktu</th>
                            <th className="px-4 py-3">Durasi</th>
                            <th className="px-4 py-3">Mode</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DUMMY_DATA.map((row) => (
                            <tr
                                key={row.reference}
                                className="border-b border-border last:border-0 even:bg-muted/25"
                            >
                                <td className="px-4 py-3">
                                    <p className="font-medium text-foreground">
                                        {row.client}
                                    </p>
                                    {row.pra_note && (
                                        <p className="mt-0.5 max-w-[220px] truncate text-[11px] text-muted-foreground">
                                            {row.pra_note}
                                        </p>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-foreground/80">
                                    {row.reference}
                                </td>
                                <td className="px-4 py-3 text-foreground/80">
                                    {row.date} &middot; {row.time}
                                </td>
                                <td className="px-4 py-3 text-foreground/80">
                                    {row.duration}
                                </td>
                                <td className="px-4 py-3 text-foreground/80">
                                    {row.mode}
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[row.status]}`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[row.status]}`}
                                        />
                                        {row.status_label}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        {row.status === 'pending' && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-[12px] font-medium text-primary-foreground"
                                                >
                                                    <Check className="h-3.5 w-3.5" />
                                                    Terima
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-1.5 text-[12px] font-medium text-rose-600"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                    Tolak
                                                </button>
                                            </>
                                        )}

                                        {row.status === 'confirmed' &&
                                            row.mode === 'Online' && (
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-[12px] font-medium text-primary-foreground"
                                                >
                                                    <Video className="h-3.5 w-3.5" />
                                                    Gabung
                                                </button>
                                            )}

                                        <Link
                                            href={`/counselor/consultations/${row.reference}`}
                                            className="text-[12px] font-medium text-primary underline-offset-4 hover:underline"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination (tampilan saja) */}
            <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12px] text-muted-foreground">
                    Menampilkan 1–4 dari 4 konsultasi
                </p>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground disabled:pointer-events-none disabled:opacity-40"
                        disabled
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-[12px] font-medium text-primary-foreground"
                    >
                        1
                    </button>

                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground disabled:pointer-events-none disabled:opacity-40"
                        disabled
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

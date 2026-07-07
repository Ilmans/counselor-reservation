import {
    Ban,
    CalendarCheck2,
    Clock3,
    Hourglass,
    PartyPopper,
    Sparkles,
    XCircle,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type {
    ConsultationDetail,
    ConsultationStatus,
} from '@/types/consultation';

/* Satu hue teal untuk seluruh journey, dibedakan lewat bobot/lightness. */
export const JOURNEY = [
    { key: 'pending_confirmation', label: 'Diajukan', icon: Sparkles },
    { key: 'confirmed', label: 'Dikonfirmasi', icon: CalendarCheck2 },
    { key: 'in_progress', label: 'Berlangsung', icon: Clock3 },
    { key: 'completed', label: 'Selesai', icon: PartyPopper },
] as const;

export function journeyIndex(status: ConsultationStatus) {
    if (status === 'in_queue') {
        return 1;
    }

    const idx = JOURNEY.findIndex((s) => s.key === status);

    return idx === -1 ? 0 : idx;
}

export type StatusTone = 'pending' | 'active' | 'completed' | 'muted';

export const STATUS_META: Record<
    ConsultationStatus,
    { icon: ComponentType<{ size?: number }>; title: string; tone: StatusTone }
> = {
    pending_confirmation: {
        icon: Sparkles,
        title: 'Menunggu Konfirmasi Konselor',
        tone: 'pending',
    },
    confirmed: {
        icon: CalendarCheck2,
        title: 'Konselor Sudah Menyetujui Jadwalmu',
        tone: 'active',
    },
    in_queue: {
        icon: Hourglass,
        title: 'Sebentar Lagi Giliranmu',
        tone: 'active',
    },
    in_progress: {
        icon: Clock3,
        title: 'Sesimu Sedang Berlangsung',
        tone: 'active',
    },
    completed: {
        icon: PartyPopper,
        title: 'Sesi Telah Selesai',
        tone: 'completed',
    },
    cancelled: { icon: XCircle, title: 'Reservasi Dibatalkan', tone: 'muted' },
    rejected: {
        icon: Ban,
        title: 'Konselor Belum Bisa Menerima Sesi Ini',
        tone: 'muted',
    },
};

export const TONE_STYLES: Record<StatusTone, string> = {
    pending:
        'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-400',
    active: 'border-primary/30 bg-primary text-primary-foreground',
    completed: 'border-primary/30 bg-primary text-primary-foreground',
    muted: 'border-border bg-background text-muted-foreground',
};

// Aksen warna tipis di sisi kiri kartu StatusHero, biar tiap tone gampang
// dibedakan sekilas tanpa bikin kartunya jadi ramai.
export const TONE_ACCENT_BORDER: Record<StatusTone, string> = {
    pending: 'border-l-amber-400 dark:border-l-amber-600',
    active: 'border-l-primary',
    completed: 'border-l-primary',
    muted: 'border-l-border',
};

// Catatan (note) yang dipakai sebagai alasan pembatalan sudah ditampilkan di
// deskripsi StatusHero — dipisah jadi helper supaya NotesCard bisa
// menyembunyikan catatan yang sama dan tidak menampilkannya dua kali.
export function getSurfacedNoteId(r: ConsultationDetail): string | null {
    if (r.status !== 'cancelled') {
        return null;
    }

    return r.notes.find((n) => n.visibility === 'shared')?.id ?? null;
}

export function statusDescription(r: ConsultationDetail): string {
    const isOnline = r.method_label === 'Online';
    const arrival = isOnline ? 'Gabung' : 'Datang';

    switch (r.status) {
        case 'pending_confirmation':
            return 'Permintaan reservasimu sudah kami terima dan sedang ditinjau. Kami akan mengabari begitu konselor mengonfirmasi jadwal ini.';
        case 'confirmed':
            return r.queue_position
                ? `Kamu berada di antrian ke-${r.queue_position} pada ${r.schedule.date}, pukul ${r.schedule.time}. ${arrival} 10 menit lebih awal agar tidak melewati giliranmu.`
                : `Sesimu terjadwal pada ${r.schedule.date}, pukul ${r.schedule.time}. ${arrival} 10 menit lebih awal, ya.`;
        case 'in_queue':
            return `Kamu berada di antrian ke-${r.queue_position} hari ini. Konselor akan menghubungimu sesuai urutan — siapkan dirimu beberapa menit sebelum giliran tiba.`;
        case 'in_progress':
            return 'Luangkan waktumu sepenuhnya untuk dirimu sendiri. Semoga sesi ini membawa sedikit ketenangan lebih.';
        case 'completed':
            return 'Terima kasih sudah meluangkan waktu untuk dirimu. Ceritakan pengalamanmu agar kami bisa terus menghadirkan sesi terbaik.';
        case 'cancelled': {
            const reason = r.notes.find(
                (n) => n.id === getSurfacedNoteId(r),
            )?.content;

            return (
                reason ??
                'Kamu bisa membuat reservasi baru kapan pun kamu siap.'
            );
        }
        case 'rejected':
            return 'Ini bukan soal dirimu — konselor sedang tidak dapat menerima jadwal ini. Coba cari jadwal atau konselor lain.';
    }
}

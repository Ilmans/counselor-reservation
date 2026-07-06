import { Link } from '@inertiajs/react';
import {
    Calendar,
    Clock3,
    Video,
    MapPin,
    Users,
    CalendarCheck2,
    Hourglass,
    PartyPopper,
    XCircle,
    Ban,
    X,
    Sparkles,
    MessageSquareText,
    MessageCircle,
    ArrowUpRight,
    Wallet,
    Copy,
    ShieldCheck,
    Sprout,
    Star,
    Info,
} from 'lucide-react';
import type { ReactNode, ComponentType, FormEvent } from 'react';
import { useState } from 'react';
import Breadcrumb from '@/components/breadcumb';
import Wrapper from '@/layouts/wrapper';
import type {
    ConsultationDetail,
    ConsultationStatus,
} from '@/types/consultation';
import reservations from '@/routes/reservations';

/* ── Types ──────────────────────────────────────────────────── */
type ReservationStatus =
    | 'pending_confirmation'
    | 'confirmed'
    | 'in_queue'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'rejected';

type Props = { reservation: ConsultationDetail };

/* ── Journey — satu hue teal, dibedakan lewat bobot/lightness ── */
const JOURNEY = [
    { key: 'pending_confirmation', label: 'Diajukan', icon: Sparkles },
    { key: 'confirmed', label: 'Dikonfirmasi', icon: CalendarCheck2 },
    { key: 'in_progress', label: 'Berlangsung', icon: Clock3 },
    { key: 'completed', label: 'Selesai', icon: PartyPopper },
] as const;

function journeyIndex(status: ConsultationStatus) {
    if (status === 'in_queue') {
        return 1;
    }

    const idx = JOURNEY.findIndex((s) => s.key === status);

    return idx === -1 ? 0 : idx;
}

/* ── Status → judul, ikon, nada warna, dan penjelasan satu kalimat
      yang sudah merangkai info antrian/jadwal di dalamnya. ────── */

type StatusTone = 'pending' | 'active' | 'completed' | 'muted';

const STATUS_META: Record<
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

const TONE_STYLES: Record<StatusTone, string> = {
    pending:
        'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-400',
    active: 'border-primary/30 bg-primary text-primary-foreground',
    completed: 'border-primary/30 bg-primary text-primary-foreground',
    muted: 'border-border bg-background text-muted-foreground',
};

function statusDescription(r: ConsultationDetail): string {
    switch (r.status) {
        case 'pending_confirmation':
            return 'Permintaan reservasimu sudah kami terima dan sedang ditinjau. Kami akan mengabari begitu konselor mengonfirmasi jadwal ini.';
        case 'confirmed':
            return r.queue_position
                ? `Kamu berada di antrian ke-${r.queue_position} pada ${r.schedule.date}, pukul ${r.schedule.time}. Datang 10 menit lebih awal agar tidak melewati giliranmu.`
                : `Sesimu terjadwal pada ${r.schedule.date}, pukul ${r.schedule.time}. Datang 10 menit lebih awal, ya.`;
        case 'in_queue':
            return `Kamu berada di antrian ke-${r.queue_position} hari ini. Konselor akan menghubungimu sesuai urutan — siapkan dirimu beberapa menit sebelum giliran tiba.`;
        case 'in_progress':
            return 'Luangkan waktumu sepenuhnya untuk dirimu sendiri. Semoga sesi ini membawa sedikit ketenangan lebih.';
        case 'completed':
            return 'Terima kasih sudah meluangkan waktu untuk dirimu. Ceritakan pengalamanmu agar kami bisa terus menghadirkan sesi terbaik.';
        case 'cancelled':
            return (
                r.notes?.cancellation_reason ??
                'Kamu bisa membuat reservasi baru kapan pun kamu siap.'
            );
        case 'rejected':
            return 'Ini bukan soal dirimu — konselor sedang tidak dapat menerima jadwal ini. Coba cari jadwal atau konselor lain.';
    }
}

export default function Detail({ reservation: r }: Props) {
    const [cancelOpen, setCancelOpen] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);

    const isBroken = r.status_group === 'cancelled';
    const isConfirmedOrLater = !isBroken && r.status !== 'pending_confirmation';
    // Kontak konselor hanya relevan selama jadwal masih berjalan — sebelum
    // dikonfirmasi belum tentu jadi, dan setelah selesai tidak lagi perlu.
    const showContact =
        r.status === 'confirmed' ||
        r.status === 'in_queue' ||
        r.status === 'in_progress';

    const breadcumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Reservasi Saya', href: '/my-reservations' },
        { label: r.reference },
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased">
            <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6 lg:py-10">
                <Breadcrumb items={breadcumbs} />

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            navigator.clipboard?.writeText(r.reference)
                        }
                        title="Salin nomor referensi"
                        className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 font-mono text-[11px] tracking-wide text-muted-foreground transition hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        {r.reference} <Copy size={11} />
                    </button>
                    {r.is_anonymous && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                            <ShieldCheck size={11} /> Identitas dirahasiakan
                        </span>
                    )}
                </div>

                {/* Dua kolom di desktop supaya ruang kanan tidak kosong — kolom
                    kanan jadi ringkasan+aksi yang selalu terlihat (sticky),
                    di mobile otomatis turun jadi satu kolom biasa. */}
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-6">
                    <div className="min-w-0 space-y-4">
                        {r.needs_payment && r.invoice && (
                            <PaymentAlert invoice={r.invoice} />
                        )}

                        <StatusHero
                            r={r}
                            onOpenCancel={() => setCancelOpen(true)}
                            onOpenReview={() => setReviewOpen(true)}
                        />

                        <ScheduleCard r={r} />

                        <SessionInfoCard
                            r={r}
                            isConfirmedOrLater={isConfirmedOrLater}
                        />

                        <NotesCard r={r} />

                        {!isBroken && r.status !== 'completed' && (
                            <p className="text-center text-xs text-muted-foreground">
                                Ada yang perlu ditanyakan?{' '}
                                <Link
                                    href="/support"
                                    className="font-medium text-foreground underline underline-offset-2"
                                >
                                    Hubungi tim kami
                                </Link>
                            </p>
                        )}
                    </div>

                    <aside className="lg:sticky lg:top-24">
                        <SummaryCard r={r} showContact={showContact} />
                    </aside>
                </div>
            </div>

            <CancelModal
                r={r}
                open={cancelOpen}
                onClose={() => setCancelOpen(false)}
            />
            <ReviewModal
                r={r}
                open={reviewOpen}
                onClose={() => setReviewOpen(false)}
            />
        </div>
    );
}

/* ── Kartu status utama: judul, penjelasan (sudah merangkai info
      antrian/jadwal), jalur perjalanan, dan satu aksi kontekstual
      sesuai status. ──────────────────────────────────────────── */
function StatusHero({
    r,
    onOpenCancel,
    onOpenReview,
}: {
    r: ConsultationDetail;
    onOpenCancel: () => void;
    onOpenReview: () => void;
}) {
    const meta = STATUS_META[r.status];
    const Icon = meta.icon;
    const isLive = r.status === 'in_progress' || r.status === 'in_queue';
    const isBroken = r.status_group === 'cancelled';
    const activeIdx = journeyIndex(r.status);
    const progressPct = Math.round((activeIdx / (JOURNEY.length - 1)) * 100);

    return (
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-start gap-3.5">
                <span
                    className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${TONE_STYLES[meta.tone]}`}
                >
                    {isLive && (
                        <span className="pulse-dot absolute inset-0 rounded-full bg-current opacity-20" />
                    )}
                    <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                    <h1 className="font-serif text-lg leading-snug text-foreground sm:text-xl">
                        {meta.title}
                    </h1>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {statusDescription(r)}
                    </p>
                </div>
            </div>

            {!isBroken && (
                <div className="mt-5">
                    <svg
                        viewBox="0 0 400 8"
                        className="h-2 w-full text-primary/25"
                        preserveAspectRatio="none"
                        aria-hidden
                    >
                        <path
                            d="M0,4 C40,0 80,8 120,4 C160,0 200,8 240,4 C280,0 320,8 360,4 C380,2 390,4 400,4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="animate-draw-wave"
                        />
                    </svg>

                    <div className="relative mt-4 h-7">
                        <div className="absolute top-3 right-0 left-0 h-1 rounded-full bg-muted" />
                        <div
                            className="absolute top-3 left-0 h-1 rounded-full bg-primary transition-all"
                            style={{ width: `${progressPct}%` }}
                        />
                        <ol className="relative flex items-start justify-between">
                            {JOURNEY.map((step, i) => {
                                const StepIcon = step.icon;
                                const done = i < activeIdx;
                                const active = i === activeIdx;

                                return (
                                    <li
                                        key={step.key}
                                        className="flex flex-1 flex-col items-center"
                                    >
                                        <span
                                            className={`z-10 flex h-6 w-6 items-center justify-center rounded-full border ${
                                                done
                                                    ? 'border-primary bg-primary text-primary-foreground'
                                                    : active
                                                      ? 'breathing-glow border-primary bg-card text-primary'
                                                      : 'border-border bg-card text-muted-foreground'
                                            }`}
                                        >
                                            <StepIcon size={11} />
                                        </span>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    <div className="mt-1.5 flex justify-between text-[10.5px] text-muted-foreground">
                        {JOURNEY.map((step, i) => (
                            <span
                                key={step.key}
                                className={`flex-1 text-center ${i <= activeIdx ? 'font-medium text-foreground' : ''}`}
                            >
                                {step.label}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {r.status === 'pending_confirmation' && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-border px-4 py-3">
                    <p className="text-xs text-muted-foreground">
                        Pembatalan hanya dapat dilakukan sebelum konselor
                        mengonfirmasi.
                    </p>
                    <button
                        type="button"
                        onClick={onOpenCancel}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground transition hover:border-foreground/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        <X size={13} /> Batalkan
                    </button>
                </div>
            )}

            {r.status === 'completed' && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
                    <p className="text-xs text-foreground/80">
                        Bagikan pengalamanmu bersama{' '}
                        {r.counselor.name.split(',')[0]}.
                    </p>
                    <button
                        type="button"
                        onClick={onOpenReview}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        <Star size={13} /> Beri Ulasan
                    </button>
                </div>
            )}

            {(r.status === 'cancelled' || r.status === 'rejected') && (
                <div className="mt-5">
                    <Link
                        href="/counselors"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                        Cari jadwal baru <ArrowUpRight size={13} />
                    </Link>
                </div>
            )}
        </div>
    );
}

/* Alert pembayaran — sekarang dengan tombol eksplisit "Bayar Sekarang"
   (bukan cuma seluruh kartu jadi link), mengarah ke halaman invoice. */
function PaymentAlert({
    invoice,
}: {
    invoice: NonNullable<ConsultationDetail['invoice']>;
}) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Wallet size={16} />
                </span>
                <div>
                    <p className="text-sm font-semibold text-foreground">
                        Selesaikan pembayaran
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {invoice.amount}
                        {invoice.expired_at
                            ? ` · jatuh tempo ${invoice.expired_at}`
                            : ''}
                    </p>
                </div>
            </div>
            <Link
                href={`/invoice/${invoice.id}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
                Bayar Sekarang <ArrowUpRight size={13} />
            </Link>
        </div>
    );
}

/* Fakta jadwal murni — kontak dipindah ke SummaryCard di sidebar supaya
   tidak dobel dengan aksi yang sama di dua tempat. */
function ScheduleCard({ r }: { r: ConsultationDetail }) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
                <img
                    src={r.counselor.photo_url}
                    alt={r.counselor.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-secondary"
                />
                <div>
                    <p className="font-serif text-base text-foreground">
                        {r.counselor.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {r.counselor.specialization}
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-border pt-4 text-sm sm:grid-cols-3">
                <InfoItem
                    icon={Calendar}
                    label="Tanggal"
                    value={r.schedule.date}
                />
                <InfoItem
                    icon={Clock3}
                    label="Waktu"
                    value={`${r.schedule.time} · ${r.schedule.duration}`}
                />
                <InfoItem
                    icon={r.method === 'online' ? Video : MapPin}
                    label="Metode"
                    value={r.method_label}
                />
                <InfoItem icon={Users} label="Topik" value={r.categories} />
                <InfoItem
                    icon={Sprout}
                    label="Sesi ke"
                    value={r.is_first ? 'Pertama' : 'Lanjutan'}
                />
                <InfoItem icon={Wallet} label="Biaya" value={r.price} />
            </div>
        </div>
    );
}

function InfoItem({
    icon: Icon,
    label,
    value,
}: {
    icon?: ComponentType<{ size?: number }>;
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                {Icon && <Icon size={12} />}
                {label}
            </p>
            <p className="mt-0.5 font-medium text-foreground">{value}</p>
        </div>
    );
}

function CopyButton({ value, label }: { value: string; label: string }) {
    return (
        <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(value)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
            <Copy size={12} /> {label}
        </button>
    );
}

/* Informasi Sesi — selalu menampilkan DUA baris (Google Meet & Alamat)
   begitu status confirmed-atau-lebih, apa pun metodenya. Baris yang
   tidak relevan/belum diisi konselor cukup ditampilkan kosong ("—"),
   tidak disembunyikan, supaya kartu ini tidak pernah terasa hilang
   tanpa penjelasan. Sebelum dikonfirmasi, kartu ini diganti placeholder. */
function SessionInfoCard({
    r,
    isConfirmedOrLater,
}: {
    r: ConsultationDetail;
    isConfirmedOrLater: boolean;
}) {
    if (r.status === 'completed' || r.status_group === 'cancelled') {
        return null;
    }

    if (!isConfirmedOrLater) {
        return (
            <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                <Hourglass size={16} className="shrink-0" />
                Detail sesi (link pertemuan atau lokasi) akan muncul di sini
                setelah konselor mengonfirmasi jadwal.
            </div>
        );
    }

    const meetLink = r.method === 'online' ? r.meeting_link : null;
    const address = r.method === 'offline' ? r.location : null;

    return (
        <div className="rounded-2xl border border-primary/25 bg-secondary/50 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Info size={15} /> Informasi Sesi
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Sesi kamu akan dilakukan secara{' '}
                <span className="font-medium text-foreground">
                    {r.method_label}
                </span>
                , berikut detailnya:
            </p>

            <div className="mt-4 divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70 bg-card">
                {/* Google Meet — selalu ditampilkan, kosong jika belum ada */}
                <div className="p-3.5">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Video size={13} /> Google Meet
                    </p>
                    {meetLink ? (
                        <>
                            <p className="mt-1 text-sm break-all text-foreground">
                                {meetLink}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <a
                                    href={meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                                >
                                    Gabung Sesi
                                </a>
                                <CopyButton
                                    value={meetLink}
                                    label="Salin link"
                                />
                            </div>
                        </>
                    ) : (
                        <p className="mt-1 text-sm text-muted-foreground/50">
                            —
                        </p>
                    )}
                </div>

                {/* Alamat — selalu ditampilkan, kosong jika belum ada */}
                <div className="p-3.5">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <MapPin size={13} /> Alamat
                    </p>
                    {address ? (
                        <>
                            <p className="mt-1 text-sm text-foreground">
                                {address.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {address.address}, {address.city}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {address.maps_url && (
                                    <a
                                        href={address.maps_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                                    >
                                        Buka di Peta
                                    </a>
                                )}
                                {address.address && (
                                    <CopyButton
                                        value={`${address.name ?? ''} ${address.address}, ${address.city ?? ''}`.trim()}
                                        label="Salin alamat"
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="mt-1 text-sm text-muted-foreground/50">
                            —
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function NotesCard({ r }: { r: ConsultationDetail }) {
    const entries: { label: string; content: string }[] = [];

    if (r.notes?.client) {
        entries.push({
            label: 'Catatanmu saat reservasi',
            content: r.notes.client,
        });
    }

    if (r.notes?.progress) {
        entries.push({
            label: 'Catatan konselor',
            content: r.notes.progress,
        });
    }

    if (r.notes?.post_session) {
        entries.push({
            label: 'Ringkasan sesi',
            content: r.notes.post_session,
        });
    }

    if (entries.length === 0) {
        return null;
    }

    return (
        <div className="rounded-2xl border border-border bg-card p-4">
            <p className="mb-3 flex items-center gap-2 font-serif text-base text-foreground">
                <MessageSquareText size={15} /> Catatan
            </p>
            <div className="space-y-3 border-l border-border pl-3">
                {entries.map((e) => (
                    <div key={e.label} className="relative">
                        <span className="absolute top-1 -left-[17px] h-2 w-2 rounded-full bg-primary" />
                        <p className="text-xs font-medium text-muted-foreground">
                            {e.label}
                        </p>
                        <p className="mt-0.5 text-sm text-foreground">
                            {e.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Kartu ringkasan di sidebar (sticky di desktop) — mengisi ruang
      kanan yang tadinya kosong dengan hal yang justru paling dicari:
      harga, status pembayaran, dan aksi utama yang selalu terlihat
      tanpa perlu scroll ke bawah lagi. ────────────────────────── */
function SummaryCard({
    r,
    showContact,
}: {
    r: ConsultationDetail;
    showContact: boolean;
}) {
    const canJoinNow = r.method === 'online' && !!r.meeting_link && showContact;

    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
                <img
                    src={r.counselor.photo_url}
                    alt={r.counselor.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary"
                />
                <div className="min-w-0">
                    <p className="truncate font-serif text-base text-foreground">
                        {r.counselor.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                        {r.counselor.specialization}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">
                    Biaya Sesi
                </span>
                <span className="font-serif text-lg text-foreground">
                    {r.price}
                </span>
            </div>

            {(r.needs_payment ||
                canJoinNow ||
                (showContact && r.counselor.whatsapp)) && (
                <div className="mt-4 flex flex-col gap-2">
                    {r.needs_payment && r.invoice && (
                        <Link
                            href={`/invoice/${r.invoice.id}`}
                            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            <Wallet size={14} /> Bayar Sekarang
                        </Link>
                    )}

                    {canJoinNow && (
                        <a
                            href={r.meeting_link ?? '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/40 px-4 py-2.5 text-xs font-semibold text-primary transition hover:bg-secondary/50"
                        >
                            <Video size={14} /> Gabung Sesi
                        </a>
                    )}

                    {showContact && r.counselor.whatsapp && (
                        <a
                            href={`https://wa.me/${r.counselor.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
                        >
                            <MessageCircle size={14} /> Hubungi via WhatsApp
                        </a>
                    )}
                </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
                <span>No. Referensi</span>
                <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(r.reference)}
                    className="inline-flex items-center gap-1 font-mono text-foreground/80 transition hover:text-foreground"
                >
                    {r.reference} <Copy size={10} />
                </button>
            </div>
        </div>
    );
}

/* ── Modal pembatalan — UI saja untuk sekarang, belum terhubung ke
      endpoint apa pun. Sambungkan tombol "Ya, Batalkan" ke
      router.post(`/reservations/${r.id}/cancel`) saat alurnya sudah
      disetujui. ───────────────────────────────────────────────── */
function CancelModal({
    r,
    open,
    onClose,
}: {
    r: ConsultationDetail;
    open: boolean;
    onClose: () => void;
}) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
            <div className="w-full max-w-sm rounded-t-2xl bg-card p-5 sm:rounded-2xl">
                <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
                        <X size={16} />
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-foreground">
                            Batalkan reservasi ini?
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            Pembatalan hanya dapat dilakukan sebelum konselor
                            mengonfirmasi. Jadwal {r.schedule.date}, pukul{' '}
                            {r.schedule.time} bersama {r.counselor.name} akan
                            dilepas.
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        Simpan Jadwal
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        // TODO: hubungkan ke router.post(`/reservations/${r.id}/cancel`) setelah alur ini disetujui
                        className="flex-1 rounded-full bg-red-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        Ya, Batalkan
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Modal ulasan — UI saja, belum terhubung ke endpoint apa pun.
      "Kirim Ulasan" hanya menampilkan state sukses secara lokal.
      Sambungkan handleSubmit ke endpoint review saat sudah tersedia. */
function ReviewModal({
    r,
    open,
    onClose,
}: {
    r: ConsultationDetail;
    open: boolean;
    onClose: () => void;
}) {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    if (!open) {
        return null;
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // TODO: kirim ke endpoint review setelah tersedia, mis.
        // router.post(`/reservations/${r.id}/review`, { rating, comment })
        setSubmitted(true);
    }

    function handleClose() {
        onClose();
        setTimeout(() => {
            setRating(0);
            setHovered(0);
            setComment('');
            setSubmitted(false);
        }, 200);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
            <div className="w-full max-w-sm rounded-t-2xl bg-card p-5 sm:rounded-2xl">
                {submitted ? (
                    <div className="flex flex-col items-center py-6 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <PartyPopper size={20} />
                        </span>
                        <p className="mt-3 text-sm font-semibold text-foreground">
                            Terima kasih atas ulasanmu
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Masukanmu membantu klien lain menemukan konselor
                            yang tepat.
                        </p>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="mt-5 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            Selesai
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    Beri Ulasan
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    Sesi bersama {r.counselor.name}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                aria-label="Tutup"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="mt-4 flex justify-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHovered(star)}
                                    onMouseLeave={() => setHovered(0)}
                                    onClick={() => setRating(star)}
                                    className="p-0.5 text-amber-400 transition-transform hover:scale-110"
                                    aria-label={`${star} bintang`}
                                >
                                    <Star
                                        size={26}
                                        fill={
                                            (hovered || rating) >= star
                                                ? 'currentColor'
                                                : 'none'
                                        }
                                    />
                                </button>
                            ))}
                        </div>

                        <label className="mt-4 block">
                            <span className="text-xs font-medium text-muted-foreground">
                                Ceritakan pengalamanmu (opsional)
                            </span>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                                placeholder="Apa yang membuat sesi ini terasa membantu?"
                                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary"
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={rating === 0}
                            className="mt-4 w-full rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Kirim Ulasan
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

Detail.layout = (page: ReactNode) => <Wrapper main={page} />;

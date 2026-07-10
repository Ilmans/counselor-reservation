import { Link } from '@inertiajs/react';
import {
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock,
    MapPin,
    Star,
    Video,
    Wallet,
} from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

import ConsultationController from '@/actions/App/Http/Controllers/Counselor/ConsultationController';
import { EmptyState } from '@/components/empty-state';
import PageHead from '@/components/page-head';
import { Badge } from '@/components/ui/badge';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import { CONSULTATION_STATUS_CLASSES } from '@/types/badge';

import Greeting from './components/greeting';
import type { CounselorDashboardProps, QueueItem } from './type';

function formatRupiah(value: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);
}

// ── Kartu statistik kecil ───────────────────────────────────
function StatCard({
    icon: Icon,
    label,
    value,
    hint,
    tone = 'default',
}: {
    icon: ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string | number;
    hint?: ReactNode;
    tone?: 'default' | 'warning';
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-4 md:p-5">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                    {label}
                </span>
                <span
                    className="rounded-lg p-2"
                    style={{
                        color:
                            tone === 'warning'
                                ? 'var(--warning)'
                                : 'var(--primary)',
                        backgroundColor:
                            tone === 'warning'
                                ? 'color-mix(in oklch, var(--warning) 16%, transparent)'
                                : 'var(--secondary)',
                    }}
                >
                    <Icon size={16} />
                </span>
            </div>
            <div className="mt-3 font-serif text-2xl font-medium text-foreground md:text-3xl">
                {value}
            </div>
            {hint && (
                <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
            )}
        </div>
    );
}

// ── Daftar konsultasi (dipakai untuk agenda hari ini & menunggu konfirmasi) ──
function AgendaList({
    title,
    eyebrow,
    items,
    emptyText,
    showViewAll = true,
    urgent = false,
}: {
    title: string;
    eyebrow: string;
    items: QueueItem[];
    emptyText: string;
    showViewAll?: boolean;
    urgent?: boolean;
}) {
    return (
        <div
            className="rounded-xl border bg-card p-4 md:p-5"
            style={{
                borderColor:
                    urgent && items.length > 0
                        ? 'var(--warning)'
                        : 'var(--border)',
            }}
        >
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                        {eyebrow}
                    </p>
                    <h2 className="font-serif text-lg text-foreground">
                        {title}
                    </h2>
                </div>
                {showViewAll && (
                    <Link
                        href={ConsultationController.index.url()}
                        className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary"
                    >
                        <span className="hidden sm:inline">Lihat semua</span>
                        <ChevronRight size={15} />
                    </Link>
                )}
            </div>

            {items.length === 0 ? (
                <EmptyState title="Tidak ada data" description={emptyText} />
            ) : (
                <div className="space-y-2.5">
                    {items.map((q) => (
                        <Link
                            key={q.id}
                            href={ConsultationController.show.url({
                                reference: q.reference,
                            })}
                            className="flex flex-col gap-2.5 rounded-xl bg-muted px-3.5 py-3 transition-opacity hover:opacity-80 sm:flex-row sm:items-center sm:gap-3"
                        >
                            <div className="flex shrink-0 items-center justify-between gap-2 sm:w-28 sm:flex-col sm:items-start sm:justify-start">
                                <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                                    <Clock
                                        size={13}
                                        className="text-muted-foreground"
                                    />
                                    {q.time}
                                </span>
                                {q.date && (
                                    <span className="text-[11px] text-muted-foreground">
                                        {q.date}
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {q.is_anonymous ? 'Klien Anonim' : q.client}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                    {q.category}
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                {q.method === 'online' ? (
                                    <Video size={13} />
                                ) : (
                                    <MapPin size={13} />
                                )}
                                {q.method === 'online'
                                    ? 'Online'
                                    : 'Tatap muka'}
                            </div>

                            <span className="shrink-0">
                                <Badge
                                    className={
                                        CONSULTATION_STATUS_CLASSES[q.status]
                                    }
                                >
                                    {q.status_label}
                                </Badge>
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Jadwal praktik mingguan ─────────────────────────────────
function ScheduleStrip({
    schedules,
}: {
    schedules: CounselorDashboardProps['schedules'];
}) {
    const active = schedules.filter((s) => s.is_active);

    return (
        <div className="rounded-xl border border-border bg-secondary p-4 md:p-5">
            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-secondary-foreground/70 uppercase">
                <CalendarDays size={12} />
                Minggu Ini
            </p>
            <h2 className="mb-3 font-serif text-lg text-secondary-foreground">
                Jadwal Praktik
            </h2>

            {active.length === 0 ? (
                <p className="text-sm text-secondary-foreground/70">
                    Belum ada jadwal aktif.
                </p>
            ) : (
                <div className="space-y-2">
                    {active.map((s) => (
                        <div
                            key={s.id}
                            className="flex items-center gap-2.5 rounded-lg bg-card p-2.5"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                                {s.day_label.slice(0, 3)}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm leading-tight font-medium text-foreground">
                                    {s.open_time} – {s.close_time}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                    {s.method_label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Ulasan terbaru ───────────────────────────────────────────
function ReviewPanel({
    reviews,
    averageRating,
    totalReviews,
}: {
    reviews: CounselorDashboardProps['reviews'];
    averageRating: number;
    totalReviews: number;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                        Umpan Balik
                    </p>
                    <h2 className="font-serif text-lg text-foreground">
                        Ulasan Terbaru
                    </h2>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                    <Star size={11} fill="currentColor" />
                    {averageRating} · {totalReviews}
                </span>
            </div>

            {reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    Belum ada ulasan masuk.
                </p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((r, i) => (
                        <div
                            key={i}
                            className={
                                i < reviews.length - 1
                                    ? 'border-b border-border pb-4'
                                    : ''
                            }
                        >
                            <div className="mb-1.5 flex items-center justify-between gap-2">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {r.is_anonymous ? 'Klien Anonim' : r.name}
                                </p>
                                <div className="flex shrink-0 items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, s) => (
                                        <Star
                                            key={s}
                                            size={12}
                                            className={
                                                s < r.rating
                                                    ? 'fill-primary text-primary'
                                                    : 'text-muted-foreground/30'
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="mb-1.5 text-xs leading-relaxed text-muted-foreground">
                                {r.comment}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                                {r.when}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Halaman utama ─────────────────────────────────────────────
function Index({
    counselor,
    statistics,
    rating,
    earnings,
    todayQueue,
    pendingConfirmations,
    schedules,
    reviews,
}: CounselorDashboardProps) {
    const completionRate =
        statistics.scheduled_this_month > 0
            ? Math.round(
                  (statistics.completed_this_month /
                      statistics.scheduled_this_month) *
                      100,
              )
            : 0;

    return (
        <>
            <PageHead title="Beranda" />
            <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-5 md:space-y-7 md:px-7 md:py-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Greeting />
                    {statistics.pending_confirmation_sessions > 0 && (
                        <Link
                            href={ConsultationController.index.url({
                                query: { status: 'pending_confirmation' },
                            })}
                            className="flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                            style={{
                                backgroundColor: 'var(--primary)',
                                color: 'var(--primary-foreground)',
                            }}
                        >
                            Tinjau {statistics.pending_confirmation_sessions}{' '}
                            konfirmasi
                        </Link>
                    )}
                </div>

                {/* Kartu statistik */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-5">
                    <StatCard
                        icon={Clock}
                        label="Sesi Hari Ini"
                        value={statistics.today_sessions}
                        hint={`${statistics.today_online_sessions} online · ${statistics.today_offline_sessions} tatap muka`}
                    />

                    <StatCard
                        icon={CalendarDays}
                        label="Menunggu Konfirmasi"
                        value={statistics.pending_confirmation_sessions}
                        hint="Perlu tindakan Anda"
                        tone={
                            statistics.pending_confirmation_sessions > 0
                                ? 'warning'
                                : 'default'
                        }
                    />

                    <StatCard
                        icon={CheckCircle2}
                        label="Selesai Bulan Ini"
                        value={statistics.completed_this_month}
                        hint={
                            <div className="mt-1">
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary"
                                        style={{ width: `${completionRate}%` }}
                                    />
                                </div>
                                <span className="mt-1 block">
                                    {completionRate}% dari{' '}
                                    {statistics.scheduled_this_month} sesi
                                    terjadwal
                                </span>
                            </div>
                        }
                    />

                    <StatCard
                        icon={Star}
                        label="Rating Rata-rata"
                        value={
                            rating.total_reviews > 0
                                ? rating.average_rating
                                : '–'
                        }
                        hint={`dari ${rating.total_reviews} ulasan`}
                    />

                    <StatCard
                        icon={Wallet}
                        label="Pendapatan Bulan Ini"
                        value={formatRupiah(earnings.this_month)}
                        hint={
                            counselor.pricing_type === 'free' &&
                            earnings.lifetime > 0 ? (
                                <span>
                                    Mode saat ini{' '}
                                    <span className="font-medium">gratis</span>{' '}
                                    · total riwayat{' '}
                                    {formatRupiah(earnings.lifetime)}
                                </span>
                            ) : counselor.price_per_hour ? (
                                `${formatRupiah(counselor.price_per_hour)} / sesi`
                            ) : undefined
                        }
                    />
                </div>

                {/* Agenda hari ini + jadwal minggu ini */}
                <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <AgendaList
                            title="Agenda Hari Ini"
                            eyebrow="Aktivitas Hari Ini"
                            items={todayQueue}
                            emptyText="Belum ada konsultasi hari ini"
                        />
                    </div>
                    <ScheduleStrip schedules={schedules} />
                </div>

                {/* Perlu tindakan + ulasan */}
                <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
                    <AgendaList
                        title="Menunggu Konfirmasi"
                        eyebrow="Perlu Tindakan"
                        items={pendingConfirmations}
                        emptyText="Tidak ada konsultasi yang menunggu konfirmasi"
                        showViewAll={false}
                        urgent
                    />
                    <ReviewPanel
                        reviews={reviews}
                        averageRating={rating.average_rating}
                        totalReviews={rating.total_reviews}
                    />
                </div>
            </main>
        </>
    );
}

export default Index;

Index.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="dashboard" />
);

import { Head, Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { EmptyState } from '@/components/empty-state';
import { UserSidebar } from '@/layouts/user-sidebar';
import Wrapper from '@/layouts/wrapper';

import type {
    PaginatedData,
    Reservation,
    ReservationStats,
    ReservationTabKey,
} from '@/types/reservation';
import { ReservationCard } from './List/reservation-card';

interface Props {
    reservations: PaginatedData<Reservation>;
    stats: ReservationStats;
    activeStatus: ReservationTabKey;
}

const TABS: { key: ReservationTabKey; label: string }[] = [
    { key: 'all', label: 'Semua' },
    { key: 'upcoming', label: 'Akan Datang' },
    { key: 'completed', label: 'Selesai' },
    { key: 'cancelled', label: 'Dibatalkan' },
];

export default function Index({
    reservations,
    stats,
    activeStatus,
}: Props) {
    
    const tabCounts: Record<ReservationTabKey, number> = {
        all: stats.total_sessions,
        upcoming: stats.upcoming_sessions,
        completed: stats.completed_sessions,
        cancelled: stats.cancelled_sessions,
    };

    return (
        <>
            <Head title="Reservasi Saya" />
            <div className="min-h-screen bg-background font-sans text-foreground antialiased">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    <div className="flex flex-col gap-8 md:flex-row md:gap-10">
                        <UserSidebar active="reservasi" />

                        <div className="min-w-0 flex-1">
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
                                    {
                                        label: 'Total Sesi',
                                        value: stats.total_sessions,
                                    },
                                    {
                                        label: 'Sesi Selesai',
                                        value: stats.completed_sessions,
                                    },
                                    {
                                        label: 'Konselor Dicoba',
                                        value: stats.total_counselors,
                                    },
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

                            {/* Tabs — real navigation via ?status=, backend does the filtering */}
                            <div className="mb-5 flex gap-1 overflow-x-auto border-b border-border">
                                {TABS.map((tab) => (
                                    <Link
                                        key={tab.key}
                                        href={`/my-reservations?status=${tab.key}`}
                                        preserveScroll
                                        preserveState
                                        className={`flex flex-shrink-0 items-center gap-1.5 px-3 pb-3 text-[12px] font-medium transition-colors ${
                                            activeStatus === tab.key
                                                ? 'border-b-2 border-primary text-foreground'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        {tab.label}
                                        <span
                                            className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                                                activeStatus === tab.key
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            {tabCounts[tab.key]}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3">
                                {reservations.data.length === 0 ? (
                                    <EmptyState
                                        title="Belum ada reservasi"
                                        description="Kamu belum memiliki sesi di kategori ini."
                                        actionLabel="Cari Konselor"
                                        actionHref="/"
                                    />
                                ) : (
                                    reservations.data.map((r) => (
                                        <ReservationCard
                                            key={r.id}
                                            reservation={r}
                                        />
                                    ))
                                )}
                            </div>

                            {reservations.last_page > 1 && (
                                <div className="mt-6 flex flex-wrap gap-1">
                                    {reservations.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url ?? '#'}
                                            preserveScroll
                                            preserveState
                                            className={`rounded-lg px-3 py-1.5 text-[12px] ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'text-muted-foreground hover:bg-muted'
                                            } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: ReactNode) => <Wrapper main={page} />;

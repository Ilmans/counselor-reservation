import { Link } from '@inertiajs/react';
import ReservationController from '@/actions/App/Http/Controllers/ReservationController';

import type { Consultation } from '@/types/consultation';
import { StatusBadge } from './status-badge';

function initialsFrom(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();
}

export function ReservationCard({ reservation }: { reservation: Consultation }) {
    const {
        reference,
        counselor,
        date,
        time,
        duration,
        mode,
        status,
        status_label,
        pra_note,
    } = reservation;
    console.log(reservation);

    return (
        <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-[14px] font-semibold text-primary">
                    {initialsFrom(counselor?.name)}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                            <p className="text-sm font-medium text-foreground">
                                {counselor?.name}
                            </p>
                            <p className="mt-0.5 text-[12px] text-muted-foreground">
                                {counselor?.specialization.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <StatusBadge status={status} label={status_label} />
                            <Link
                                href={ReservationController.show.url(
                                    reservation.reference,
                                )}
                                className="text-[12px] font-medium text-primary underline-offset-4 hover:underline"
                            >
                                Detail
                            </Link>
                        </div>
                    </div>

                    <p className="mt-2 text-[11px] font-medium tracking-[0.03em] text-muted-foreground">
                        No. Referensi:{' '}
                        <span className="text-foreground/80">{reference}</span>
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <Detail label="Tanggal" value={date} />
                        <Detail label="Waktu" value={time} />
                        <Detail label="Durasi" value={duration} />
                        <Detail label="Mode" value={mode} />
                    </div>

                    {/* {pra_note && (
                        <div className="mt-3 rounded-lg bg-muted px-3 py-2">
                            <p className="text-[11px] leading-relaxed text-muted-foreground">
                                <span className="font-medium text-foreground/80">
                                    Catatan:
                                </span>{' '}
                                {pra_note}
                            </p>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

function Detail({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-medium tracking-[0.06em] text-muted-foreground uppercase">
                {label}
            </span>
            <span className="text-[12px] text-foreground/90">{value}</span>
        </div>
    );
}

import { Button } from '@/components/ui/button';
import type { Reservation } from '@/types/reservation';
import { StatusBadge } from './status-badge';


const ACTIVE_STATUSES: Reservation['status'][] = [
    'pending_payment',
    'pending_confirmation',
    'confirmed',
    'in_queue',
    'in_progress',
];

function initialsFrom(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();
}

export function ReservationCard({ reservation }: { reservation: Reservation }) {
    const {
        reference,
        counselor_name,
        counselor_specialization,
        date,
        time,
        duration,
        mode,
        price,
        status,
        status_label,
        notes,
    } = reservation;

    const isActive = ACTIVE_STATUSES.includes(status);

    return (
        <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-[14px] font-semibold text-primary">
                    {initialsFrom(counselor_name)}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                            <p className="text-sm font-medium text-foreground">
                                {counselor_name}
                            </p>
                            <p className="mt-0.5 text-[12px] text-muted-foreground">
                                {counselor_specialization}
                            </p>
                        </div>
                        <StatusBadge status={status} label={status_label} />
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

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                        <span className="text-[12px] font-medium text-foreground/90">
                            {price}
                            {price !== 'Gratis' && (
                                <span className="ml-0.5 font-normal text-muted-foreground">
                                    /sesi
                                </span>
                            )}
                        </span>

                        <div className="flex flex-wrap gap-2">
                            {isActive && (
                                <>
                                    <Button
                                        variant="red"
                                        mode="outlined"
                                        size="sm"
                                    >
                                        Batalkan
                                    </Button>
                                    <Button
                                        variant="default"
                                        mode="outlined"
                                        size="sm"
                                    >
                                        Reschedule
                                    </Button>
                                    <Button
                                        variant="default"
                                        mode="filled"
                                        size="sm"
                                    >
                                        Gabung Sesi
                                    </Button>
                                </>
                            )}
                            {status === 'completed' && (
                                <>
                                    <Button
                                        variant="default"
                                        mode="outlined"
                                        size="sm"
                                    >
                                        Beri Ulasan
                                    </Button>
                                    <Button
                                        variant="default"
                                        mode="filled"
                                        size="sm"
                                    >
                                        Pesan Lagi
                                    </Button>
                                </>
                            )}
                            {(status === 'cancelled' ||
                                status === 'rejected') && (
                                <Button
                                    variant="default"
                                    mode="filled"
                                    size="sm"
                                >
                                    Pesan Ulang
                                </Button>
                            )}
                        </div>
                    </div>
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

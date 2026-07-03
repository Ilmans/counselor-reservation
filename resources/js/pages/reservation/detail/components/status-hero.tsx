import type { ReservationDetail } from '@/types/reservation-detail';

const STATUS_STYLE: Record<
    string,
    { badge: string; ring: string; icon: string }> = {
    pending_confirmation: {
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
        ring: 'ring-amber-200 dark:ring-amber-500/20',
        icon: '⏳',
    },
    confirmed: {
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
        ring: 'ring-blue-200 dark:ring-blue-500/20',
        icon: '✅',
    },
    in_queue: {
        badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
        ring: 'ring-indigo-200 dark:ring-indigo-500/20',
        icon: '🧾',
    },
    in_progress: {
        badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
        ring: 'ring-emerald-200 dark:ring-emerald-500/20',
        icon: '🟢',
    },
    completed: {
        badge: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700/40 dark:text-zinc-300',
        ring: 'ring-zinc-300 dark:ring-zinc-600',
        icon: '🏁',
    },
    cancelled: {
        badge: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
        ring: 'ring-rose-200 dark:ring-rose-500/20',
        icon: '✕',
    },
    rejected: {
        badge: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
        ring: 'ring-rose-200 dark:ring-rose-500/20',
        icon: '✕',
    },
};

export default function StatusHero({
    reservation,
}: {
    reservation: ReservationDetail;
}) {
    const style = STATUS_STYLE[reservation.status] ?? STATUS_STYLE.pending_confirmation;

    return (
        <div
            className={`rounded-2xl border border-zinc-200 bg-white p-5 ring-1 dark:border-zinc-800 dark:bg-zinc-900/50 ${style.ring}`}
        >
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        Kode Reservasi
                    </p>
                    <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {reservation.reference}
                    </p>
                </div>
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
                >
                    <span>{style.icon}</span>
                    {reservation.status_label}
                </span>
            </div>

            {reservation.status === 'in_queue' && reservation.queue_position && (
                <p className="mt-3 rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                    Anda berada di antrian nomor{' '}
                    <span className="font-semibold">
                        #{reservation.queue_position}
                    </span>
                    . Mohon tunggu giliran Anda.
                </p>
            )}

            {reservation.status === 'pending_confirmation' && (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                    Reservasi Anda sedang menunggu konfirmasi dari konselor.
                </p>
            )}
        </div>
    );
}

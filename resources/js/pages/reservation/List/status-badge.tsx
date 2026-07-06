import type { ReservationStatus } from '@/types/consultation';

const STATUS_STYLES: Record<ReservationStatus, string> = {
    pending_payment:
        'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60',
    pending_confirmation:
        'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60',
    confirmed:
        'bg-secondary text-primary border-transparent dark:bg-secondary/60',
    in_queue:
        'bg-secondary text-primary border-transparent dark:bg-secondary/60',
    in_progress:
        'bg-secondary text-primary border-transparent dark:bg-secondary/60',
    completed:
        'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/60',
    cancelled:
        'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/60',
    rejected:
        'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/60',
};

export function StatusBadge({
    status,
    label,
}: {
    status: ReservationStatus;
    label: string;
}) {
    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[status]}`}
        >
            {label}
        </span>
    );
}

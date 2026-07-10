import type { InvoiceStatus } from '@/types/invoice';

const CONFIG: Record<
    InvoiceStatus,
    { label: string; className: string; dot: string }
> = {
    pending: {
        label: 'Menunggu Pembayaran',
        className:
            'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
        dot: 'bg-amber-500',
    },
    paid: {
        label: 'Pembayaran Berhasil',
        className:
            'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400',
        dot: 'bg-green-500',
    },
    expired: {
        label: 'Invoice Kedaluwarsa',
        className:
            'bg-zinc-100 text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400',
        dot: 'bg-zinc-400',
    },
    failed: {
        label: 'Pembayaran Gagal',
        className:
            'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400',
        dot: 'bg-red-500',
    },
    cancelled: {
        label: 'Dibatalkan',
        className:
            'bg-zinc-100 text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400',
        dot: 'bg-zinc-400',
    },
    refunded: {
        label: 'Dana Dikembalikan',
        className:
            'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
        dot: 'bg-blue-500',
    },
};

export default function StatusBanner({ status }: { status: InvoiceStatus }) {
    const config = CONFIG[status];

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${config.className}`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
            {config.label}
        </span>
    );
}

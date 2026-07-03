import type { InvoiceStatus } from '@/types/invoice';

const CONFIG: Record<InvoiceStatus, { label: string; className: string }> = {
    pending: {
        label: 'Menunggu Pembayaran',
        className:
            'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60',
    },
    paid: {
        label: 'Pembayaran Berhasil',
        className:
            'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/60',
    },
    expired: {
        label: 'Invoice Kedaluwarsa',
        className:
            'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700',
    },
    failed: {
        label: 'Pembayaran Gagal',
        className:
            'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800/60',
    },
    cancelled: {
        label: 'Dibatalkan',
        className:
            'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700',
    },
    refunded: {
        label: 'Dana Dikembalikan',
        className:
            'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800/60',
    },
};

export default function StatusBanner({ status }: { status: InvoiceStatus }) {
    const config = CONFIG[status];

    return (
        <div
            className={`rounded-xl border px-4 py-3 text-sm font-medium ${config.className}`}
        >
            {config.label}
        </div>
    );
}

import { Link } from '@inertiajs/react';

export default function InvoicePendingCard({
    invoiceId,
    amountFormatted,
}: {
    invoiceId: number;
    amountFormatted: string;
}) {
    return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/20 dark:bg-amber-500/5">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    Menunggu Pembayaran
                </p>
                <span className="text-sm font-bold text-amber-800 dark:text-amber-300">
                    {amountFormatted}
                </span>
            </div>
            <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                Selesaikan pembayaran agar reservasi Anda dapat diproses
                konselor.
            </p>
            <Link
                href={`/invoice/${invoiceId}`}
                className="mt-4 block w-full rounded-lg bg-amber-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-amber-700"
            >
                Bayar Sekarang
            </Link>
        </div>
    );
}

import { Link } from '@inertiajs/react';
import { ArrowUpRight, Wallet } from 'lucide-react';
import type { Invoice } from '@/types/invoice';

function PaymentAlert({ invoice }: { invoice: Invoice }) {
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

export default PaymentAlert;

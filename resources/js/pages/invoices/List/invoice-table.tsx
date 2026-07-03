import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export interface Invoice {
    id: number;
    reference: string;
    date: string;
    amount: string;
    status: 'paid' | 'unpaid';
}

const STATUS_STYLES: Record<Invoice['status'], string> = {
    paid: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800/60',
    unpaid: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60',
};

const STATUS_LABEL: Record<Invoice['status'], string> = {
    paid: 'Lunas',
    unpaid: 'Menunggu Pembayaran',
};

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                    <tr className="border-b border-border bg-muted/40 text-[12px] text-muted-foreground">
                        <th className="px-4 py-3 font-medium">Referensi</th>
                        <th className="px-4 py-3 font-medium">Tanggal</th>
                        <th className="px-4 py-3 font-medium">Jumlah</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((inv) => (
                        <tr
                            key={inv.id}
                            className="border-b border-border last:border-0 hover:bg-muted/30"
                        >
                            <td className="px-4 py-3 font-medium">
                                <Link
                                    href={`/invoice/${inv.reference}`}
                                    className="text-primary underline-offset-2 hover:underline"
                                >
                                    {inv.reference}
                                </Link>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                                {inv.date}
                            </td>
                            <td className="px-4 py-3 font-serif text-foreground">
                                {inv.amount}
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[inv.status]}`}
                                >
                                    {STATUS_LABEL[inv.status]}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

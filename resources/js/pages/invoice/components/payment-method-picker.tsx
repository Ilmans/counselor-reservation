import { useState } from 'react';
import axios from 'axios';
import type { InvoiceData, PaymentMethodOption } from '@/types/invoice';

export default function PaymentMethodPicker({
    invoiceId,
    paymentMethods,
    onUpdated,
}: {
    invoiceId: number;
    paymentMethods: PaymentMethodOption[];
    onUpdated: (invoice: InvoiceData) => void;
}) {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleConfirm() {
        if (!selectedCode) return;
        setSubmitting(true);
        setError(null);

        try {
            const { data } = await axios.post(
                `/invoice/${invoiceId}/payment-method`,
                { payment_method_code: selectedCode },
            );
            onUpdated(data.invoice);
        } catch (err: any) {
            setError(
                err?.response?.data?.errors?.payment_method_code?.[0] ??
                    err?.response?.data?.message ??
                    'Gagal memilih metode pembayaran. Coba lagi.',
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Pilih Metode Pembayaran
            </p>

            <div className="space-y-2">
                {paymentMethods.map((method) => (
                    <label
                        key={method.code}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                            selectedCode === method.code
                                ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-500/10'
                                : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50'
                        }`}
                    >
                        <input
                            type="radio"
                            name="payment_method"
                            className="h-4 w-4 accent-indigo-600"
                            checked={selectedCode === method.code}
                            onChange={() => setSelectedCode(method.code)}
                        />
                        {method.metadata?.logo && (
                            <img
                                src={method.metadata.logo}
                                alt={method.name}
                                className="h-8 w-8 rounded object-contain"
                            />
                        )}
                        <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {method.name}
                            </p>
                            <p className="text-xs text-zinc-500 capitalize dark:text-zinc-400">
                                {method.type.replace('_', ' ')}
                            </p>
                        </div>
                    </label>
                ))}
            </div>

            {error && (
                <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                    {error}
                </p>
            )}

            <button
                onClick={handleConfirm}
                disabled={!selectedCode || submitting}
                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {submitting ? 'Memproses...' : 'Konfirmasi Metode Pembayaran'}
            </button>
        </div>
    );
}

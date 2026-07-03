import { router } from '@inertiajs/react';
import { useState } from 'react';
import type { PaymentMethodOption } from '@/types/invoice';

export default function PaymentMethodPicker({
    invoiceId,
    paymentMethods,
    onCancel,
}: {
    invoiceId: number;
    paymentMethods: PaymentMethodOption[];
    onCancel?: () => void;
}) {
    const [selected, setSelected] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    function handleConfirm() {
        if (!selected) return;

        setSubmitting(true);
        router.post(
            `/invoice/${invoiceId}/payment-method`,
            { payment_method_code: selected },
            {
                preserveScroll: true,
                onFinish: () => setSubmitting(false),
                onSuccess: () => onCancel?.(),
            },
        );
    }

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Pilih Metode Pembayaran
            </p>

            <div className="mt-3 space-y-2">
                {paymentMethods.map((method) => (
                    <button
                        key={method.code}
                        type="button"
                        onClick={() => setSelected(method.code)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                            selected === method.code
                                ? 'border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-800'
                                : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50'
                        }`}
                    >
                        <img
                            src={method.metadata.logo}
                            alt={method.name}
                            className="h-8 w-8 rounded object-contain"
                        />
                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                            {method.name}
                        </span>
                    </button>
                ))}
            </div>

            <div className="mt-4 flex gap-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                    >
                        Batal
                    </button>
                )}
                <button
                    type="button"
                    disabled={!selected || submitting}
                    onClick={handleConfirm}
                    className="flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900"
                >
                    {submitting ? 'Memproses...' : 'Konfirmasi'}
                </button>
            </div>
        </div>
    );
}

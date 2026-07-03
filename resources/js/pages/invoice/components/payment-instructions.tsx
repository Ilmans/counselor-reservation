import type { PaymentMethodSnapshot } from '@/types/invoice';

export default function PaymentInstructions({
    method,
}: {
    method: PaymentMethodSnapshot;
}) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Instruksi Pembayaran
            </p>

            {method.type === 'qris' ? (
                <div className="text-center">
                    {method.metadata?.qr_image && (
                        <img
                            src={method.metadata.qr_image}
                            alt="QRIS"
                            className="mx-auto h-56 w-56 object-contain"
                        />
                    )}
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                        {method.metadata?.merchant_name}
                    </p>
                </div>
            ) : (
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400">
                            Bank
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {method.name}
                        </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
                        <span className="text-zinc-500 dark:text-zinc-400">
                            No. Rekening
                        </span>
                        <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                            {method.metadata?.account_number}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400">
                            Atas Nama
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {method.metadata?.account_name}
                        </span>
                    </div>
                </div>
            )}

            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                Status akan diperbarui otomatis setelah pembayaran terkonfirmasi
                oleh sistem.
            </p>
        </div>
    );
}

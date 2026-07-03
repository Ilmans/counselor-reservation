import type { SelectedPaymentMethod } from '@/types/invoice';

export default function PaymentInstructions({
    method,
    onChangeMethod,
}: {
    method: SelectedPaymentMethod;
    onChangeMethod: () => void;
}) {
    console.log(method)
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
                {method.metadata.logo && (
                    <img
                        src={method.metadata.logo}
                        alt={method.name}
                        className="h-9 w-9 rounded object-contain"
                    />
                )}
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {method.name}
                </p>
            </div>

            {method.type === 'qris' ? (
                <div className="mt-4 flex flex-col items-center gap-2">
                    <img
                        src={method.metadata.qr_image}
                        alt="QRIS"
                        className="h-48 w-48 rounded-lg border border-zinc-200 object-contain dark:border-zinc-800"
                    />
                    {method.metadata.merchant_name && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {method.metadata.merchant_name}
                        </p>
                    )}
                </div>
            ) : (
                <div className="mt-4 space-y-2 text-sm">
                    {method.metadata.account_number && (
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500 dark:text-zinc-400">
                                No. Rekening
                            </span>
                            <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                                {method.metadata.account_number}
                            </span>
                        </div>
                    )}
                    {method.metadata.account_name && (
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500 dark:text-zinc-400">
                                Atas Nama
                            </span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                {method.metadata.account_name}
                            </span>
                        </div>
                    )}
                </div>
            )}

            <button
                type="button"
                onClick={onChangeMethod}
                className="mt-4 w-full rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
                Ubah Metode Pembayaran
            </button>
        </div>
    );
}

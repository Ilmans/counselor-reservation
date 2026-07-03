import { router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import Breadcrumb from '@/components/breadcumb';
import Wrapper from '@/layouts/wrapper';
import type { InvoiceData, PaymentMethodOption } from '@/types/invoice';
import CountdownTimer from './components/countdown-timer';
import PaymentInstructions from './components/payment-instructions';
import PaymentMethodPicker from './components/payment-method-picker';
import StatusBanner from './components/status-banner';

type Props = {
    invoice: InvoiceData;
    paymentMethods: PaymentMethodOption[];
};

export default function Show({ invoice, paymentMethods }: Props) {
    const [isChangingMethod, setIsChangingMethod] = useState(false);

    const breadcumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Reservasi Saya', href: '/my-reservations' },
        { label: invoice.reference },
    ];

    function handleExpire() {
        router.reload({ only: ['invoice', 'paymentMethods'] });
    }

    function handleDownload() {
        window.open(`/invoice/${invoice.id}/download`, '_blank');
    }

    const showPicker =
        invoice.status === 'pending' &&
        (!invoice.payment_method || isChangingMethod);

    return (
        <div className="min-h-screen  font-sans text-zinc-900 antialiased dark:bg-[#0d0d0f] dark:text-zinc-200">
            <div className="mx-auto max-w-5xl px-4 py-8">
                <Breadcrumb items={breadcumbs} />

                <div className="mt-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            No. Invoice
                        </p>
                        <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {invoice.reference}
                        </p>
                    </div>
                    <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                        ⬇ Unduh PDF
                    </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_340px] md:items-start">
                    {/* Kolom kiri: ringkasan invoice */}
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <div className="flex items-center gap-3">
                            <img
                                src={invoice.counselor.photo_url}
                                alt={invoice.counselor.name}
                                className="h-11 w-11 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    {invoice.counselor.name}
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {invoice.counselor.specialization}
                                </p>
                            </div>
                        </div>

                        <dl className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
                            <Row
                                label="Tanggal Sesi"
                                value={invoice.consultation.date}
                            />
                            <Row
                                label="Waktu Sesi"
                                value={invoice.consultation.time}
                            />
                            <Row
                                label="Metode"
                                value={
                                    invoice.consultation.method === 'online'
                                        ? 'Online'
                                        : 'Tatap Muka'
                                }
                            />
                        </dl>

                        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                Total Pembayaran
                            </span>
                            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                {invoice.amount_formatted}
                            </span>
                        </div>
                    </div>

                    {/* Kolom kanan (desktop): status & aksi pembayaran */}
                    <div className="space-y-4">
                        <StatusBanner status={invoice.status} />

                        {invoice.status === 'pending' && invoice.expired_at && (
                            <CountdownTimer
                                expiredAt={invoice.expired_at}
                                onExpire={handleExpire}
                            />
                        )}

                        {showPicker && (
                            <PaymentMethodPicker
                                invoiceId={invoice.id}
                                paymentMethods={paymentMethods}
                                onCancel={
                                    invoice.payment_method
                                        ? () => setIsChangingMethod(false)
                                        : undefined
                                }
                            />
                        )}

                        {invoice.status === 'pending' &&
                            invoice.payment_method &&
                            !isChangingMethod && (
                                <PaymentInstructions
                                    method={invoice.payment_method}
                                    onChangeMethod={() =>
                                        setIsChangingMethod(true)
                                    }
                                />
                            )}

                        {invoice.status === 'expired' && (
                            <button
                                onClick={() =>
                                    router.visit(
                                        `/psikolog/${invoice.counselor.slug}`,
                                    )
                                }
                                className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
                            >
                                Buat Reservasi Baru
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                {value}
            </dd>
        </div>
    );
}

Show.layout = (page: ReactNode) => <Wrapper main={page} />;

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
import InvoiceController from '@/actions/App/Http/Controllers/InvoiceController';
import PageHead from '@/components/page-head';

type Props = {
    invoice: InvoiceData;
    paymentMethods: PaymentMethodOption[];
};

export default function Show({ invoice, paymentMethods }: Props) {
    const [isChangingMethod, setIsChangingMethod] = useState(false);

    const breadcumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Invoice', href: '/my-invoices' },
        { label: invoice.reference },
    ];

    function handleExpire() {
        router.reload({ only: ['invoice', 'paymentMethods'] });
    }

    function handleDownload() {
        window.open(
            InvoiceController.downloadPdf.url(invoice.reference),
            '_blank',
        );
    }

    const showPicker =
        invoice.status === 'pending' &&
        (!invoice.payment_method || isChangingMethod);

    return (
        <>
            <PageHead title={`Invoice ${invoice.reference}`} />
            <div className="min-h-screen font-sans text-zinc-900 antialiased dark:bg-[#0d0d0f] dark:text-zinc-200">
                <div className="mx-auto max-w-5xl px-4 py-8">
                    <Breadcrumb items={breadcumbs} />

                    {/* Header invoice */}
                    <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900/50">
                        <div>
                            <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
                                No. Invoice
                            </p>
                            <p className="mt-0.5 font-mono text-base font-semibold text-zinc-900 dark:text-zinc-100">
                                {invoice.reference}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                Dibuat pada {invoice.created_at}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <StatusBanner status={invoice.status} />
                            <button
                                onClick={handleDownload}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            >
                                <DownloadIcon className="h-3.5 w-3.5" />
                                Unduh PDF
                            </button>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[1fr_340px] md:items-start">
                        {/* Kolom kiri: ringkasan invoice */}
                        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                            <div className="flex items-center gap-3">
                                <img
                                    src={invoice.counselor.photo_path}
                                    alt={invoice.counselor.name}
                                    className="h-12 w-12 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        {invoice.counselor.name}
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {invoice.counselor.specialization}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                <InfoRow
                                    icon={<CalendarIcon className="h-4 w-4" />}
                                    label="Tanggal Sesi"
                                    value={invoice.consultation.date}
                                />
                                <InfoRow
                                    icon={<ClockIcon className="h-4 w-4" />}
                                    label="Waktu Sesi"
                                    value={invoice.consultation.time}
                                />
                                <InfoRow
                                    icon={
                                        invoice.consultation.method ===
                                        'online' ? (
                                            <VideoIcon className="h-4 w-4" />
                                        ) : (
                                            <MapPinIcon className="h-4 w-4" />
                                        )
                                    }
                                    label="Metode"
                                    value={
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                                invoice.consultation.method ===
                                                'online'
                                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                                                    : 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400'
                                            }`}
                                        >
                                            {invoice.consultation.method ===
                                            'online'
                                                ? 'Online'
                                                : 'Tatap Muka'}
                                        </span>
                                    }
                                />
                                {invoice.paid_at && (
                                    <InfoRow
                                        icon={<CheckIcon className="h-4 w-4" />}
                                        label="Dibayar Pada"
                                        value={invoice.paid_at}
                                    />
                                )}
                            </div>

                            <div className="mt-5 flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3.5 dark:bg-zinc-800/50">
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                    Total Pembayaran
                                </span>
                                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {invoice.amount_formatted}
                                </span>
                            </div>
                        </div>

                        {/* Kolom kanan (desktop): status & aksi pembayaran */}
                        <div className="space-y-4">
                            {invoice.status === 'pending' &&
                                invoice.expired_at && (
                                    <CountdownTimer
                                        expiredAt={invoice.expired_at}
                                        createdAt={invoice.created_at}
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
                                        amount={invoice.amount_formatted}
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
        </>
    );
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: ReactNode;
}) {
    return (
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                {icon}
                <span>{label}</span>
            </div>
            <div className="font-medium text-zinc-900 dark:text-zinc-100">
                {value}
            </div>
        </div>
    );
}

/* --- Ikon inline sederhana (tanpa dependency tambahan) --- */
function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
        </svg>
    );
}
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    );
}
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    );
}
function VideoIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <rect x="2" y="6" width="14" height="12" rx="2" />
            <path d="m22 8-6 4 6 4V8Z" />
        </svg>
    );
}
function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

Show.layout = (page: ReactNode) => <Wrapper main={page} />;

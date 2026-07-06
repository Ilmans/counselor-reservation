import { Head, Link, router } from '@inertiajs/react';
import { FormEvent, ReactNode, useState } from 'react';

import Wrapper from '@/layouts/wrapper';
import  type { Invoice, InvoiceTable } from './List/invoice-table';
import InvoiceController from '@/actions/App/Http/Controllers/InvoiceController';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedInvoices {
    data: Invoice[];
    links: PaginationLink[];
    last_page: number;
    current_page: number;
}

interface Props {
    invoices: PaginatedInvoices;
    filters?: {
        search?: string;
    };
}

export default function InvoiceIndex({ invoices, filters }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');

    function handleSearch(e: FormEvent) {
        e.preventDefault();
        router.get(
            InvoiceController.index.url({ : search || undefined }),
            { preserveState: true, preserveScroll: true, replace: true },
        );
    }

    return (
        <>
            <Head title="Invoice" />
            <div className="min-h-screen bg-background font-sans text-foreground antialiased">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    <div className="flex flex-col gap-8 md:flex-row md:gap-10">
                        <UserSidebar active="invoice" />

                        <div className="min-w-0 flex-1">
                            <div className="mb-8">
                                <h1 className="font-serif text-3xl font-normal tracking-[-0.02em] text-foreground">
                                    Invoice
                                </h1>
                                <p className="mt-1 text-[13px] text-muted-foreground">
                                    Riwayat pembayaran sesi konseling.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSearch}
                                className="mb-4 flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan nomor referensi..."
                                    className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90"
                                >
                                    Cari
                                </button>
                                {filters?.search && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearch('');
                                            router.get(
                                                route('invoices.index'),
                                                {},
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                    replace: true,
                                                },
                                            );
                                        }}
                                        className="rounded-lg px-4 py-2 text-[13px] text-muted-foreground hover:bg-muted"
                                    >
                                        Reset
                                    </button>
                                )}
                            </form>

                            {invoices.data.length === 0 ? (
                                <EmptyState
                                    title="Belum ada invoice"
                                    description="Invoice akan muncul setelah kamu melakukan reservasi sesi berbayar."
                                />
                            ) : (
                                <InvoiceTable invoices={invoices.data} />
                            )}

                            {invoices.last_page > 1 && (
                                <div className="mt-6 flex flex-wrap gap-1">
                                    {invoices.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url ?? '#'}
                                            preserveScroll
                                            preserveState
                                            className={`rounded-lg px-3 py-1.5 text-[12px] ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'text-muted-foreground hover:bg-muted'
                                            } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

InvoiceIndex.layout = (page: ReactNode) => <Wrapper main={page} />;

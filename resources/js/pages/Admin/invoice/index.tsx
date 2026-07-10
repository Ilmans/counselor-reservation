import { Link, router } from '@inertiajs/react';
import { Search, CheckCircle, Trash } from 'lucide-react';
import type { ReactNode } from 'react';
import AdminInvoiceController from '@/actions/App/Http/Controllers/Admin/AdminInvoiceController';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import type { PaginatedData } from '@/types/consultation';
import type { Invoice } from '@/types/invoice';
import type { FILTERS } from '@/types/filter';
import { INVOICE_STATUS_CLASSES } from '@/types/badge';
import { useConfirm } from '@/hooks/use-confirm';
import AdminConsultationController from '@/actions/App/Http/Controllers/Admin/AdminConsultationController';
import Filters from './components/invoice-filter';
import PageHead from '@/components/page-head';

interface Props {
    invoices: PaginatedData<Invoice>;
    filters: FILTERS;
}

function Index({ invoices, filters }: Props) {
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();

    const onMarkAsPaid = (invoice: Invoice) => {
        confirm({
            variant: 'default',
            title: 'Konfirmasi pembayaran',
            description: `Tandai invoice ${invoice.reference} sebagai lunas? Aksi ini mengasumsikan pembayaran sudah diterima secara manual.`,
            confirmLabel: 'Tandai Lunas',
            onConfirm: () => {
                router.put(
                    AdminInvoiceController.markAsPaid.url(invoice.id),
                    {},
                    {
                        preserveScroll: true,
                        onStart: () => setProcessing(true),
                        onFinish: () => setProcessing(false),
                    },
                );
            },
        });
    };

    const onDelete = (invoice: Invoice) => {
        confirm({
            variant: 'danger',
            title: 'Konfirmasi penghapusan',
            description: `Anda yakin ingin menghapus invoice ${invoice.reference}? Aksi ini tidak bisa dibatalkan.`,
            confirmLabel: 'Hapus',
            onConfirm: () => {
                router.delete(AdminInvoiceController.delete.url(invoice.id), {
                    preserveScroll: true,
                    onStart: () => setProcessing(true),
                    onFinish: () => setProcessing(false),
                });
            },
        });
    };

    return (
        <>
         <PageHead title="Daftar Invoice" />
            <ConfirmDialog />
            <DashboardTitle
                title="Invoice"
                desc="Semua invoice pembayaran konsultasi."
            />

            <div className="mt-4 rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <InputSearch
                                only={['invoices']}
                                url={AdminInvoiceController.index.url()}
                                filters={filters}
                                placeholder="Cari berdasarkan reference / nama klien"
                            />
                        </div>
                        <Filters filters={filters} />
                    </div>
                </div>

                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Reference</Table.Cell>
                            <Table.Cell>Klien</Table.Cell>
                            <Table.Cell>Konsultasi</Table.Cell>
                            <Table.Cell>Jumlah</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Dibuat</Table.Cell>
                            <Table.Cell align="right">Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {invoices.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={7}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Belum ada invoice"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            invoices.data.map((row) => (
                                <Table.Row key={row.id}>
                                    <Table.Cell className="font-medium text-foreground">
                                        {row.reference}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <p className="text-foreground">
                                            {row.user?.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {row.user?.email}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Link
                                            href={AdminConsultationController.show.url(
                                                row.consultation.reference,
                                            )}
                                            className="text-foreground"
                                        >
                                            {row.consultation?.reference}
                                        </Link>
                                        <p className="text-xs text-muted-foreground">
                                            {row.consultation?.counselor_name}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>{row.amount}</Table.Cell>

                                    <Table.Cell>
                                        <Badge
                                            className={
                                                INVOICE_STATUS_CLASSES[
                                                    row.status
                                                ]
                                            }
                                        >
                                            {row.status_label}
                                        </Badge>
                                    </Table.Cell>

                                    <Table.Cell>{row.created_at}</Table.Cell>

                                    <Table.Cell align="right">
                                        <div className="flex items-center justify-end gap-2">
                                            {row.status === 'pending' && (
                                                <Button
                                                    onClick={() =>
                                                        onMarkAsPaid(row)
                                                    }
                                                    type="button"
                                                    size="sm"
                                                    mode="outlined"
                                                    className="cursor-pointer"
                                                >
                                                    <CheckCircle className="h-3.5 w-3.5" />
                                                    Tandai Lunas
                                                </Button>
                                            )}
                                            <Button
                                                onClick={() => onDelete(row)}
                                                type="button"
                                                size="sm"
                                                mode="outlined"
                                                variant="red"
                                                className="cursor-pointer"
                                            >
                                                <Trash className="h-3.5 w-3.5" />
                                                Hapus
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
                <Pagination pagination={invoices.meta} />
            </div>
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-invoices" />
);

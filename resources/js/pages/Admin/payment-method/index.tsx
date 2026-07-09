import { router } from '@inertiajs/react';
import { Search, Pencil, Plus, Trash } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import AdminPaymentMethodController from '@/actions/App/Http/Controllers/Admin/AdminPaymentMethodController';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import type { PaginatedData } from '@/types/consultation';
import type { PaymentMethodOption } from '@/types/invoice';
import type { FILTERS } from '@/types/filter';
import { useConfirm } from '@/hooks/use-confirm';
import PaymentMethodModal from './components/payment-method-modal';

interface Props {
    paymentMethods: PaginatedData<PaymentMethodOption & { is_active: boolean }>;
    filters: FILTERS;
}

const TYPE_LABELS: Record<string, string> = {
    bank_transfer: 'Transfer Bank',
    ewallet: 'E-Wallet',
    qris: 'QRIS',
    virtual_account: 'Virtual Account',
};

function Index({ paymentMethods, filters }: Props) {
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const openCreate = () => {
        setEditingItem(null);
        setModalOpen(true);
    };

    const openEdit = (item: any) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const onDelete = (item: any) => {
        confirm({
            variant: 'danger',
            title: 'Konfirmasi penghapusan',
            description: `Anda yakin ingin menghapus metode pembayaran ${item.name}? Aksi ini tidak bisa dibatalkan.`,
            confirmLabel: 'Hapus',
            onConfirm: () => {
                router.delete(
                    AdminPaymentMethodController.delete.url(item.id),
                    {
                        preserveScroll: true,
                        onStart: () => setProcessing(true),
                        onFinish: () => setProcessing(false),
                    },
                );
            },
        });
    };

    return (
        <>
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <ConfirmDialog />
                <DashboardTitle
                    title="Metode Pembayaran"
                    desc="Kelola metode pembayaran yang tersedia."
                />
                <Button
                    type="button"
                    onClick={openCreate}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-green-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Metode
                </Button>
            </div>

            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="relative min-w-0 flex-1 sm:max-w-xs">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <InputSearch
                            only={['paymentMethods']}
                            url={AdminPaymentMethodController.index.url()}
                            filters={filters}
                            placeholder="Cari nama metode"
                        />
                    </div>
                </div>

                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Kode</Table.Cell>
                            <Table.Cell>Nama</Table.Cell>
                            <Table.Cell>Tipe</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell align="right">Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {paymentMethods.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={5}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Belum ada metode pembayaran"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            paymentMethods.data.map((row: any) => (
                                <Table.Row key={row.id}>
                                    <Table.Cell className="font-medium text-foreground">
                                        {row.code}
                                    </Table.Cell>
                                    <Table.Cell>{row.name}</Table.Cell>
                                    <Table.Cell>
                                        {TYPE_LABELS[row.type] ?? row.type}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            className={
                                                row.is_active
                                                    ? 'border-green-200 bg-green-100 text-green-800'
                                                    : 'border-gray-200 bg-gray-100 text-gray-800'
                                            }
                                        >
                                            {row.is_active
                                                ? 'Aktif'
                                                : 'Nonaktif'}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell align="right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                onClick={() => openEdit(row)}
                                                type="button"
                                                size="sm"
                                                mode="outlined"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => onDelete(row)}
                                                type="button"
                                                size="sm"
                                                mode="outlined"
                                                variant="red"
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
                <Pagination pagination={paymentMethods.meta} />
            </div>

            <PaymentMethodModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                paymentMethod={editingItem}
            />
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-payment-methods" />
);

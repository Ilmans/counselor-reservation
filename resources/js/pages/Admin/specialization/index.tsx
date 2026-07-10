import { router } from '@inertiajs/react';
import { Search, Pencil, Plus, Trash } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import AdminMasterDataController from '@/actions/App/Http/Controllers/Admin/AdminMasterDataController';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Table } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import type { PaginatedData } from '@/types/consultation';
import type { SpecializationList } from '@/types/specialization';
import type { FILTERS } from '@/types/filter';
import { useConfirm } from '@/hooks/use-confirm';
import SpecializationModal from './components/specialization-modal';
import PageHead from '@/components/page-head';

interface Props {
    specializations: PaginatedData<SpecializationList>;
    filters: FILTERS;
}

function Index({ specializations, filters }: Props) {
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSpecialization, setEditingSpecialization] =
        useState<SpecializationList | null>(null);

    const openCreate = () => {
        setEditingSpecialization(null);
        setModalOpen(true);
    };

    const openEdit = (specialization: SpecializationList) => {
        setEditingSpecialization(specialization);
        setModalOpen(true);
    };

    const onDelete = (specialization: SpecializationList) => {
        confirm({
            variant: 'danger',
            title: 'Konfirmasi penghapusan',
            description: `Anda yakin ingin menghapus spesialisasi ${specialization.name}, aksi ini tidak bisa dibatalkan setelah dikonfirmasi!`,
            confirmLabel: 'Hapus',
            onConfirm: () => {
                router.delete(
                    AdminMasterDataController.deleteSpecialization.url(
                        specialization.id,
                    ),
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
         <PageHead title="Data Spesialisasi" />
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <ConfirmDialog />
                <DashboardTitle
                    title="Spesialisasi"
                    desc="Semua daftar spesialisasi konselor."
                />
                <Button
                    type="button"
                    onClick={openCreate}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-green-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Spesialisasi
                </Button>
            </div>

            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="relative min-w-0 flex-1 sm:max-w-xs">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <InputSearch
                            only={['specializations']}
                            url={AdminMasterDataController.indexSpecialization.url()}
                            filters={filters}
                            placeholder="Cari spesialisasi"
                        />
                    </div>
                </div>

                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Nama</Table.Cell>
                            <Table.Cell>Deskripsi</Table.Cell>
                            <Table.Cell>Jumlah Konselor</Table.Cell>
                            <Table.Cell>Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {specializations.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={4}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Belum ada spesialisasi"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            specializations.data.map((row) => (
                                <Table.Row key={row.id}>
                                    <Table.Cell>{row.name}</Table.Cell>
                                    <Table.Cell className="max-w-xs truncate text-muted-foreground">
                                        {row.description}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {row.counselors_count}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
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
                <Pagination pagination={specializations.meta} />
            </div>

            <SpecializationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                specialization={editingSpecialization}
            />
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-specializations" />
);

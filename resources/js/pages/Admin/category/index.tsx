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
import type { CategoryList } from '@/types/category';
import type { FILTERS } from '@/types/filter';
import { useConfirm } from '@/hooks/use-confirm';
import CategoryModal from './components/category-modal';
import PageHead from '@/components/page-head';

interface Props {
    categories: PaginatedData<CategoryList>;
    filters: FILTERS;
}

function Index({ categories, filters }: Props) {
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CategoryList | null>(
        null,
    );

    const openCreate = () => {
        setEditingCategory(null);
        setModalOpen(true);
    };

    const openEdit = (category: CategoryList) => {
        setEditingCategory(category);
        setModalOpen(true);
    };

    const onDelete = (category: CategoryList) => {
        confirm({
            variant: 'danger',
            title: 'Konfirmasi penghapusan',
            description: `Anda yakin ingin menghapus kategori ${category.name}, aksi ini tidak bisa dibatalkan setelah dikonfirmasi!`,
            confirmLabel: 'Hapus',
            onConfirm: () => {
                router.delete(
                    AdminMasterDataController.deleteCategory.url(category.id),
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
         <PageHead title="Daftar Kategori" />
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <ConfirmDialog />
                <DashboardTitle
                    title="Kategori"
                    desc="Semua daftar kategori konselor."
                />
                <Button
                    type="button"
                    onClick={openCreate}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-green-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Kategori
                </Button>
            </div>

            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="relative min-w-0 flex-1 sm:max-w-xs">
                        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <InputSearch
                            only={['categories']}
                            url={AdminMasterDataController.indexCategory.url()}
                            filters={filters}
                            placeholder="Cari kategori"
                        />
                    </div>
                </div>

                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Nama</Table.Cell>
                            <Table.Cell>Slug</Table.Cell>
                            <Table.Cell>Jumlah Konselor</Table.Cell>
                            <Table.Cell>Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {categories.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={4}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Belum ada kategori"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            categories.data.map((row) => (
                                <Table.Row key={row.id}>
                                    <Table.Cell>{row.name}</Table.Cell>
                                    <Table.Cell className="text-muted-foreground">
                                        {row.slug}
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
                <Pagination pagination={categories.meta} />
            </div>

            <CategoryModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                category={editingCategory}
            />
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-categories" />
);

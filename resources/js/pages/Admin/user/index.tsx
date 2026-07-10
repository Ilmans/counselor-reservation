import { router } from '@inertiajs/react';
import { Search, Pencil, Plus, Trash } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { useConfirm } from '@/hooks/use-confirm';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import { ROLE } from '@/types/badge';
import type { PaginatedData } from '@/types/consultation';

import type { FILTERS } from '@/types/filter';
import { UserList } from '@/types/row';
import ManageUserController from '@/actions/App/Http/Controllers/Admin/ManageUserController';
import FilterUser from './components/filter-user';
import UserModal from './components/user-modal';
import PageHead from '@/components/page-head';

interface Props {
    users: PaginatedData<UserList>;
    filters: FILTERS;
}

function Index({ users, filters }: Props) {
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserList | null>(null);

    const openCreate = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const openEdit = (user: UserList) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const onDelete = (user: UserList) => {
        confirm({
            variant: 'danger',
            title: 'Konfirmasi penghapusan',
            description:
                'Anda yakin ingin menghapus user ' +
                user.name +
                ', aksi ini tidak bisa dibatalkan setelah dikonfirmasi!',
            confirmLabel: 'Hapus',
            onConfirm: () => {
                router.delete(ManageUserController.delete.url(user.id), {
                    preserveScroll: true,
                    onStart: () => setProcessing(true),
                    onFinish: () => setProcessing(false),
                });
            },
        });
    };

    return (
        <>
         <PageHead title="Daftar Pengguna" />
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <ConfirmDialog />
                <DashboardTitle
                    title="User"
                    desc="Semua daftar user terdaftar."
                />
                <Button
                    type="button"
                    onClick={openCreate}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-green-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah User
                </Button>
            </div>

            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <InputSearch
                                only={['users']}
                                url={ManageUserController.index.url()}
                                filters={filters}
                                placeholder="Cari berdasarkan nama / email user"
                            />
                        </div>
                        <FilterUser filters={filters} />
                    </div>
                </div>

                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>User</Table.Cell>
                            <Table.Cell>Kontak</Table.Cell>
                            <Table.Cell>Usia / Gender</Table.Cell>
                            <Table.Cell>Role</Table.Cell>
                            <Table.Cell>Konsultasi</Table.Cell>
                            <Table.Cell>Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {users.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={6}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Belum ada user terdaftar"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            users.data.map((row) => (
                                <Table.Row key={row.id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            {row.avatar ? (
                                                <img
                                                    src={row.avatar}
                                                    alt={row.name}
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                                                    {row.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .slice(0, 2)
                                                        .join('')
                                                        .toUpperCase()}
                                                </div>
                                            )}
                                            <p className="font-medium text-foreground">
                                                {row.name}
                                            </p>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex flex-col text-sm">
                                            <span className="text-foreground">
                                                {row.email}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {row.whatsapp ?? '-'}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex flex-col text-sm">
                                            <span className="text-foreground">
                                                {row.age} tahun
                                            </span>
                                            <span className="text-muted-foreground">
                                                {row.gender === 'L'
                                                    ? 'Laki-laki'
                                                    : 'Perempuan'}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Badge className={ROLE[row.role]}>
                                            {row.role}
                                        </Badge>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {row.consultations_count}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                onClick={() => openEdit(row)}
                                                type="button"
                                                size="sm"
                                                mode="outlined"
                                                className="cursor-pointer"
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
                <Pagination pagination={users.meta} />
            </div>

            <UserModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                user={editingUser}
            />
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-users" />
);

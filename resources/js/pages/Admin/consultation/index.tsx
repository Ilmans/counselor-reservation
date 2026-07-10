import { Link, router } from '@inertiajs/react';
import { Eye, Search, Trash } from 'lucide-react';
import type { ReactNode } from 'react';
import AdminConsultationController from '@/actions/App/Http/Controllers/Admin/AdminConsultationController';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import type { Consultation, PaginatedData } from '@/types/consultation';
import type { FILTERS } from '@/types/filter';
import Filters from './components/filter';
import { CONSULTATION_STATUS_CLASSES } from '@/types/badge';
import { useConfirm } from '@/hooks/use-confirm';
import { Button } from '@/components/ui/button';
import PageHead from '@/components/page-head';
interface Props {
    consultations: PaginatedData<Consultation>;
    filters: FILTERS;
}

function Index({ consultations, filters }: Props) {
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();

    const onDelete = (consultation) => {
        confirm({
            variant: 'danger',
            title: 'Konfirmasi penghapusan',
            description:
                'Anda yakin ingin menghapus data ini? ' +
                ', aksi ini tidak bisa dibatalkan setelah dikonfirmasi!',
            confirmLabel: 'Hapus',

            onConfirm: () => {
                router.delete(
                    AdminConsultationController.delete.url(consultation.id),
                    {
                        preserveScroll: true,

                        onStart: () => {
                            setProcessing(true);
                        },

                        onFinish: () => {
                            setProcessing(false);
                        },
                    },
                );
            },
        });
    };

    return (
        <>
         <PageHead title="Daftar Konsultasi" />
            <DashboardTitle
                title="Konsultasi"
                desc="Semua daftar konsultasi yang berjalan."
            />
            <ConfirmDialog />
            <div className="mt-4 rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <InputSearch
                                only={['consultations']}
                                url={AdminConsultationController.index.url()}
                                filters={filters}
                                placeholder="Cari berdasarkan no referensi"
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
                            <Table.Cell>Konselor</Table.Cell>
                            <Table.Cell>Jadwal</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Metode</Table.Cell>
                            <Table.Cell align="right">Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {consultations.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={7}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Tidak ada data konsultasi"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            consultations.data.map((row) => (
                                <Table.Row key={row.reference}>
                                    <Table.Cell className="font-medium text-foreground">
                                        {row.reference}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <p className="font-medium text-foreground">
                                            {row.user?.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {row.user?.whatsapp}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <p className="font-medium text-foreground">
                                            {row.counselor?.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {row.counselor?.specialization}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <p className="text-foreground">
                                            {row.date}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {row.time}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Badge
                                            className={
                                                CONSULTATION_STATUS_CLASSES[
                                                    row.status
                                                ]
                                            }
                                        >
                                            {row.status_label}
                                        </Badge>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="text-sm text-foreground">
                                            {row.mode}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell align="right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={AdminConsultationController.show.url(
                                                    row.reference,
                                                )}
                                                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                                Detail
                                            </Link>

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
                <Pagination pagination={consultations.meta} />
            </div>
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-consultations" />
);

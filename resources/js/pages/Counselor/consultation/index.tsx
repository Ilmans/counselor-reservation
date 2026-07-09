import { Link } from '@inertiajs/react';
import {
    Consultation,
    CONSULTATION_STATUS_CLASSES,
    PaginatedData,
} from '@/types/consultation';
import { Eye, Search } from 'lucide-react';
import type { ReactNode } from 'react';
import ConsultationController from '@/actions/App/Http/Controllers/Counselor/ConsultationController';
import Breadcrumb from '@/components/breadcumb';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import type { FILTERS } from '@/types/filter';
import Filters from './components/filters';
import PageHead from '@/components/page-head';
const breadcumbs = [
    {
        label: 'Beranda',
        href: '/',
    },
    {
        label: 'Konselor',
        href: '/',
    },
    {
        label: 'df',
    },
];
interface Props {
    consultations: PaginatedData<Consultation>;
    filters: FILTERS;
}

function Index({ consultations, filters }: Props) {
    return (
        <>
            <PageHead title="Daftar Konsultasi" />
            <Breadcrumb items={breadcumbs} />
            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <InputSearch
                                only={['consultations']}
                                url={ConsultationController.index.url()}
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
                            <Table.Cell>Klien</Table.Cell>
                            <Table.Cell>No. Referensi</Table.Cell>
                            <Table.Cell>Tanggal</Table.Cell>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Pendapatan</Table.Cell>
                            <Table.Cell align="right">Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {consultations.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={6}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Tidak ada data konsultasi"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            consultations.data.map((row) => (
                                <Table.Row key={row.reference}>
                                    <Table.Cell>
                                        <p className="font-medium text-foreground">
                                            {row.is_anonymous
                                                ? 'Anonim.'
                                                : row.user.name}
                                        </p>

                                        <p className="mt-0.5 max-w-[220px] truncate text-[11px] text-muted-foreground">
                                            {row.pra_note}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>{row.reference}</Table.Cell>
                                    <Table.Cell>{row.date}</Table.Cell>

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

                                    <Table.Cell>{row.price}</Table.Cell>

                                    <Table.Cell align="right">
                                        <Link
                                            href={ConsultationController.show.url(
                                                { reference: row.reference },
                                            )}
                                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            Detail
                                        </Link>
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
    <DashboardWrapper children={page} activeKey="consultations" />
);

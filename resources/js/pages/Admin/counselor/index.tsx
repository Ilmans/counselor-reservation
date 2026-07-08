import { Link, router } from '@inertiajs/react';
import {
    Search,
    Star,
    Pencil,
    Power,
    PowerOff,
    Plus,
    Trash,
} from 'lucide-react';
import type { ReactNode } from 'react';
import AdminCounselorController from '@/actions/App/Http/Controllers/Admin/AdminCounselorController';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import type { PaginatedData } from '@/types/consultation';
import type { CounselorList } from '@/types/counselor';
import type { FILTERS } from '@/types/filter';
import FilterCo from './components/filter-co';
import { Button } from '@/components/ui/button';
import { VISIBILITY } from '@/types/badge';
import { useConfirm } from '@/hooks/use-confirm';

interface Props {
    counselors: PaginatedData<CounselorList>;
    filters: FILTERS;
}

function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                        i < rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground/30'
                    }`}
                />
            ))}
        </div>
    );
}

function Index({ counselors, filters }: Props) {
   const { confirm, ConfirmDialog, setProcessing } = useConfirm();

   const onDelete = (counselor: CounselorList) => {
       confirm({
           variant: 'danger',
           title: 'Konfirmasi penghapusan',
           description:
               'Anda yakin ingin menghapus konselor ' +
               counselor.name +
               ', aksi ini tidak bisa dibatalkan setelah dikonfirmasi!',
           confirmLabel: 'Hapus',

           onConfirm: () => {
               router.delete(
                   AdminCounselorController.delete.url(counselor.id),
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
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <ConfirmDialog />
                <DashboardTitle
                    title="Konselor"
                    desc="Semua daftar konselor tersedia."
                />

                <Link
                    href={AdminCounselorController.create.url()}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-secondary transition-colors hover:bg-green-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Konselor
                </Link>
            </div>
            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <InputSearch
                                only={['counselors']}
                                url={AdminCounselorController.index.url()}
                                filters={filters}
                                placeholder="Cari berdasarkan nama / email konselor"
                            />
                        </div>
                        <FilterCo filters={filters} />
                    </div>
                </div>

                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Konselor</Table.Cell>
                            <Table.Cell>Kontak</Table.Cell>
                            <Table.Cell>Spesialisasi</Table.Cell>
                            <Table.Cell>Harga</Table.Cell>
                            <Table.Cell>Rating</Table.Cell>
                            <Table.Cell>Konsultasi</Table.Cell>
                            <Table.Cell>Visibility</Table.Cell>
                            <Table.Cell>Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {counselors.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={8}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Belum ada konselor terdaftar"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            counselors.data.map((row) => (
                                <Table.Row key={row.id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            {row.photo_path ? (
                                                <img
                                                    src={
                                                        row.photo
                                                            ? row.photo
                                                            : row.photo_path
                                                    }
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
                                                {row.whatsapp}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex flex-col text-sm">
                                            <span className="text-foreground">
                                                {row.specialization ?? '-'}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {row.categories}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex flex-col text-sm">
                                            <span className="text-foreground">
                                                {row.price_per_hour}
                                            </span>
                                            <span className="text-muted-foreground capitalize">
                                                {row.pricing_type}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex flex-col gap-1">
                                            <RatingStars
                                                rating={Math.round(
                                                    row.feedbacks_avg_rating ??
                                                        0,
                                                )}
                                            />
                                            <span className="text-xs text-muted-foreground">
                                                {row.feedbacks_avg_rating
                                                    ? row.feedbacks_avg_rating.toFixed(
                                                          1,
                                                      )
                                                    : 'Belum ada rating'}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {row.consultations_count}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Badge
                                            className={
                                                VISIBILITY[row.visibility]
                                            }
                                        >
                                            {row.visibility_label}
                                        </Badge>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={AdminCounselorController.edit.url(
                                                    row.id,
                                                )}
                                                className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground hover:bg-muted"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                                Edit
                                            </Link>
                                            <Button
                                                onClick={() => {
                                                    onDelete(row);
                                                }}
                                                type="button"
                                                size="sm"
                                                mode="outlined"
                                                variant="red"
                                                className={'cursor-pointer'}
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
                <Pagination pagination={counselors.meta} />
            </div>
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-counselors" />
);

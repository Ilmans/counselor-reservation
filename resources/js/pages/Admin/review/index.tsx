import { router } from '@inertiajs/react';
import { Search, Star, Trash } from 'lucide-react';
import type { ReactNode } from 'react';
import AdminReviewController from '@/actions/App/Http/Controllers/Admin/AdminReviewController';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import type { PaginatedData } from '@/types/consultation';
import type { Review } from '@/types/review';

import { FILTERS } from '@/types/filter';
import { useConfirm } from '@/hooks/use-confirm';
import Filters from './components/review-filter';

interface Props {
    reviews: PaginatedData<Review>;
    filters: FILTERS;
}

function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                        i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'
                    }`}
                />
            ))}
        </div>
    );
}

function Index({ reviews, filters }: Props) {
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();

    const onDelete = (review: Review) => {
        confirm({
            variant: 'danger',
            title: 'Konfirmasi penghapusan',
            description: `Anda yakin ingin menghapus review dari ${review.client_name}? Aksi ini tidak bisa dibatalkan.`,
            confirmLabel: 'Hapus',
            onConfirm: () => {
                router.delete(AdminReviewController.delete.url(review.id), {
                    preserveScroll: true,
                    onStart: () => setProcessing(true),
                    onFinish: () => setProcessing(false),
                });
            },
        });
    };

    return (
        <>
            <ConfirmDialog />
            <DashboardTitle title="Review" desc="Semua review konsultasi dari klien." />

            <div className="mt-4 rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <InputSearch
                                only={['reviews']}
                                url={AdminReviewController.index.url()}
                                filters={filters}
                                placeholder="Cari berdasarkan reference / nama klien / konselor"
                            />
                        </div>
                        <Filters filters={filters} />
                    </div>
                </div>

                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Klien</Table.Cell>
                            <Table.Cell>Konselor</Table.Cell>
                            <Table.Cell>Reference</Table.Cell>
                            <Table.Cell>Rating</Table.Cell>
                            <Table.Cell>Komentar</Table.Cell>
                            <Table.Cell>Tanggal</Table.Cell>
                            <Table.Cell align="right">Aksi</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {reviews.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={7}>
                                    <EmptyState title="Tidak ada data" description="Belum ada review masuk" />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            reviews.data.map((row) => (
                                <Table.Row key={row.id}>
                                    <Table.Cell className="font-medium text-foreground">
                                        {row.is_anonymous ? 'Anonim' : row.client_name}
                                    </Table.Cell>

                                    <Table.Cell>{row.counselor?.name ?? '-'}</Table.Cell>

                                    <Table.Cell>{row.reference}</Table.Cell>

                                    <Table.Cell>
                                        <RatingStars rating={row.rating} />
                                    </Table.Cell>

                                    <Table.Cell className="max-w-xs truncate text-muted-foreground">
                                        {row.comment}
                                    </Table.Cell>

                                    <Table.Cell>{row.created_at}</Table.Cell>

                                    <Table.Cell align="right">
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
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table>
                <Pagination pagination={reviews.meta} />
            </div>
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => <AdminWrapper children={page} activeKey="manage-reviews" />;

import { Star } from 'lucide-react';
import { Search } from 'lucide-react';
import type { ReactNode } from 'react';
import ReviewController from '@/actions/App/Http/Controllers/Counselor/ReviewController';
import Breadcrumb from '@/components/breadcumb';
import { EmptyState } from '@/components/empty-state';
import InputSearch from '@/components/interactive/input-search';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import type { PaginatedData } from '@/types/consultation';
import type { FILTERS } from '@/types/filter';
import type { Review } from '@/types/review';
import ReviewFilters from './componen/review-filter';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';

const breadcumbs = [
    { label: 'Beranda', href: '/' },
    { label: 'Konselor', href: '/' },
    { label: 'Ulasan' },
];

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
                        i < rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground/30'
                    }`}
                />
            ))}
        </div>
    );
}

function Index({ reviews, filters }: Props) {
    return (
        <>
            <div className="mb-4">
                <DashboardTitle
                    title={'Ulasan'}
                    desc={
                        'Semua ulasan dari konsultasi anda yang telah selesai'
                    }
                />
            </div>
            <div className="rounded-xl border border-border bg-card">
                <div className="border-b border-border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="relative min-w-0 flex-1 sm:max-w-xs">
                            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <InputSearch
                                only={['reviews']}
                                url={ReviewController.index.url()}
                                filters={filters}
                                placeholder="Cari berdasarkan klien / no referensi"
                            />
                        </div>
                        <ReviewFilters filters={filters} />
                    </div>
                </div>

                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>Klien</Table.Cell>
                            <Table.Cell>No. Referensi</Table.Cell>
                            <Table.Cell>Rating</Table.Cell>
                            <Table.Cell>Komentar</Table.Cell>
                            <Table.Cell>Tanggal</Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {reviews.data.length === 0 ? (
                            <Table.Row>
                                <Table.Cell colSpan={5}>
                                    <EmptyState
                                        title="Tidak ada data"
                                        description="Belum ada ulasan dari klien"
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            reviews.data.map((row) => (
                                <Table.Row key={row.id}>
                                    <Table.Cell>
                                        <p className="font-medium text-foreground">
                                            {row.client_name}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>{row.reference}</Table.Cell>

                                    <Table.Cell>
                                        <RatingStars rating={row.rating} />
                                    </Table.Cell>

                                    <Table.Cell>
                                        <p className="max-w-[280px] truncate text-sm text-foreground">
                                            {row.comment}
                                        </p>
                                    </Table.Cell>

                                    <Table.Cell>{row.created_at}</Table.Cell>
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
Index.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="reviews" />
);

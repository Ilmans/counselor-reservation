import { InfiniteScroll } from '@inertiajs/react';
import { useRef } from 'react';

import type { CounselorList, Paginated } from '@/types/counselor';
import CounselorCard from './counselor-card';
import CounselorGridSkeleton from './counselor-skeleton';

type Props = {
    counselors: Paginated<CounselorList>;
    isLoading?: boolean;
};

function CounselorGrid({ counselors, isLoading = false }: Props) {
    const infiniteRef = useRef<any>(null);
    const total = counselors.total ?? counselors.data.length;

    return (
        <main className="px-6 pb-20">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground uppercase">
                        {isLoading ? (
                            <span className="inline-block h-4 w-32 animate-pulse rounded-full bg-muted align-middle" />
                        ) : (
                            `${total} Konselor Tersedia`
                        )}
                    </p>

                    <div className="relative w-full sm:w-auto">
                        <select
                            disabled={isLoading}
                            className="w-full cursor-pointer appearance-none rounded-full border border-border bg-card py-2.5 pr-9 pl-4 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            <option>Urut: Rating tertinggi</option>
                            <option>Urut: Harga terendah</option>
                            <option>Urut: Tersedia hari ini</option>
                        </select>
                        <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            className="pointer-events-none absolute top-1/2 right-3.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                        >
                            <path
                                d="M4 6l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {isLoading ? (
                    <CounselorGridSkeleton count={6} />
                ) : counselors.data.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-border py-20 text-center">
                        <p className="font-serif text-xl text-foreground">
                            Konselor tidak ditemukan
                        </p>
                        <p className="max-w-xs text-sm font-light text-muted-foreground">
                            Coba kata kunci lain atau ubah kategori pencarianmu.
                        </p>
                    </div>
                ) : (
                    <div className="content-fade-in">
                        <style>{`
                            @keyframes content-fade-in {
                                from { opacity: 0; transform: translateY(6px); }
                                to { opacity: 1; transform: translateY(0); }
                            }
                            .content-fade-in {
                                animation: content-fade-in 0.45s ease-out both;
                            }
                        `}</style>

                        <InfiniteScroll
                            ref={infiniteRef}
                            data="counselors"
                            manual={true}
                            preserveUrl={true}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {counselors.data.map((counselor: CounselorList) => (
                                <CounselorCard
                                    key={counselor.id}
                                    counselor={counselor}
                                />
                            ))}
                        </InfiniteScroll>

                        {counselors.meta.current_page < counselors.meta.last_page && (
                            <div className="mt-10 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        infiniteRef.current?.fetchNext()
                                    }
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                                >
                                    Tampilkan lebih banyak
                                    <svg
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        className="h-3.5 w-3.5"
                                    >
                                        <path
                                            d="M4 6l4 4 4-4"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default CounselorGrid;

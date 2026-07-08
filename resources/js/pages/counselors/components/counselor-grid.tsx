import { InfiniteScroll } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { CounselorList, Paginated } from '@/types/counselor';
import CounselorCard from './counselor-card';
import CounselorGridSkeleton from './counselor-skeleton';

type Props = {
    counselors: Paginated<CounselorList>;
};

function CounselorGrid({ counselors }: Props) {
    const infiniteRef = useRef<any>(null);
    const total = counselors.total ?? counselors.data.length;

    // NOTE: ini fake loading state buat nunjukin visual skeleton-nya aja
    // (delay statis 900ms). Di production, ganti ini dengan sinyal loading
    // asli, misal `router.on('start' | 'finish', ...)` dari Inertia, atau
    // state loading dari InfiniteScroll kalau tersedia.
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

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
                    <select
                        disabled={isLoading}
                        className="w-full cursor-pointer rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                        <option>Urut: Rating tertinggi</option>
                        <option>Urut: Harga terendah</option>
                        <option>Urut: Tersedia hari ini</option>
                    </select>
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

                        {counselors.current_page < counselors.last_page && (
                            <div className="mt-10 flex justify-center">
                                <Button
                                    onClick={() =>
                                        infiniteRef.current?.fetchNext()
                                    }
                                    className="cursor-pointer rounded-full text-sm"
                                >
                                    Tampilkan lebih banyak ↓
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default CounselorGrid;

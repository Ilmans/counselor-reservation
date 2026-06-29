import { InfiniteScroll } from '@inertiajs/react';
import React, { useRef } from 'react';

import { Button } from '@/components/ui/button';
import type { Counselor, Paginated } from '@/types/counselor';
import CounselorCard from './counselor-card';

type Props = {
    counselors: Paginated<Counselor>;
};
function CounselorList({ counselors }: Props) {
    const infiniteRef = useRef<any>(null);

    return (
        <>
            <main className=" px-6 pb-20">
                <div className="mb-6 flex items-center justify-between">
                    <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground uppercase">
                        12 Konselor Tersedia
                    </p>
                    <select className="cursor-pointer rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none">
                        <option>Urut: Rating tertinggi</option>
                        <option>Urut: Harga terendah</option>
                        <option>Urut: Tersedia hari ini</option>
                    </select>
                </div>

                <InfiniteScroll
                    ref={infiniteRef}
                    data="counselors"
                    manual={true}
                    preserveUrl={true}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                    {counselors.data.map((counselor: Counselor) => (
                        <CounselorCard
                            key={counselor.id}
                            counselor={counselor}
                        />
                    ))}
                </InfiniteScroll>

                {/* tombol luar */}
                <div className="mt-10 flex justify-center">
                    <Button
                        disabled={
                            counselors.current_page >= counselors.last_page
                        }
                        onClick={() => infiniteRef.current?.fetchNext()}
                        className="cursor-pointer rounded-full text-sm"
                    >
                        Tampilkan lebih banyak ↓
                    </Button>
                </div>
            </main>
        </>
    );
}

export default CounselorList;

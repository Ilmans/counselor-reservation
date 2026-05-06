import React from 'react';
import type { Counselor, Paginated } from '@/types/counselor';
import CounselorCard from './counselor-card';

type Props = {
    counselors: Paginated<Counselor>;
};
function CounselorList({ counselors }: Props) {
    return (
        <>
            <main className="mx-auto max-w-5xl px-6 pb-20">
                <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-medium tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-600">
                        12 Konselor Tersedia
                    </p>
                    <select className="cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[12px] text-zinc-600 transition-colors focus:border-zinc-400 focus:outline-none dark:border-zinc-700/60 dark:bg-zinc-900 dark:text-zinc-400 dark:focus:border-zinc-500">
                        <option>Urut: Rating tertinggi</option>
                        <option>Urut: Harga terendah</option>
                        <option>Urut: Tersedia hari ini</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {/* ── CARD 1 ── */}
                    {counselors.data.map((counselor: Counselor) => (
                        <CounselorCard counselor={counselor} />
                    ))}
                </div>

                {/* Load More */}
                <div className="mt-8 flex justify-center">
                    <button className="rounded-lg border border-zinc-200 px-5 py-2.5 text-xs font-medium tracking-[0.02em] text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:text-zinc-300">
                        Tampilkan lebih banyak ↓
                    </button>
                </div>
            </main>
        </>
    );
}

export default CounselorList;

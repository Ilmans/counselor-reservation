import React from 'react';
import Rating from '@/components/rating';
import SectionLabel from './section-label';

function Review({ rating, totalSessions }: any) {
    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <SectionLabel>Ulasan Klien</SectionLabel>
                <div className="flex items-center gap-2">
                    <Rating showSessions={false} value={rating} />
                    <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                        {rating}
                    </span>
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                        · {totalSessions} ulasan
                    </span>
                </div>
            </div>

            {/* Rating breakdown */}
            <div className="mb-5 flex flex-col gap-1.5">
                {[
                    { stars: 5, pct: 88 },
                    { stars: 4, pct: 9 },
                    { stars: 3, pct: 2 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 0 },
                ].map((r) => (
                    <div key={r.stars} className="flex items-center gap-2">
                        <span className="w-4 text-right text-[11px] text-zinc-400 dark:text-zinc-600">
                            {r.stars}
                        </span>
                        <span className="text-[11px] text-amber-400">★</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                            <div
                                className="h-full rounded-full bg-amber-400"
                                style={{ width: `${r.pct}%` }}
                            />
                        </div>
                        <span className="w-7 text-[11px] text-zinc-400 dark:text-zinc-600">
                            {r.pct}%
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Review;

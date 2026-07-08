function CounselorCardSkeleton({ delay = 0 }: { delay?: number }) {
    return (
        <div
            className="skeleton-breathe rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Baris 1: Foto + Info + Tombol */}
            <div className="flex items-start gap-3.5">
                <div className="h-12 w-12 flex-shrink-0 animate-pulse rounded-xl bg-muted" />
                <div className="min-w-0 flex-1 space-y-2 py-0.5">
                    <div className="h-3.5 w-2/3 animate-pulse rounded-full bg-muted" />
                    <div className="h-3 w-1/3 animate-pulse rounded-full bg-muted/70" />
                </div>
                <div className="h-8 w-24 flex-shrink-0 animate-pulse rounded-full bg-muted" />
            </div>

            {/* Baris 2: Rating */}
            <div className="mt-3 flex items-center gap-2">
                <div className="h-3.5 w-24 animate-pulse rounded-full bg-muted/70" />
                <div className="h-3.5 w-16 animate-pulse rounded-full bg-muted/50" />
            </div>

            {/* Baris 3: Kategori */}
            <div className="mt-3 flex flex-wrap gap-1.5">
                <div className="h-6 w-16 animate-pulse rounded-full bg-primary/8" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-primary/8" />
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-border" />

            {/* Baris 4: Jadwal + Harga */}
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 space-y-1.5">
                    <div className="h-2.5 w-20 animate-pulse rounded-full bg-muted/60" />
                    <div className="h-4 w-32 animate-pulse rounded-full bg-muted" />
                </div>
                <div className="flex-shrink-0 space-y-1.5 text-right">
                    <div className="ml-auto h-2.5 w-12 animate-pulse rounded-full bg-muted/60" />
                    <div className="ml-auto h-5 w-20 animate-pulse rounded-full bg-muted" />
                </div>
            </div>
        </div>
    );
}

type Props = {
    count?: number;
};

// Skeleton grid tampil sambil data asli di-fetch. Kartu "bernapas" pelan &
// bergantian (bukan shimmer serentak) — biar nuansa loading-nya ikut tenang,
// selaras sama tema konseling, bukan berkesan buru-buru.
function CounselorGridSkeleton({ count = 6 }: Props) {
    return (
        <>
            <style>{`
                @keyframes skeleton-breathe {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
                .skeleton-breathe {
                    animation: skeleton-breathe 2.6s ease-in-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .skeleton-breathe { animation: none; opacity: 0.85; }
                }
            `}</style>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }).map((_, index) => (
                    <CounselorCardSkeleton key={index} delay={index * 220} />
                ))}
            </div>
        </>
    );
}

export default CounselorGridSkeleton;

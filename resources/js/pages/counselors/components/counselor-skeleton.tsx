function CounselorCardSkeleton({ delay = 0 }: { delay?: number }) {
    return (
        <div
            className="skeleton-breathe relative overflow-hidden rounded-[28px] border border-border/60 bg-card p-6 shadow-sm"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Foto + Info */}
            <div className="flex items-start gap-3.5">
                <div className="h-14 w-14 flex-shrink-0 animate-pulse rounded-2xl bg-muted" />
                <div className="min-w-0 flex-1 space-y-2 pt-1.5">
                    <div className="h-3.5 w-2/3 animate-pulse rounded-full bg-muted" />
                    <div className="h-3 w-1/3 animate-pulse rounded-full bg-muted/70" />
                </div>
            </div>

            {/* Rating */}
            <div className="mt-3 h-3.5 w-28 animate-pulse rounded-full bg-muted/70" />

            {/* Kategori */}
            <div className="mt-3 flex flex-wrap gap-1.5">
                <div className="h-6 w-16 animate-pulse rounded-full bg-primary/8" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-primary/8" />
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-border" />

            {/* Jadwal + Harga */}
            <div className="flex items-end justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="h-2.5 w-20 animate-pulse rounded-full bg-muted/60" />
                    <div className="h-6 w-36 animate-pulse rounded-full bg-muted" />
                </div>
                <div className="flex-shrink-0 space-y-1.5 text-right">
                    <div className="ml-auto h-2.5 w-12 animate-pulse rounded-full bg-muted/60" />
                    <div className="ml-auto h-6 w-16 animate-pulse rounded-full bg-muted" />
                </div>
            </div>

            {/* CTA bar */}
            <div className="mt-5 h-11 w-full animate-pulse rounded-full bg-muted" />
        </div>
    );
}

type Props = {
    count?: number;
};

// Skeleton grid tampil pas first load (demo) DAN pas ganti kategori/search
// beneran (dipicu isLoading dari Filter via router.get onStart/onFinish).
// Kartu "bernapas" pelan & bergantian per kartu, bukan shimmer serentak —
// biar loading state-nya kerasa tenang, selaras tema web konseling.
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

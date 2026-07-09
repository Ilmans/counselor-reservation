function ReviewCardSkeleton({ delay = 0 }: { delay?: number }) {
    return (
        <div
            className="skeleton-breathe rounded-2xl border border-border/60 bg-card p-5"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                    <div className="h-3.5 w-28 animate-pulse rounded-full bg-muted" />
                    <div className="h-3 w-20 animate-pulse rounded-full bg-muted/70" />
                </div>
                <div className="h-3.5 w-20 animate-pulse rounded-full bg-muted/70" />
            </div>
            <div className="mt-3 space-y-1.5">
                <div className="h-3 w-full animate-pulse rounded-full bg-muted/70" />
                <div className="h-3 w-2/3 animate-pulse rounded-full bg-muted/70" />
            </div>
        </div>
    );
}

type Props = {
    count?: number;
};

function ReviewListSkeleton({ count = 3 }: Props) {
    return (
        <>
            <style>{`
                @keyframes skeleton-breathe {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
                .skeleton-breathe { animation: skeleton-breathe 2.6s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .skeleton-breathe { animation: none; opacity: 0.85; }
                }
            `}</style>
            <div className="space-y-3">
                {Array.from({ length: count }).map((_, index) => (
                    <ReviewCardSkeleton key={index} delay={index * 200} />
                ))}
            </div>
        </>
    );
}

export default ReviewListSkeleton;

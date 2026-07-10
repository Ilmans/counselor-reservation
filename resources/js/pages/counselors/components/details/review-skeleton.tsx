function ReviewCardSkeleton() {
    return (
        <div className="py-5 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                    <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-20 animate-pulse rounded bg-muted/70" />
                </div>
                <div className="h-3.5 w-20 animate-pulse rounded bg-muted/70" />
            </div>
            <div className="mt-3 space-y-1.5">
                <div className="h-3 w-full animate-pulse rounded bg-muted/70" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted/70" />
            </div>
        </div>
    );
}

type Props = {
    count?: number;
};

function ReviewListSkeleton({ count = 3 }: Props) {
    return (
        <div className="rounded-lg border border-border bg-card p-6">
            <div className="divide-y divide-border">
                {Array.from({ length: count }).map((_, index) => (
                    <ReviewCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}

export default ReviewListSkeleton;

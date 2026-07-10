import type { RatingBreakdown } from '@/types/review';

type Props = {
    rating: number;
    totalReviews: number;
    breakdown: RatingBreakdown;
};

function ReviewSummary({ rating, totalReviews, breakdown }: Props) {
    const stars = [5, 4, 3, 2, 1];


    return (
        <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-lg font-normal text-foreground">
                Ulasan
            </h2>

            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex flex-shrink-0 flex-col border-b border-border pb-4 sm:border-r sm:border-b-0 sm:pr-6 sm:pb-0">
                    <span className="text-3xl font-semibold text-foreground">
                        {rating.toFixed(1)}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">
                        dari {totalReviews} ulasan
                    </span>
                </div>

                <div className="flex-1 space-y-1.5">
                    {stars.map((star) => {
                        const count = breakdown[star] ?? 0;
                        const percentage =
                            totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                        return (
                            <div key={star} className="flex items-center gap-2">
                                <span className="w-14 flex-shrink-0 text-xs text-muted-foreground">
                                    {star} bintang
                                </span>
                                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="w-6 flex-shrink-0 text-right text-xs text-muted-foreground">
                                    {count}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ReviewSummary;

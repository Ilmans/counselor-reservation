import type { Review } from '@/types/review';

type Props = {
    review: Review;
};

function ReviewStars({ rating }: { rating: number }) {
    return (
        <div className="flex flex-shrink-0 items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
                <svg
                    key={index}
                    viewBox="0 0 20 20"
                    fill={index < rating ? 'currentColor' : 'none'}
                    className="h-3.5 w-3.5 text-primary"
                >
                    <path
                        d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6L10 1.5z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                    />
                </svg>
            ))}
        </div>
    );
}

function ReviewCard({ review }: Props) {
    return (
        <div className="py-5 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                        {review.client_name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {review.created_at}
                    </p>
                </div>
                <ReviewStars rating={review.rating} />
            </div>
            {review.comment && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {review.comment}
                </p>
            )}
        </div>
    );
}

export default ReviewCard;

import { InfiniteScroll } from '@inertiajs/react';
import { useRef } from 'react';

import type { Paginated } from '@/types/counselor';
import type { Review } from '@/types/review';
import ReviewCard from './review-card';
import ReviewListSkeleton from './reveiw-skeleton';


type Props = {
    reviews: Paginated<Review>;
    isLoading?: boolean;
};

function ReviewList({ reviews, isLoading = false }: Props) {
    const infiniteRef = useRef<any>(null);

    if (isLoading) {
        return <ReviewListSkeleton count={3} />;
    }

    if (reviews.data.length === 0) {
        return (
            <div className="rounded-[28px] border border-dashed border-border py-14 text-center">
                <p className="text-sm text-muted-foreground">
                    Belum ada ulasan untuk konselor ini.
                </p>
            </div>
        );
    }

    return (
        <div>
            <InfiniteScroll
                ref={infiniteRef}
                data="reviews"
                manual={true}
                preserveUrl={true}
                className="space-y-3"
            >
                {reviews.data.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </InfiniteScroll>

            {reviews.current_page < reviews.last_page && (
                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={() => infiniteRef.current?.fetchNext()}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                        Muat ulasan lainnya
                        <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            className="h-3.5 w-3.5"
                        >
                            <path
                                d="M4 6l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ReviewList;

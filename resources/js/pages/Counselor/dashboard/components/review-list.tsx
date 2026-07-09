import { Star } from 'lucide-react';
import type { ReviewItem } from '../type';

interface Props {
    reviews: ReviewItem[];
    averageRating: number;
    totalReviews: number;
}

function ReviewList({ reviews, averageRating, totalReviews }: Props) {
    return (
        <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                        Umpan Balik
                    </p>
                    <h2
                        className="text-lg"
                        style={{ fontFamily: "'Fraunces', serif" }}
                    >
                        Ulasan Terbaru
                    </h2>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                    <Star size={11} fill="currentColor" />
                    {averageRating}
                </span>
            </div>

            {reviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    Belum ada ulasan masuk.
                </p>
            ) : (
                <div className="space-y-4">
                    {reviews.map((r, i) => (
                        <div
                            key={i}
                            className={
                                i < reviews.length - 1
                                    ? 'border-b border-border pb-4'
                                    : ''
                            }
                        >
                            <div className="mb-1.5 flex items-center justify-between gap-2">
                                <p className="truncate text-sm font-medium">
                                    {r.is_anonymous ? 'Klien Anonim' : r.name}
                                </p>
                                <div className="flex shrink-0 items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, s) => (
                                        <Star
                                            key={s}
                                            size={12}
                                            className={
                                                s < r.rating
                                                    ? 'fill-primary text-primary'
                                                    : 'text-muted-foreground/30'
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="mb-1.5 text-xs leading-relaxed text-muted-foreground">
                                {r.comment}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                                {r.when}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ReviewList;

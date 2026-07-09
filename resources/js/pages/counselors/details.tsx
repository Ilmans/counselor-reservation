import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import Wrapper from '@/layouts/wrapper';
import type { CounselorDetail, Paginated } from '@/types/counselor';
import type { RatingBreakdown, Review } from '@/types/review';
import CounselorHero from './components/details/counselor-hero';
import CounselorAbout from './components/details/counselor-about';
import ReviewSummary from './components/details/review-summary';
import ReviewList from './components/details/review-list';
import CounselorSchedule from './components/details/counselor-schedule';


type Props = {
    counselor: CounselorDetail;
    reviews: Paginated<Review>;
    rating_breakdown: RatingBreakdown;
};

export default function Details({
    counselor,
    reviews,
    rating_breakdown,
}: Props) {
    // Sama kayak halaman list: fake delay 900ms cuma buat nunjukin visual
    // skeleton di seksi ulasan pas first load (demo).
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoadingReviews(false), 900);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head title={counselor.name} />

            <CounselorHero counselor={counselor} />

            <div className="px-6 pb-20">
                <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-6">
                        <CounselorAbout counselor={counselor} />
                        <ReviewSummary
                            rating={counselor.rating}
                            totalReviews={counselor.total_reviews}
                            breakdown={rating_breakdown}
                        />
                        <ReviewList
                            reviews={reviews}
                            isLoading={isLoadingReviews}
                        />
                    </div>

                    <div className="space-y-6">
                        <CounselorSchedule schedules={counselor.schedules} />
                    </div>
                </div>
            </div>
        </>
    );
}

Details.layout = (page: ReactNode) => <Wrapper main={page} />;

import { Link } from '@inertiajs/react';
import CounselorController from '@/actions/App/Http/Controllers/CounselorController';
import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import type { Category, Counselor } from '@/types/counselor';
import { counselorPricingLabel } from '@/utils/helper';
import {
    formatTimeRange,
    getScheduleLabel,
    METHOD_LABEL,
    METHOD_VARIANT,
} from '@/utils/schedule';

type Props = {
    counselor: Counselor;
};

function CounselorCard({ counselor }: Props) {
    const priceLabel = counselorPricingLabel(
        counselor.pricing_type,
        counselor.price_per_hour,
    );
    const isFree = counselor.pricing_type === 'free';

    return (
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
            {/* Baris 1: Foto + Info + Tombol */}
            <div className="flex items-start gap-3.5">
                <img
                    src={counselor.photo_url}
                    alt={counselor.name}
                    className="h-12 w-12 flex-shrink-0 rounded-xl object-cover"
                    onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(counselor.name)}`;
                    }}
                />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-foreground">
                        {counselor.name}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {counselor.specialization?.name ?? '—'}
                    </p>
                </div>
                <Link
                    href={
                        CounselorController.details().url + `/${counselor.slug}`
                    }
                    className="flex-shrink-0"
                >
                    <Button as="link" size="sm" mode="filled" as="span">
                        Lihat Profil
                    </Button>
                </Link>
            </div>

            {/* Baris 2: Rating */}
            <Rating
                totalSessions={counselor.consultations_count}
                rating={counselor.feedbacks_avg_rating}
            />

            {/* Baris 3: Kategori */}
            <div className="mt-3 flex flex-wrap gap-1.5">
                {counselor.categories.map((category: Category) => (
                    <span
                        key={category.id}
                        className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                        {category.name}
                    </span>
                ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-border" />

            {/* Baris 4: Jadwal + Harga (dua kolom bersih) */}
            <div className="flex items-center justify-between gap-4">
                {/* Jadwal terdekat */}
                <div className="min-w-0">
                    <p className="mb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
                        Jadwal Terdekat
                    </p>
                    {counselor.next_schedule ? (
                        <div className="flex items-center gap-2">
                            <span className="pulse-dot h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                            <span className="text-sm text-muted-foreground">
                                {getScheduleLabel(counselor.next_schedule)},{' '}
                                {formatTimeRange(
                                    counselor.next_schedule.open_time,
                                    counselor.next_schedule.close_time,
                                )}
                            </span>
                            <Button
                                as="span"
                                size="sm"
                                mode="outlined"
                                variant={
                                    METHOD_VARIANT[
                                        counselor.next_schedule.method
                                    ]
                                }
                                hoverable={false}
                                className="flex-shrink-0"
                            >
                                {METHOD_LABEL[counselor.next_schedule.method]}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-muted-foreground/30" />
                            <span className="text-sm text-muted-foreground/70">
                                Tidak ada jadwal
                            </span>
                        </div>
                    )}
                </div>

                {/* Harga */}
                <div className="flex-shrink-0 text-right">
                    <p className="mb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
                        Biaya
                    </p>
                    {isFree ? (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
                            {priceLabel}
                        </span>
                    ) : (
                        <span className="text-sm font-semibold text-foreground">
                            {priceLabel}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CounselorCard;

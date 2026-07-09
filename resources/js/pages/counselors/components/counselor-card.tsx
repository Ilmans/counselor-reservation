import { Link } from '@inertiajs/react';
import CounselorController from '@/actions/App/Http/Controllers/CounselorController';
import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import type { CounselorList } from '@/types/counselor';
import { METHOD_VARIANT } from '@/utils/schedule';

type Props = {
    counselor: CounselorList;
};

function CounselorCard({ counselor }: Props) {
    const isFree = counselor.pricing_type === 'free';

    return (
        <div className="group relative overflow-hidden rounded-[28px] border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-xl">
            {/* ambient hover glow — signature motif yang sama dipakai di hero & skeleton */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/10"
            />

            <div className="relative">
                {/* Foto + Info */}
                <div className="flex items-start gap-3.5">
                    <img
                        loading="lazy"
                        src={counselor.photo}
                        alt={counselor.name}
                        className="h-14 w-14 flex-shrink-0 rounded-2xl object-cover ring-1 ring-border/50 transition-all duration-300 group-hover:ring-primary/30"
                    />
                    <div className="min-w-0 flex-1 pt-0.5">
                        <p className="truncate text-base font-semibold text-foreground">
                            {counselor.name}
                        </p>
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">
                            {counselor.specialization ?? '—'}
                        </p>
                    </div>
                </div>

                {/* Rating */}
                <div className="mt-3">
                    <Rating
                        totalSessions={counselor.consultations_count}
                        rating={counselor.feedbacks_avg_rating}
                    />
                </div>

                {/* Kategori */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {counselor.categories.split(',').map((category, index) => (
                        <span
                            key={index}
                            className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary"
                        >
                            {category.trim()}
                        </span>
                    ))}
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-border" />

                {/* Jadwal + Harga */}
                <div className="flex items-end justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="mb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
                            Jadwal Terdekat
                        </p>
                        {counselor.next_schedule ? (
                            <div className="flex flex-wrap items-center gap-1.5">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground">
                                    <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                                        <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                                    </span>
                                    {counselor.next_schedule.day_label},{' '}
                                    {counselor.next_schedule.open_time}–
                                    {counselor.next_schedule.close_time}
                                </span>
                                {/* Button dipertahankan di sini karena warnanya nempel ke
                                    METHOD_VARIANT project lo — kalau mau full custom juga,
                                    tinggal bilang. */}
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
                                >
                                    {counselor.next_schedule.method_label}
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                                <span className="text-xs text-muted-foreground/70">
                                    Tidak ada jadwal
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex-shrink-0 text-right">
                        <p className="mb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
                            Biaya
                        </p>
                        {isFree ? (
                            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                                {counselor.price_per_hour}
                            </span>
                        ) : (
                            <span className="text-sm font-semibold text-foreground">
                                {counselor.price_per_hour}
                            </span>
                        )}
                    </div>
                </div>

                {/* CTA — full custom, bukan pakai Button component */}
                <Link
                    href={
                        CounselorController.details().url + `/${counselor.slug}`
                    }
                    className="group/btn mt-5 flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground py-3 text-sm font-semibold text-background transition-all duration-300 hover:gap-2.5 hover:bg-primary"
                >
                    Lihat Profil
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                    >
                        <path
                            d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default CounselorCard;

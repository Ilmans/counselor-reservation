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
    return (
        <div className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm ring-1 ring-transparent transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:ring-primary/10">
            {/* Baris 1: Foto + Info + Tombol */}
            <div className="flex items-start gap-3.5">
                <img
                    loading="lazy"
                    src={counselor.photo}
                    alt={counselor.name}
                    className="h-12 w-12 flex-shrink-0 rounded-xl object-cover ring-1 ring-border/60 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-semibold text-foreground">
                        {counselor.name}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {counselor.specialization ?? '—'}
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

            {/* Baris 4: Jadwal + Harga (dua kolom bersih) */}
            <div className="flex items-center justify-between gap-4">
                {/* Jadwal terdekat */}
                <div className="min-w-0">
                    <p className="mb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
                        Jadwal Terdekat
                    </p>
                    {counselor.next_schedule ? (
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2 flex-shrink-0">
                                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                            </span>
                            <span className="truncate text-sm text-muted-foreground">
                                {counselor.next_schedule.day_label},{' '}
                                {counselor.next_schedule.open_time} {'-'}{' '}
                                {counselor.next_schedule.close_time}
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
                                {counselor.next_schedule.method_label}
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
                    {counselor.pricing_type == 'free' ? (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
                            {counselor.price_per_hour}
                        </span>
                    ) : (
                        <span className="text-sm font-semibold text-foreground">
                            {counselor.price_per_hour}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CounselorCard;

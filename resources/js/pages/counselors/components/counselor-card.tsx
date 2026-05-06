import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import type { Category, Counselor } from '@/types/counselor';
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
    const priceLabel =
        counselor.pricing_type === 'free'
            ? 'Gratis'
            : 'Rp ' +
              parseInt(counselor.price_per_hour, 10).toLocaleString('id-ID') +
              '/jam';

    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-5 transition-[border-color,background] duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#111113] dark:hover:border-zinc-700/40 dark:hover:bg-zinc-800/70">
            {/* Baris 1: Foto + Info + Tombol */}
            <div className="flex items-start gap-3">
                <img
                    src={counselor.photo_url}
                    alt={counselor.name}
                    className="h-11 w-11 flex-shrink-0 rounded-xl object-cover"
                    onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(counselor.name)}`;
                    }}
                />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {counselor.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-zinc-500">
                        {counselor.specialization?.name ?? '—'}
                    </p>
                </div>
                <Link className="flex-shrink-0">
                    <Button size="sm" mode="outlined" as="span">
                        Lihat Profil
                    </Button>
                </Link>
            </div>

            {/* Baris 2: Rating */}
            <div className="mt-3 flex items-center gap-1">
                <span className="text-xs text-amber-400">★★★★★</span>
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    4.9
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600">
                    &nbsp;· 127 sesi
                </span>
            </div>

            {/* Baris 3: Kategori */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
                {counselor.categories.map((category: Category) => (
                    <span
                        key={category.id}
                        className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500"
                    >
                        {category.name}
                    </span>
                ))}
            </div>

            {/* Divider */}
            <div className="my-3 border-t border-zinc-100 dark:border-zinc-800" />

            {/* Baris 4: Jadwal + Harga (dua kolom bersih) */}
            <div className="flex items-center justify-between gap-4">
                {/* Jadwal terdekat */}
                <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-medium tracking-wide text-zinc-400 uppercase dark:text-zinc-600">
                        Jadwal Terdekat
                    </p>
                    {counselor.next_schedule ? (
                        <div className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400 shadow-[0_0_6px_#4ade8088]" />
                            <span className="text-xs text-zinc-600 dark:text-zinc-400">
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
                        <div className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                            <span className="text-xs text-zinc-400 dark:text-zinc-600">
                                Tidak ada jadwal
                            </span>
                        </div>
                    )}
                </div>

                {/* Harga */}
                <div className="flex-shrink-0 text-right">
                    <p className="mb-1 text-[10px] font-medium tracking-wide text-zinc-400 uppercase dark:text-zinc-600">
                        Biaya
                    </p>
                    <span
                        className={`text-xs font-semibold ${
                            counselor.pricing_type === 'free'
                                ? 'text-green-500'
                                : 'text-zinc-800 dark:text-zinc-200'
                        }`}
                    >
                        {priceLabel}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CounselorCard;

import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import type { CounselorDetailPage } from '@/types/counselor';
import { counselorPricingLabel } from '@/utils/helper';
import { getScheduleLabel } from '@/utils/schedule';

function StatBox({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center gap-0.5 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            <span className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
                {value}
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                {label}
            </span>
        </div>
    );
}
type Props = {
    counselor: CounselorDetailPage;
};
function MainProfileCard({ counselor }: Props) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800/80 dark:bg-[#111113]">
            {/* Avatar */}
            <div className="mb-4 flex flex-col items-center text-center">
                <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-2xl font-semibold text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400">
                    AS
                </div>
                <h1 className="font-serif text-xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                    {counselor.name}
                </h1>
                <p className="mt-0.5 text-[13px] text-zinc-500">
                    {counselor.specialization?.name}
                </p>

                {/* Rating inline */}
                <Rating
                    rating={counselor.feedbacks_avg_rating}
                    totalSessions={counselor.consultations_count}
                />
                {/* Availability badge */}
                <div className="mt-3 flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade8088]" />
                    <span className="text-[12px] text-zinc-500 dark:text-zinc-500">
                        Jadwal Terdekat :{' '}
                        {getScheduleLabel(counselor.next_schedule)}
                    </span>
                </div>
            </div>

            <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-800" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
                <StatBox value="127" label="Sesi" />
                <StatBox value="5th" label="Tahun" />
                <StatBox value="98%" label="Respons" />
            </div>

            <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-800" />

            {/* Price */}
            <div className="flex items-center justify-between">
                <span className="text-[12px] text-zinc-500 dark:text-zinc-500">
                    Harga per sesi
                </span>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {counselorPricingLabel(
                        counselor.pricing_type,
                        counselor.price_per_hour,
                    )}
                </span>
            </div>

            {/* Session modes */}
            <div className="mt-2 flex items-center justify-between">
                <span className="text-[12px] text-zinc-500 dark:text-zinc-500">
                    Mode sesi
                </span>
                <div className="flex gap-1">
                    {counselor.next_schedule.method == 'online' && (
                        <Button
                            className="rounded-sm px-4 font-semibold"
                            mode="outlined"
                            variant="green"
                            size="sm"
                        >
                            Online
                        </Button>
                    )}
                    {counselor.next_schedule.method == 'offline' && (
                        <Button
                            className="rounded-sm px-4 font-semibold"
                            mode="outlined"
                            variant="red"
                            size="sm"
                        >
                            Offline
                        </Button>
                    )}
                    {counselor.next_schedule.method == 'both' && (
                        <>
                            <Button
                                className="rounded-sm px-4 font-semibold"
                                mode="outlined"
                                variant="green"
                                size="sm"
                            >
                                Online
                            </Button>
                            <Button
                                className="rounded-sm px-4 font-semibold"
                                mode="outlined"
                                variant="red"
                                size="sm"
                            >
                                Offline
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-800" />

            {/* CTA */}
            <button className="w-full rounded-lg bg-zinc-900 py-2.5 text-[13px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                Reservasi Sesi
            </button>
        </div>
    );
}

export default MainProfileCard;

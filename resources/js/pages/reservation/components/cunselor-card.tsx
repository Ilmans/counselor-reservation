import Rating from '@/components/rating';
import type { CounselorDetailPage } from '@/types/counselor';

type Props = {
    counselor: CounselorDetailPage;
};

function CounselorCard({ counselor }: Props) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[13px] font-semibold text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400">
                    xx
                </div>
                <div>
                    <p className="text-[14px] font-medium text-zinc-900 dark:text-zinc-100">
                        {counselor.name}
                    </p>

                    <Rating
                        rating={counselor.feedbacks_avg_rating}
                        totalSessions={counselor.consultations_count}
                    />
                </div>
            </div>

            <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-800" />

            <div className="flex flex-wrap gap-1.5">
                {counselor.categories.map((t) => (
                    <span
                        key={t.id}
                        className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500"
                    >
                        {t.name}
                    </span>
                ))}
            </div>

            {/* Ringkasan — tampil jika sudah pilih */}
        </div>
    );
}

export default CounselorCard;

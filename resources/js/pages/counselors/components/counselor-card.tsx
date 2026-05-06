import type { Category, Counselor } from '@/types/counselor';

type Props = {
    counselor: Counselor;
};
function CounselorCard({ counselor }: Props) {
    return (
        <>
            <div className="cursor-pointer rounded-xl border border-zinc-200 bg-white p-5 transition-[border-color,background] duration-200 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800/80 dark:bg-[#111113] dark:hover:border-zinc-700/40 dark:hover:bg-zinc-800/70">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[15px] font-semibold text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400">
                        AS
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-sm leading-tight font-medium text-zinc-900 dark:text-zinc-100">
                                    {counselor.name}
                                </p>
                                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                                    {counselor.specialization?.name}
                                </p>
                            </div>
                            <button className="flex-shrink-0 rounded-lg bg-zinc-900 px-4 py-1.5 text-[12px] font-medium whitespace-nowrap text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                Reservasi
                            </button>
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                            <span className="text-xs text-amber-400">
                                ★★★★★
                            </span>
                            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                                4.9
                            </span>
                            <span className="ml-1 text-xs text-zinc-400 dark:text-zinc-600">
                                · 127 sesi
                            </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {counselor.categories.map((category: Category) => (
                                <span
                                    key={category.id}
                                    className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                            <div className="flex items-center gap-2">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade8088]" />
                                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                                    Tersedia hari ini
                                </span>
                            </div>
                            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                Rp 250.000
                                <span className="font-normal text-zinc-400 dark:text-zinc-600">
                                    /sesi
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CounselorCard;

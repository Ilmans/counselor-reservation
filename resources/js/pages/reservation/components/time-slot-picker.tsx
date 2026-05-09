import { formatDateLabel } from '@/utils/helper';

type Props = {
    date: string;
    slots: string[];
    bookedTimes: string[];
    selected: string | null;
    onSelect: (slot: string) => void;
};

export default function TimeSlotPicker({
    date,
    slots,
    bookedTimes,
    selected,
    onSelect,
}: Props) {
    const bookedSet = new Set(bookedTimes);

    return (
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
            <p className="text-[10px] font-medium tracking-[0.08em] text-zinc-400 uppercase dark:text-zinc-600">
                Pilih Jam
            </p>
            <p className="mt-0.5 mb-4 text-[12px] text-zinc-500">
                {formatDateLabel(date)}
            </p>

            {slots.length === 0 ? (
                <p className="text-[12px] text-zinc-400">
                    Tidak ada slot tersedia di tanggal ini.
                </p>
            ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slots.map((slot) => {
                        const isBooked = bookedSet.has(slot);
                        const isSelected = selected === slot;

                        return (
                            <button
                                key={slot}
                                disabled={isBooked}
                                onClick={() => onSelect(slot)}
                                className={[
                                    'flex flex-col items-center gap-1 rounded-xl border py-3 transition-colors',
                                    isBooked
                                        ? 'cursor-not-allowed border-zinc-100 bg-zinc-50 dark:border-zinc-800/50 dark:bg-zinc-900/20'
                                        : isSelected
                                          ? 'border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100'
                                          : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#111113]',
                                ].join(' ')}
                            >
                                <span
                                    className={`text-[13px] font-semibold ${
                                        isBooked
                                            ? 'text-zinc-300 dark:text-zinc-700'
                                            : isSelected
                                              ? 'text-white dark:text-zinc-900'
                                              : 'text-zinc-700 dark:text-zinc-300'
                                    }`}
                                >
                                    {slot}
                                </span>
                                <div className="flex items-center gap-1">
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${
                                            isBooked
                                                ? 'bg-zinc-300 dark:bg-zinc-700'
                                                : isSelected
                                                  ? 'bg-white dark:bg-zinc-900'
                                                  : 'bg-emerald-400'
                                        }`}
                                    />
                                    <span
                                        className={`text-[10px] ${
                                            isBooked
                                                ? 'text-zinc-300 dark:text-zinc-700'
                                                : isSelected
                                                  ? 'text-zinc-400 dark:text-zinc-600'
                                                  : 'text-emerald-500'
                                        }`}
                                    >
                                        {isBooked ? 'penuh' : 'tersedia'}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

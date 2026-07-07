import type { TimeSlot } from '@/types/schedule';
import { formatDateLabel } from '@/utils/helper';

type Props = {
    date: string;
    slots: TimeSlot[];
    selected: string | null;
    onSelect: (slot: string) => void;
};

export default function TimeSlotPicker({
    date,
    slots,
    selected,
    onSelect,
}: Props) {


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
                        const isAvail = slot.enabled
                        const isSelected = selected === slot.time;

                        return (
                            <button
                                key={slot.time}
                                disabled={!isAvail}
                                onClick={() => onSelect(slot.time)}
                                className={[
                                    'flex flex-col  items-center gap-1 rounded-xl border py-3 transition-colors',
                                    !isAvail
                                        ? 'cursor-not-allowed border-zinc-100 bg-zinc-50 dark:border-zinc-800/50 dark:bg-zinc-900/20'
                                        : isSelected
                                          ? 'border-zinc-900 cursor-pointer bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100'
                                          : 'border-zinc-200 cursor-pointer bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#111113]',
                                ].join(' ')}
                            >
                                <span
                                    className={`text-[13px] font-semibold ${
                                        !isAvail
                                            ? 'text-zinc-300 dark:text-zinc-700'
                                            : isSelected
                                              ? 'text-white dark:text-zinc-900'
                                              : 'text-zinc-700 dark:text-zinc-300'
                                    }`}
                                >
                                    {slot.time}
                                </span>
                                <div className="flex items-center gap-1">
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${
                                            !isAvail
                                                ? 'bg-zinc-300 dark:bg-zinc-700'
                                                : isSelected
                                                  ? 'bg-white dark:bg-zinc-900'
                                                  : 'bg-emerald-400'
                                        }`}
                                    />
                                    <span
                                        className={`text-[10px] ${
                                            !isAvail
                                                ? 'text-zinc-300 dark:text-zinc-700'
                                                : isSelected
                                                  ? 'text-zinc-400 dark:text-zinc-600'
                                                  : 'text-emerald-500'
                                        }`}
                                    >
                                        {!isAvail ? slot.reason : "Tersedia"}
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

import { useMemo } from 'react';

import type {  ScheduleOverview } from '@/types/schedule';
import { DAY_NAMES } from '@/utils/constant';
import { buildCalendarWeeks, buildMonthLabel, toDateStr } from '@/utils/helper';

type Props = {
    overview: ScheduleOverview;
    selectedDate: string | null;
    onSelect: (date: string) => void;
};

export default function CalendarPicker({
    overview,
    selectedDate,
    onSelect,
}: Props) {

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);

        return d;
    }, []);

    const availableDates = useMemo(
        () => new Set(Object.keys(overview.avaibility)),
        [overview.avaibility],
    );

    const { weeks, monthLabel, rangeStart, rangeEnd } = useMemo(() => {
        if (!Object.keys(overview.avaibility).length) {
            return {
                weeks: [],
                monthLabel: '',
                rangeStart: overview.startDate,
                rangeEnd: overview.endDate,
            };
        }


        const start = new Date(overview.startDate);
        const end = new Date(overview.endDate);

        return {
            weeks: buildCalendarWeeks(start, end),
            monthLabel: buildMonthLabel(start, end),
            rangeStart: start,
            rangeEnd: end,
        };
    }, [overview.avaibility]);

    return (
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-medium tracking-[0.08em] text-zinc-400 uppercase dark:text-zinc-600">
                        Pilih Tanggal
                    </p>
                    <p className="mt-0.5 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                        {monthLabel}
                    </p>
                </div>
                <span className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800">
                    3 minggu ke depan
                </span>
            </div>

            {/* day  */}
            <div className="mb-1 grid grid-cols-7 text-center">
                {DAY_NAMES.map((d) => (
                    <div
                        key={d}
                        className="py-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-600"
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* Grid tanggal */}
            <div className="flex flex-col gap-1">
                {weeks.map((week, wi) => (
                    <div key={wi} className="grid grid-cols-7 gap-1">
                        {week.map((date, di) => {
                            const dateStr = toDateStr(date);
                            const percentage =
                                overview.avaibility[dateStr]?.percentage;
                            const pct = Number(percentage);

                            const inRange =
                                rangeStart &&
                                rangeEnd &&
                                date >= rangeStart &&
                                date <= rangeEnd;
                            const isAvail =
                                availableDates.has(dateStr) && date >= today;
                            const isFull = isAvail && (percentage ?? 0) >= 100;
                            const isSelected = selectedDate === dateStr;
                            const isToday =
                                date.toDateString() === today.toDateString();

                            return (
                                <button
                                    key={di}
                                    disabled={!isAvail || isFull}
                                    onClick={() => onSelect(dateStr)}
                                    className={[
                                        'relative flex h-9 w-full flex-col items-center justify-center rounded-lg text-[12px] font-medium transition-colors',
                                        !inRange
                                            ? 'pointer-events-none invisible'
                                            : '',
                                        isSelected
                                            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                            : isFull || !isAvail
                                              ? 'cursor-not-allowed text-zinc-300 dark:text-zinc-700'
                                              : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
                                    ].join(' ')}
                                >
                                    <span
                                        className={
                                            isToday && !isSelected
                                                ? 'font-bold underline underline-offset-2'
                                                : ''
                                        }
                                    >
                                        {date.getDate()}
                                    </span>

                                    {isAvail && !isSelected && (
                                        <span
                                            className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                                                pct >= 100
                                                    ? 'bg-red-400'
                                                    : pct >= 50
                                                      ? 'bg-yellow-400'
                                                      : 'bg-emerald-400'
                                            }`}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-3 flex items-center gap-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                {[
                    { color: 'bg-emerald-400', label: 'Tersedia' },
                    { color: 'bg-red-400', label: 'Penuh' },
                ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                        <span className="text-[10px] text-zinc-400">
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

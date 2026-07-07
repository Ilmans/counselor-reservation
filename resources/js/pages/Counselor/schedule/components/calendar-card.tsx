import type { CalendarData } from '../schedule-type';
import {
    METHOD_META,
    formatISODate,
    parseDateOnly,
    buildRangeGrid,
} from '../schedule-type';

interface ScheduleCalendarCardProps {
    calendar: CalendarData;
}

const WEEK_HEADER = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

const DATE_LABEL_FMT = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

export default function ScheduleCalendarCard({
    calendar,
}: ScheduleCalendarCardProps) {
    const cells = buildRangeGrid(calendar.startDate, calendar.endDate);
    const todayISO = formatISODate(new Date());

    const activeDates = Object.entries(calendar.schedule);
    const totalBookedInRange = activeDates.reduce(
        (sum, [, info]) => sum + info.totalBooked,
        0,
    );
    const activeDayCount = activeDates.length;

    const rangeLabel = `${DATE_LABEL_FMT.format(parseDateOnly(calendar.startDate))} – ${DATE_LABEL_FMT.format(
        parseDateOnly(calendar.endDate),
    )}`;

    return (
        <aside className="space-y-3 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-border bg-card p-5">
                <p className="font-serif text-base text-foreground">
                    Kalender Ketersediaan
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {rangeLabel}
                </p>

                <div className="mt-4 grid grid-cols-7 gap-y-1.5 text-center">
                    {WEEK_HEADER.map((h) => (
                        <span
                            key={h}
                            className="text-[10px] font-medium text-muted-foreground"
                        >
                            {h}
                        </span>
                    ))}

                    {cells.map((cell, i) => {
                        if (!cell) {
                            return <div key={i} />;
                        }

                        const info = calendar.schedule[cell.iso];
                        const isToday = cell.iso === todayISO;
                        const meta = info ? METHOD_META[info.method] : null;

                        return (
                            <div
                                key={cell.iso}
                                className={`flex flex-col items-center gap-0.5 rounded-lg border py-1.5 ${
                                    meta
                                        ? meta.cellActive
                                        : 'border-transparent'
                                }`}
                            >
                                <span
                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                                        isToday
                                            ? 'bg-primary font-semibold text-primary-foreground'
                                            : 'text-foreground'
                                    }`}
                                >
                                    {cell.date.getDate()}
                                </span>

                                {info ? (
                                    <span
                                        className={`min-w-[1.1rem] rounded-full px-1 text-center text-[9px] leading-tight font-semibold ${meta!.badge}`}
                                        title={`${info.totalBooked} sesi terbooking · ${meta!.label}`}
                                    >
                                        {info.totalBooked}
                                    </span>
                                ) : (
                                    <span className="h-[1.1rem]" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-border pt-3 text-[11px] text-muted-foreground">
                    {Object.entries(METHOD_META).map(([key, meta]) => (
                        <span key={key} className="flex items-center gap-1.5">
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                            />
                            {meta.label}
                        </span>
                    ))}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                    Angka pada tanggal menunjukkan jumlah sesi terbooking.
                    Tanggal tetap ditandai walau jadwal mingguan untuk hari itu
                    sudah diubah/dinonaktifkan, selama masih ada sesi yang
                    terbooking di tanggal tersebut.
                </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-medium text-muted-foreground">
                    Ringkasan {rangeLabel.split(' – ')[0]} s/d{' '}
                    {rangeLabel.split(' – ')[1]}
                </p>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-foreground">
                        Tanggal dengan jadwal
                    </span>
                    <span className="font-serif text-lg text-foreground">
                        {activeDayCount} hari
                    </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-foreground">
                        Total sesi terbooking
                    </span>
                    <span className="font-serif text-lg text-foreground">
                        {totalBookedInRange} sesi
                    </span>
                </div>
            </div>
        </aside>
    );
}

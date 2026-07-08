import { MONTH_NAMES } from './constant';

export function toDateStr(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    return `${y}-${m}-${d}`;
}

export function formatDateLabel(dateStr: string): string {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function buildCalendarWeeks(start: Date, end: Date): Date[][] {
    const gridStart = new Date(start);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());

    const gridEnd = new Date(end);
    gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));

    const weeks: Date[][] = [];
    const cur = new Date(gridStart);

    while (cur <= gridEnd) {
        const week: Date[] = [];

        for (let i = 0; i < 7; i++) {
            week.push(new Date(cur));
            cur.setDate(cur.getDate() + 1);
        }

        weeks.push(week);
    }

    return weeks;
}

export function buildMonthLabel(start: Date, end: Date): string {
    const sm = start.getMonth(),
        sy = start.getFullYear();
    const em = end.getMonth(),
        ey = end.getFullYear();

    if (sm === em && sy === ey) return `${MONTH_NAMES[sm]} ${sy}`;
    if (sy === ey) return `${MONTH_NAMES[sm]} – ${MONTH_NAMES[em]} ${sy}`;
    return `${MONTH_NAMES[sm]} ${sy} – ${MONTH_NAMES[em]} ${ey}`;
}

import { MONTH_NAMES } from "./constant";

export const counselorPricingLabel = (
    pricing_type: 'free' | 'paid',
    price_per_hour: string,
) => {
    return pricing_type === 'free'
        ? 'Gratis'
        : 'Rp ' + parseInt(price_per_hour, 10).toLocaleString('id-ID') + '/jam';
};

export function toDateStr(date: Date): string {
    return date.toISOString().split('T')[0];
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

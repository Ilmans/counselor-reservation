import { MapPin, Video } from 'lucide-react';

export type ScheduleMethod = 'online' | 'offline' | 'both';

export interface CounselorScheduleRow {
    id?: number;
    counselor_id?: number;
    day_of_week: number; // konvensi Date.getDay(): Minggu=0 ... Sabtu=6
    open_time: string; // "HH:MM:SS"
    close_time: string; // "HH:MM:SS"
    method: ScheduleMethod;
    is_active: boolean | number;
}

/** Bentuk yang enak dipakai di UI (satu baris per hari, selalu 7 hari). */
export interface DayScheduleUI {
    dow: number;
    label: string;
    active: boolean;
    open: string; // "HH:MM"
    close: string; // "HH:MM"
    method: ScheduleMethod;
}

export interface CalendarDayInfo {
    totalBooked: number;
    method: ScheduleMethod;
}

/** Bentuk `calendar` dari ScheduleService::getSimpleCounselorScheduleOverview(). */
export interface CalendarData {
    startDate: string;
    endDate: string;
    schedule: Record<string, CalendarDayInfo>;
}

export interface SchedulePageProps {
    schedules: CounselorScheduleRow[];
    calendar: CalendarData;

}

export const DAY_DEFS: { dow: number; label: string }[] = [
    { dow: 1, label: 'Senin' },
    { dow: 2, label: 'Selasa' },
    { dow: 3, label: 'Rabu' },
    { dow: 4, label: 'Kamis' },
    { dow: 5, label: 'Jumat' },
    { dow: 6, label: 'Sabtu' },
    { dow: 0, label: 'Minggu' },
];

const DEFAULT_OPEN = '09:00';
const DEFAULT_CLOSE = '17:00';
const DEFAULT_METHOD: ScheduleMethod = 'online';

export function buildWeeklySchedule(
    rows: CounselorScheduleRow[],
): DayScheduleUI[] {
    const byDow = new Map(rows.map((r) => [r.day_of_week, r]));

    return DAY_DEFS.map(({ dow, label }) => {
        const row = byDow.get(dow);

        return {
            dow,
            label,
            active: row ? Boolean(row.is_active) : false,
            open: row ? row.open_time.slice(0, 5) : DEFAULT_OPEN,
            close: row ? row.close_time.slice(0, 5) : DEFAULT_CLOSE,
            method: row ? row.method : DEFAULT_METHOD,
        };
    });
}

/** Payload yang dikirim ke endpoint update jadwal. */
export function toSchedulePayload(schedule: DayScheduleUI[]) {
    return schedule.map((d) => ({
        day_of_week: d.dow,
        open_time: d.open.length === 5 ? `${d.open}:00` : d.open,
        close_time: d.close.length === 5 ? `${d.close}:00` : d.close,
        method: d.method,
        is_active: d.active,
    }));
}

export const METHOD_META: Record<
    ScheduleMethod,
    {
        label: string;
        icon: typeof Video | null;
        dot: string;
        pillActive: string;
        cellActive: string;
        badge: string;
    }
> = {
    online: {
        label: 'Online',
        icon: Video,
        dot: 'bg-teal-500',
        pillActive:
            'border-teal-600 bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400',
        cellActive:
            'border-teal-300 bg-teal-50/70 dark:border-teal-800 dark:bg-teal-950/20',
        badge: 'bg-teal-600 text-white',
    },
    offline: {
        label: 'Tatap Muka',
        icon: MapPin,
        dot: 'bg-orange-500',
        pillActive:
            'border-orange-600 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400',
        cellActive:
            'border-orange-300 bg-orange-50/70 dark:border-orange-800 dark:bg-orange-950/20',
        badge: 'bg-orange-600 text-white',
    },
    both: {
        label: 'Online & Tatap Muka',
        icon: null,
        dot: 'bg-violet-500',
        pillActive:
            'border-violet-600 bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400',
        cellActive:
            'border-violet-300 bg-violet-50/70 dark:border-violet-800 dark:bg-violet-950/20',
        badge: 'bg-violet-600 text-white',
    },
};

/** Parse "YYYY-MM-DD" (atau ISO datetime dari Carbon) tanpa masalah timezone. */
export function parseDateOnly(iso: string): Date {
    const datePart = iso.slice(0, 10);
    const [y, m, d] = datePart.split('-').map(Number);

    return new Date(y, m - 1, d);
}

export function formatISODate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${y}-${m}-${day}`;
}

export interface RangeCell {
    date: Date;
    iso: string;
}

/** Bangun grid 7 kolom (Senin-first) dari startDate s/d endDate (inklusif). */
export function buildRangeGrid(
    startISO: string,
    endISO: string,
): (RangeCell | null)[] {
    const start = parseDateOnly(startISO);
    const end = parseDateOnly(endISO);

    const days: RangeCell[] = [];
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {

        days.push({ date: new Date(d), iso: formatISODate(d) });
    }

    const leadingOffset = (start.getDay() + 6) % 7; // Senin = kolom pertama
    const cells: (RangeCell | null)[] = [
        ...Array(leadingOffset).fill(null),
        ...days,
    ];

    while (cells.length % 7 !== 0) cells.push(null);

    return cells;
}

// utils/schedule.ts
import type { Schedule } from '@/types/counselor';



export const METHOD_VARIANT = {
    online: 'blue',
    offline: 'red',
    both: 'green',
} as const;

export const METHOD_LABEL = {
    online: 'Online',
    offline: 'Offline',
    both: 'Online & Offline',
} as const;

export function getScheduleLabel(schedule: Schedule): string {
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86_400_000)
        .toISOString()
        .slice(0, 10);

    if (schedule.date === today) {
        return 'Hari ini';
    }

    if (schedule.date === tomorrow) {
        return 'Besok';
    }

    return new Date(schedule.date).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });
}

export function formatTimeRange(open: string, close: string): string {
    return `${open.slice(0, 5)}–${close.slice(0, 5)}`;
}

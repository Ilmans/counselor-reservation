export type Method = 'online' | 'offline' | 'both';

export interface ScheduleDay {
    total: number;
    booked: number;
    booked_times: string[];
    slots: string[];
    method: Method;
    percentage: number;
}

export type AvaibilityItem = Record<string, ScheduleDay>;

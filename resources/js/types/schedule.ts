export type Method = 'online' | 'offline' | 'both';

export interface TimeSlot {
    time : string;
    enabled : boolean;
    booked : boolean;
    reason:string;
}
export interface Avaibility {
    slots: TimeSlot[];
    method: Method;
    percentage: number;
}

export interface ScheduleOverview {
    startDate: string;
    endDate: string;
    avaibility: Record<string, Avaibility>;
}

//export type AvaibilityItem = Record<string, Avaibility>;

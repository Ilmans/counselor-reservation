export type ReservationStatus =
    | 'pending_payment'
    | 'pending_confirmation'
    | 'confirmed'
    | 'in_queue'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'rejected';

export type ReservationTabKey = 'all' | 'upcoming' | 'completed' | 'cancelled';

export interface Reservation {
    id: number;
    reference: string;
    counselor_name: string;
    counselor_specialization: string;
    counselor_photo: string | null;
    date: string;
    time: string;
    duration: string;
    mode: 'Online' | 'Tatap Muka';
    price: string;
    status: ReservationStatus;
    status_label: string;
    notes: string | null;
}

export interface ReservationStats {
    total_sessions: number;
    upcoming_sessions: number;
    completed_sessions: number;
    cancelled_sessions: number;
    total_counselors: number;
}

export type InvoiceStatus = 'paid' | 'unpaid';

export interface Invoice {
    id: number;
    reference: string;
    counselor_name: string;
    date: string;
    amount: string;
    status: InvoiceStatus;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
}

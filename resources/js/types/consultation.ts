import type { Counselor } from "./counselor";
import type { Invoice } from "./invoice";


export type ConsultationStatus =
    | 'pending_confirmation'
    | 'confirmed'
    | 'in_queue'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'rejected';

export type ConsultationTabKey = 'all' | 'upcoming' | 'completed' | 'cancelled';

export interface UserMini {
    name: string;
    email: string;
    whatsapp: string;
}

// hasil ConsultationListResource
// 'counselor' & 'user' optional -> tergantung relasi apa yang di-eager-load di backend
// (halaman user: cuma 'counselor', halaman konselor: cuma 'user', admin: dua-duanya)
export interface Consultation {
    id: number;
    reference: string;
    status: ConsultationStatus;
    status_label: string;

    date: string;
    time: string;
    mode: 'Online' | 'Tatap Muka';
    duration: string;
    price?: string;

    counselor: Counselor;
    user: UserMini;

    pra_note: string | null;
}

export interface ConsultationLocation {
    name: string | null;
    address: string | null;
    city: string | null;
    maps_url: string | null;
}

export interface ConsultationNotes {
    client: string | null;
    progress: string | null;
    post_session: string | null;
    cancellation_reason: string | null;
}


// hasil ConsultationDetailResource -> extends semua field Consultation (list) + tambahan berikut
export interface ConsultationDetail extends Consultation {
    status_group: ConsultationTabKey | 'all';
    queue_position: number | null;

    schedule: {
        date: string;
        time: string;
        duration?: string;
    };
    method : string;
    method_label: 'Online' | 'Tatap Muka';
    is_anonymous: boolean;
    is_first: boolean;
    categories: string;

    meeting_link?: string | null;
    location?: ConsultationLocation | null;

    // di detail, 'notes' di-override jadi object (bukan string kayak di list)
    notes: ConsultationNotes | null;

    invoice?: Invoice | null;
    needs_payment?: boolean;
}

export interface ConsultationStats {
    total_sessions: number;
    upcoming_sessions: number;
    completed_sessions: number;
    cancelled_sessions: number;
    total_counselors: number;
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

// export type ReservationStatus =
//     | 'pending_payment'
//     | 'pending_confirmation'
//     | 'confirmed'
//     | 'in_queue'
//     | 'in_progress'
//     | 'completed'
//     | 'cancelled'
//     | 'rejected';

// export type ReservationTabKey = 'all' | 'upcoming' | 'completed' | 'cancelled';

// export interface Reservation {
//     id: number;
//     reference: string;
//     counselor_name: string;
//     counselor_specialization: string;
//     counselor_photo: string | null;
//     date: string;
//     time: string;
//     duration: string;
//     mode: 'Online' | 'Tatap Muka';
//     price: string;
//     status: ReservationStatus;
//     status_label: string;
//     notes: string | null;
// }

// export interface ReservationStats {
//     total_sessions: number;
//     upcoming_sessions: number;
//     completed_sessions: number;
//     cancelled_sessions: number;
//     total_counselors: number;
// }

// export type InvoiceStatus = 'paid' | 'unpaid';

// export interface Invoice {
//     id: number;
//     reference: string;
//     counselor_name: string;
//     date: string;
//     amount: string;
//     status: InvoiceStatus;
// }

// export interface PaginationLink {
//     url: string | null;
//     label: string;
//     active: boolean;
// }

// export interface PaginatedData<T> {
//     data: T[];
//     links: PaginationLink[];
//     current_page: number;
//     last_page: number;
//     total: number;
// }

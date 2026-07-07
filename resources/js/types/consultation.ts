import type { Counselor } from './counselor';
import type { Invoice } from './invoice';

export type ConsultationStatus =
    | 'pending_confirmation'
    | 'confirmed'
    | 'in_queue'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'rejected';

export const CONSULTATION_STATUS_CLASSES = {
    pending_confirmation: 'bg-amber-100 text-amber-800 border-amber-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    in_queue: 'bg-orange-100 text-orange-800 border-orange-200',
    in_progress: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
} as const;

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
    needs_payment?: boolean;
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
    method: string;
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
    links: PaginationLink;
    meta?: any;
}

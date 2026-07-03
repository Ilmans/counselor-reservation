export type ReservationStatus =
    | 'pending_confirmation'
    | 'confirmed'
    | 'in_queue'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'rejected';

export interface PaymentMethodSnapshot {
    code: string;
    name: string;
    type: string;
    metadata: Record<string, string>;
    selected_at: string;
}

export interface PaymentMethodOption {
    id: number;
    code: string;
    name: string;
    type: string;
    metadata: Record<string, string>;
}

export interface InvoiceDetail {
    id: number;
    reference: string;
    amount: number;
    amount_formatted: string;
    status:
        | 'pending'
        | 'paid'
        | 'expired'
        | 'failed'
        | 'cancelled'
        | 'refunded';
    payment_method: PaymentMethodSnapshot | null;
    expired_at: string | null;
    paid_at: string | null;
}

export interface ReservationDetail {
    id: number;
    reference: string;
    status: ReservationStatus;
    status_label: string;
    status_group: 'upcoming' | 'completed' | 'cancelled' | 'all';
    queue_position: number | null;

    counselor: {
        name: string;
        slug: string;
        photo_url: string;
        specialization: string;
        whatsapp: string;
    };

    schedule: {
        date: string;
        time: string;
        duration: string;
    };

    method: 'online' | 'offline';
    method_label: string;
    is_anonymous: boolean;
    is_first: boolean;
    categories: string;

    meeting_link: string | null;
    location: {
        name: string | null;
        address: string | null;
        city: string | null;
        maps_url: string | null;
    } | null;

    notes: {
        client: string | null;
        progress: string | null;
        post_session: string | null;
        cancellation_reason: string | null;
    };

    invoice: InvoiceDetail | null;
    needs_payment: boolean;
    price_label: string;
}

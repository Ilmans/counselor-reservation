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

export interface InvoiceData {
    id: number;
    reference: string;
    status:
        | 'pending'
        | 'paid'
        | 'expired'
        | 'failed'
        | 'cancelled'
        | 'refunded';
    amount: number;
    amount_formatted: string;
    payment_method: PaymentMethodSnapshot | null;
    expired_at: string | null;
    paid_at: string | null;
    consultation: {
        id: number;
        reference: string;
        date: string;
        time: string;
        method: 'online' | 'offline';
    };
    counselor: {
        name: string;
        specialization: string;
        photo_url: string;
    };
}

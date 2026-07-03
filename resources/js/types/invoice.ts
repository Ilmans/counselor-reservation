export type InvoiceStatus =
    | 'pending'
    | 'paid'
    | 'expired'
    | 'failed'
    | 'cancelled'
    | 'refunded';

export interface PaymentMethodMetadata {
    logo?: string;
    account_name?: string;
    account_number?: string;
    qr_image?: string;
    merchant_name?: string;
}

export interface PaymentMethodOption {
    id: number;
    code: string;
    name: string;
    type: 'bank_transfer' | 'qris' | string;
    metadata: PaymentMethodMetadata;
}

export interface SelectedPaymentMethod {
    code: string;
    name: string;
    type: string;
    metadata: PaymentMethodMetadata;
    selected_at: string;
}

export interface InvoiceData {
    id: number;
    reference: string;
    date: string;
    amount: number;
    amount_formatted: string;
    status: InvoiceStatus;
    payment_method: SelectedPaymentMethod | null;
    expired_at: string | null;
    paid_at: string | null;
    consultation: {
        id: number;
        reference: string;
        date: string;
        time: string;
        method: 'online' | 'offline' | string;
    };
    counselor: {
        name: string;
        slug: string;
        specialization: string;
        photo_url: string;
    };
}

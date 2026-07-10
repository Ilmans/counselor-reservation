export interface Withdrawal {
    reference: string;
    amount: number;
    amount_formatted: string;
    bank_name: string;
    account_number: string;
    account_holder_name: string;
    status: 'pending' | 'completed' | 'rejected';
    status_label: string;
    notes: string | null;
    date: string;
}


export interface Wallet {
    balance: number;
    bank_name: string | null;
    account_number: string | null;
    account_holder_name: string | null;
}

export interface AdminWithdrawal {
    id: number;
    reference: string;
    counselor: {
        name: string;
        email: string;
    };
    amount: number;
    amount_formatted: string;
    bank_name: string;
    account_number: string;
    account_holder_name: string;
    status: 'pending' | 'completed' | 'rejected';
    status_label: string;
    notes: string | null;
    date: string;
}
 

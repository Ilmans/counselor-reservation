import type { Category, CounselorAddress } from './counselor';

export type CounselorRow = {
    id: number;
    user_id: number | null;
    specialization_id: number;
    address_id: number;
    address: CounselorAddress;
    name: string;
    slug: string;
    experience_years: number;
    email: string;
    whatsapp: string;
    bio: string;
    photo_url: string;
    photo : string;
    pricing_type: 'paid' | 'free';
    price_per_hour: string | null;
    session_duration_minutes: number;
    status: 'active' | 'inactive';
    created_at: string | null;
    updated_at: string | null;
    categories : Category[]
};

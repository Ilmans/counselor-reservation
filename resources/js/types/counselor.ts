export type BaseCounselor = {
    id: number;
    slug: string;
    name: string;
    email: string;
    whatsapp: string;
    photo_url: string;
    experience_years: number;
    pricing_type: 'paid' | 'free'; // bisa ditambah kalau ada varian lain
    price_per_hour: string; // dari backend masih string "150000.00"
    status: 'active' | 'inactive';
    next_schedule: Schedule;
    consultations_count: number;
    feedbacks_avg_rating: number;
    specialization: string;
};
export type Counselor = BaseCounselor & {
    categories: Category[];
};

export type CounselorDetailPage = BaseCounselor &
    Counselor & {
        bio: string;
        address: CounselorAddress;
        schedules: Schedule[];
    };
export type Schedule = {
    close_time: string;
    open_time: string;
    day_of_week: number;
    is_active: boolean;
    method: 'online' | 'offline' | 'both';
    date: string;
};

export type CounselorAddress = {
    id: number;
    name: string;
    address: string;
    city: string;
    province: string | null;
    postal_code: string | null;
    maps_url: string | null;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
};

export type Specialization = {
    id: number;
    name: string;
    description?: string;
};

export type Paginated<T> = {
    current_page: number;
    data: T[];

    first_page_url: string;
    last_page: number;
    last_page_url: string;

    next_page_url: string | null;
    prev_page_url: string | null;

    per_page: number;
    total: number;

    from: number;
    to: number;

    path: string;

    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};

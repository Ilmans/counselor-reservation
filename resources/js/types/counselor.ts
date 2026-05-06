export type Counselor = {
    id: number;
    name: string;
    email: string;
    whatsapp: string;
    photo_url: string;

    pricing_type: 'paid' | 'free'; // bisa ditambah kalau ada varian lain
    price_per_hour: string; // dari backend masih string "150000.00"

    status: 'active' | 'inactive';

    schedules: Schedule[];
    categories: Category[];
    specialization: Specialization | null;
};
export type Schedule = {
    close_time: string;
    open_time: string;
    day_of_week: string;
    is_active: boolean;
};
export type Category = {
    id: number;
    name: string;
};

export type Specialization = {
    id: number;
    name: string;
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

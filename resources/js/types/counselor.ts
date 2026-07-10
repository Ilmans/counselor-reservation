//new
export type CounselorPricingType = 'free' | 'hourly';
export type CounselorStatus = 'active' | 'inactive';
export interface CounselorNextSchedule {
    id: number;

    day_of_week: number;
    day_label: string;

    open_time: string;
    close_time: string;
    time_label: string;

    method: "online" | "offline" | "both";
    method_label: string;
}
export interface CounselorList {
    id: number;
    slug: string;
    name: string;
    email: string;
    whatsapp: string;

    photo_path: string | null;
    photo: string | null;

    specialization: string | null;
    categories: string;

    pricing_type: CounselorPricingType;
    price_per_hour: number | null;

    status: CounselorStatus;
    status_label: string;

    visibility: "active" | "inactive";
    visibility_label: string;

    consultations_count: number;
    feedbacks_avg_rating: number | null;
    next_schedule: CounselorNextSchedule | null;

}

export type CounselorDetail = {
    id: number;
    bio:string;
    slug: string;
    name: string;
    photo: string | null;
    specialization: {
        id: number;
        name: string;
        description: string | null;
    } | null;
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
    rating: number;
    total_reviews: number;
    total_consultations: number;
    pricing: {
        type: 'free' | 'paid';
        is_free: boolean;
        amount: number;
        label: string;
    };

    address: {
        full_address: string | null;
        city: string | null;
        province: string | null;
        maps_url:string;
    } | null;
    schedules: {
        id: number;
        day: number;
        day_label: string;
        open_time: string;
        close_time: string;
        method: string;
        method_label: string;
        is_active: boolean;
    }[];
    member_since: string | null;
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

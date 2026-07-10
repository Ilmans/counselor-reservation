export interface CounselorStatistic {
    today_sessions: number;
    today_online_sessions: number;
    today_offline_sessions: number;
    pending_confirmation_sessions: number;
    completed_this_month: number;
    scheduled_this_month: number;
}

export interface CounselorRatingStatistic {
    average_rating: number;
    total_reviews: number;
}
export interface QueueItem {
    id: number;
    reference: string;
    date: string | null;
    time: string;
    client: string | null;
    is_anonymous: boolean;
    category: string;
    method: 'online' | 'offline';
    status: string;
    status_label: string;
}
export interface ReviewItem {
    name: string | null;
    is_anonymous: boolean;
    rating: number;
    comment: string;
    when: string;
}

export interface ScheduleItem {
    id: number;
    day: string;
    day_label: string;
    open_time: string;
    close_time: string;
    method: string;
    method_label: string;
    is_active: boolean;
}
export interface CounselorDashboardProps {
    statistics: {
        today_sessions: number;
        today_online_sessions: number;
        today_offline_sessions: number;
        pending_confirmation_sessions: number;
        completed_this_month: number;
        scheduled_this_month: number;
    };
    rating: {
        average_rating: number;
        total_reviews: number;
    };
    counselor: {
        pricing_type: 'paid' | 'free';
        price_per_hour: number | null;
    };
    earnings: {
        this_month: number;
        lifetime: number;
    };
    todayQueue: QueueItem[];
    pendingConfirmations: QueueItem[];
    schedules: ScheduleItem[];
    reviews: ReviewItem[];
}

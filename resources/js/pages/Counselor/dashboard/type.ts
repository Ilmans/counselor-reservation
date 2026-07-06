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

export interface CounselorDashboardProps {
    statistics: CounselorStatistic;
    rating: CounselorRatingStatistic;
}

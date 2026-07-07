// resources/js/types/review.ts
export interface Review {
    id: number;
    rating: number;
    comment: string;
    is_anonymous: boolean;
    client_name: string;
    reference: string;
    date: string;
    created_at: string;
}

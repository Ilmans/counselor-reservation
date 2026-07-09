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
    counselor?: {
        name: string;
        slug: string;
    };
}

// key = "5" | "4" | "3" | "2" | "1" (angka bintang)
export type RatingBreakdown = Record<string, number>;

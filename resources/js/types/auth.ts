export type User = {
    id: number;
    name: string;
    email: string;
    whatsapp: string;
    age: string;
    gender: string;
    avatar?: string;
    role: string;
    email_verified_at: string | null;
    counselor: {
        specialization: {
            name: string;
        };
        photo : string;
    };
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
};

export type Auth = {
    user: User;
};

import type { Auth } from '@/types/auth';
import type { Category } from '@/types/category';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            categories: Category[]; // 🔥 tambahin ini
            alert: {
                type: 'error' | 'success' | 'warning' | 'info';
                message: string;
            };
            [key: string]: unknown;
        };
    }
}

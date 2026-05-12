import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import Wrapper from '@/layouts/wrapper';

type Props = {
    status: number;
    message?: string;
};

const errors: Record<number, { title: string; description: string }> = {
    404: {
        title: 'Halaman tidak ditemukan',
        description: 'Halaman yang kamu cari tidak ada atau sudah dipindahkan.',
    },
    403: {
        title: 'Akses ditolak',
        description: 'Kamu tidak memiliki izin untuk mengakses halaman ini.',
    },
    500: {
        title: 'Kesalahan server',
        description:
            'Terjadi kesalahan pada server kami. Coba beberapa saat lagi.',
    },
    503: {
        title: 'Layanan tidak tersedia',
        description:
            'Layanan sedang dalam pemeliharaan. Coba beberapa saat lagi.',
    },
};

function ErrorPage({ status, message }: Props) {
    const error = errors[status] ?? {
        title: 'Terjadi kesalahan',
        description: message ?? 'Sesuatu yang tidak terduga terjadi.',
    };

    return (
        <main className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
            {/* Status code */}
            <span className="mb-6 inline-block rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium tracking-widest text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                {status}
            </span>

            {/* Title */}
            <h1 className="mb-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {error.title}
            </h1>

          
            <p className="mb-10 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
                {error.description}
            </p>

            {/* Divider */}
            <div className="mb-10 h-px w-16 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />

            {/* Actions */}
            <div className="flex items-center gap-3">
                <Link
                    href="/"
                    className="rounded-lg bg-zinc-900 px-4 py-2 text-[13px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                    Kembali ke beranda
                </Link>
            </div>
        </main>
    );
}

export default ErrorPage;
ErrorPage.layout = (page: ReactNode) => <Wrapper main={page} />;

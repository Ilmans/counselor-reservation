import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ThemeProvider } from '@/providers/theme-provider';

import Footer from './footer';
import Header from './header';

export default function Wrapper({ main }: any) {
    const { toast: flashToast, errors } = usePage().props as any;

    const lastError = useRef('');

    // Flash Toast
    useEffect(() => {
        if (!flashToast) {
            return;
        }

        const { type, message } = flashToast;

        if (type && (toast as any)[type]) {
            (toast as any)[type](message);
        } else {
            toast(message);
        }
    }, [flashToast]);

    // Validation Error Toast
    useEffect(() => {
        if (!errors) {
            return;
        }

        const hasErrors = Object.keys(errors).length > 0;

        if (!hasErrors) {
            return;
        }

        const hash = JSON.stringify(errors);

        // supaya tidak muncul dua kali
        if (lastError.current === hash) {
            return;
        }

        lastError.current = hash;

        toast.error('Cek kembali data yang Anda input.');
    }, [errors]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster position="bottom-right" />

            <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-background text-foreground">
                <Header />
                <div className="flex-1">{main}</div>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

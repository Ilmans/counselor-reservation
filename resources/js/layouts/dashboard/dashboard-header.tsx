import { Search, Menu } from 'lucide-react';
import ThemeSwitcher from '../ThemeSwitcher';
import NotificationBell from './notification-bell';
import { usePage } from '@inertiajs/react';

// Header.jsx
// Judul, tanggal, dan placeholder pencarian di-hardcode di sini.

export default function DashboardHeader({
    isDesktop,
    onMenuClick,
    notifOpen,
    onToggleNotif,
}: any) {
    const { app } = usePage().props;

    return (
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card px-4 py-3.5 md:gap-4 md:px-7 md:py-4">
            {!isDesktop && (
                <button
                    className="shrink-0 text-foreground"
                    onClick={onMenuClick}
                    aria-label="Buka menu"
                >
                    <Menu size={20} />
                </button>
            )}

            {isDesktop && (
                <div className="min-w-0 shrink-0">
                    <p className="truncate font-serif text-base leading-tight">
                        Dashboard
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground capitalize">
                        {app.date.day},{app.date.date},{app.date.time}
                    </p>
                </div>
            )}

            <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-full bg-muted px-3.5 py-2 sm:flex md:ml-4">
                <Search size={15} className="text-muted-foreground" />
                <input
                    placeholder="Cari klien, sesi, atau catatan..."
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:opacity-70"
                />
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2">
                <ThemeSwitcher />

                <NotificationBell open={notifOpen} onToggle={onToggleNotif} />
            </div>
        </header>
    );
}

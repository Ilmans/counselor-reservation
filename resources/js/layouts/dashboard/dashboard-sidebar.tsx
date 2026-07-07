import ConsultationController from '@/actions/App/Http/Controllers/Counselor/ConsultationController';
import DashboardController from '@/actions/App/Http/Controllers/Counselor/DashboardController';
import ReviewController from '@/actions/App/Http/Controllers/Counselor/ReviewController';
import ScheduleController from '@/actions/App/Http/Controllers/Counselor/ScheduleController';
import { Link, usePage } from '@inertiajs/react';
import {
    Home,
    ClipboardList,
    CalendarDays,
    Users,
    Star,
    Wallet,
    Settings,
    LogOut,
    X,
} from 'lucide-react';

const NAV_ITEMS = [
    {
        key: 'dashboard',
        label: 'Beranda',
        icon: Home,
        url: DashboardController.index.url(),
    },
    {
        key: 'consultations',
        label: 'Konsultasi',
        icon: ClipboardList,
        badge: 3,
        url: ConsultationController.index.url(),
    },
    {
        key: 'schedule',
        label: 'Jadwal Praktik',
        icon: CalendarDays,
        url: ScheduleController.index.url(),
    },
    // { key: 'klien', label: 'Klien', icon: Users },
    {
        key: 'reviews',
        label: 'Ulasan',
        icon: Star,
        url: ReviewController.index.url(),
    },
    { key: 'keuangan', label: 'Keuangan', icon: Wallet },
    { key: 'profil', label: 'Profil & Layanan', icon: Settings },
];

export default function DashboardSidebar({
    isDesktop,
    visible,
    onClose,
    activeKey,
}: any) {
    const { props } = usePage();
    const user = props?.auth.user;
    const app = props.app;

    return (
        <aside
            className={` ${isDesktop ? 'sticky' : 'fixed'} top-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-300 ${visible ? 'translate-x-0' : '-translate-x-full'} `}
        >
            {/* Brand */}
            <div className="flex items-center justify-between px-5 py-5">
                <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className="font-serif text-sm">T</span>
                    </div>
                    <span className="truncate font-serif text-base">
                        {app.name}
                    </span>
                </div>
                {!isDesktop && (
                    <button
                        className="shrink-0 text-muted-foreground"
                        onClick={onClose}
                        aria-label="Tutup menu"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Navigasi */}
            <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeKey == item.key;
                    const Icon = item.icon;

                    return (
                        <Link
                            href={item.url}
                            key={item.key}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'} `}
                        >
                            <span className="flex cursor-pointer items-center gap-2.5">
                                <Icon size={16} strokeWidth={2} />
                                {item.label}
                            </span>
                            {item.badge && (
                                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User & logout */}
            <div className="border-t border-border px-3 pt-3 pb-4">
                <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5">
                    <div className="relative shrink-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                            BE
                        </div>
                        <span className="pulse-dot absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-card" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                            {user.counselor.specialization.name}
                        </p>
                    </div>
                </div>
                <button className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <LogOut size={16} />
                    Keluar
                </button>
            </div>
        </aside>
    );
}

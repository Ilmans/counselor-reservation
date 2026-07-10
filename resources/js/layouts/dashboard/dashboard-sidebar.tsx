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
    ChevronDown,
    MarsStroke,
    Calendar1Icon,
    StarIcon,
    CreditCardIcon,
    User,
    Tags,
    SubscriptIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import ConsultationController from '@/actions/App/Http/Controllers/Counselor/ConsultationController';
import CounselorSettingController from '@/actions/App/Http/Controllers/Counselor/CounselorSettingController';
import DashboardController from '@/actions/App/Http/Controllers/Counselor/DashboardController';
import ReviewController from '@/actions/App/Http/Controllers/Counselor/ReviewController';
import ScheduleController from '@/actions/App/Http/Controllers/Counselor/ScheduleController';
import AdminCounselorController from '@/actions/App/Http/Controllers/Admin/AdminCounselorController';
import ManageUserController from '@/actions/App/Http/Controllers/Admin/ManageUserController';
import AdminMasterDataController from '@/actions/App/Http/Controllers/Admin/AdminMasterDataController';
import AdminConsultationController from '@/actions/App/Http/Controllers/Admin/AdminConsultationController';
import AdminReviewController from '@/actions/App/Http/Controllers/Admin/AdminReviewController';
import AdminInvoiceController from '@/actions/App/Http/Controllers/Admin/AdminInvoiceController';
import AdminPaymentMethodController from '@/actions/App/Http/Controllers/Admin/AdminPaymentMethodController';
import FinanceController from '@/actions/App/Http/Controllers/Counselor/FinanceController';

type NavChild = {
    key: string;
    label: string;
    url: string;
};

type NavItem = {
    key: string;
    label: string;
    icon: LucideIcon;
    badge?: number;
    url?: string;
    children?: NavChild[];
};

const COUNSELOR_NAV_ITEMS: NavItem[] = [
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

        url: ConsultationController.index.url(),
    },
    {
        key: 'schedule',
        label: 'Jadwal Praktik',
        icon: CalendarDays,
        url: ScheduleController.index.url(),
    },
    {
        key: 'reviews',
        label: 'Ulasan',
        icon: Star,
        url: ReviewController.index.url(),
    },
    {
        key: 'finance',
        label: 'Keuangan',
        icon: Wallet,
        url: FinanceController.index.url(),
    },
    {
        key: 'settings',
        label: 'Profil & Layanan',
        icon: Settings,
        url: CounselorSettingController.index.url(),
    },
];

// Sesuaikan url/import controller admin kamu di sini
// Sesuaikan url/import controller admin kamu di sini
const ADMIN_NAV_ITEMS: NavItem[] = [
    {
        key: 'dashboard',
        label: 'Beranda',
        icon: Home,
        url: '/admin/dashboard',
    },
    {
        key: 'manage-counselors',
        label: 'Konselor',
        icon: Users,
        url: AdminCounselorController.index.url(),
    },
    {
        key: 'manage-users',
        label: 'User',
        icon: User,
        url: ManageUserController.index.url(),
    },
    {
        key: 'manage-categories',
        label: 'Kategori',
        icon: Tags,
        url: AdminMasterDataController.indexCategory.url(),
    },
    {
        key: 'manage-specializations',
        label: 'Spesialisasi',
        icon: MarsStroke,
        url: AdminMasterDataController.indexSpecialization.url(),
    },
    {
        key: 'manage-payment-methods',
        label: 'Metode Pembayaran',
        icon: SubscriptIcon,
        url: AdminPaymentMethodController.index.url(),
    },
    {
        key: 'manage-consultations',
        label: 'Data Konsultasi',
        icon: Calendar1Icon,
        url: AdminConsultationController.index.url(),
    },
    {
        key: 'manage-invoices',
        label: 'Data Invoice',
        icon: CreditCardIcon,
        url: AdminInvoiceController.index.url(),
    },
    {
        key: 'manage-reviews',
        label: 'Data Feedback',
        icon: StarIcon,
        url: AdminReviewController.index.url(),
    },
    {
        key: 'keuangan',
        label: 'Keuangan',
        icon: Wallet,
        url: '/admin/finance',
    },
];

export default function DashboardSidebar({
    isDesktop,
    visible,
    onClose,
    activeKey,
    isAdmin = true,
}: any) {
    const { props } = usePage();
    const user = props?.auth.user;
    const app = props.app;

    const navItems = isAdmin ? ADMIN_NAV_ITEMS : COUNSELOR_NAV_ITEMS;

    // Auto-expand parent kalau salah satu child-nya aktif
    const initialExpanded = navItems.find((item) =>
        item.children?.some((child) => child.key === activeKey),
    )?.key;
    const [expandedKey, setExpandedKey] = useState<string | undefined>(
        initialExpanded,
    );

    return (
        <aside
            className={` ${isDesktop ? 'sticky' : 'fixed'} top-0 z-40 flex h-screen w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-300 ${visible ? 'translate-x-0' : '-translate-x-full'} `}
        >
            {/* Brand */}
            <div className="flex items-center justify-between px-5 py-5">
                <Link
                    href={isAdmin ? '/admin/dashboard' : '/counselor/dashboard'}
                    className="flex shrink-0 items-center gap-3"
                >
                    <img
                        src={app.logo}
                        alt={app.name}
                        className="h-9 w-auto object-contain"
                        draggable={false}
                    />

                    <span className="font-serif text-base font-semibold tracking-tight text-foreground">
                        {app.name}
                    </span>
                </Link>
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
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const hasChildren = !!item.children?.length;
                    const isParentActive = hasChildren
                        ? item.children!.some((c) => c.key === activeKey)
                        : activeKey === item.key;
                    const isExpanded = expandedKey === item.key;

                    if (hasChildren) {
                        return (
                            <div key={item.key}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setExpandedKey((prev) =>
                                            prev === item.key
                                                ? undefined
                                                : item.key,
                                        )
                                    }
                                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${isParentActive ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'} `}
                                >
                                    <span className="flex cursor-pointer items-center gap-2.5">
                                        <Icon size={16} strokeWidth={2} />
                                        {item.label}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {isExpanded && (
                                    <div className="mt-1 ml-4 space-y-1 border-l border-border pl-3">
                                        {item.children!.map((child) => {
                                            const isChildActive =
                                                activeKey === child.key;

                                            return (
                                                <Link
                                                    href={child.url}
                                                    key={child.key}
                                                    className={`block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${isChildActive ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'} `}
                                                >
                                                    {child.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link
                            href={item.url!}
                            key={item.key}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${isParentActive ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:bg-muted'} `}
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

            {/* User & logout — bagian user disembunyikan untuk admin */}
            <div className="border-t border-border px-3 pt-3 pb-4">
                {!isAdmin && (
                    <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5">
                        <div className="relative shrink-0">
                            {user.counselor.photo ? (
                                <img
                                    loading="lazy"
                                    src={user.counselor.photo}
                                    alt={user.name}
                                    className="h-7 w-7 shrink-0 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                    BE
                                </div>
                            )}
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
                )}
                <button className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <LogOut size={16} />
                    Keluar
                </button>
            </div>
        </aside>
    );
}

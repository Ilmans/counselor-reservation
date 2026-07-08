import { JSX } from 'react';
import { Link, router } from '@inertiajs/react';
import ProfileSettingController from '@/actions/App/Http/Controllers/ProfileSettingController';

type AccountSection = 'reservasi' | 'invoice' | 'setting';

const NAV_ITEMS: {
    key: AccountSection;
    label: string;
    href: string;
    icon: JSX.Element;
}[] = [
    {
        key: 'reservasi',
        label: 'Reservasi Saya',
        href: '/my-reservations',
        icon: (
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
        ),
    },
    {
        key: 'invoice',
        label: 'Invoice',
        href: '/my-invoices',
        icon: (
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <path d="M6 2h9l5 5v15H6z" />
                <path d="M15 2v5h5M9 13h6M9 17h6" />
            </svg>
        ),
    },
    {
        key: 'setting',
        label: 'Pengaturan',
        href: ProfileSettingController.index.url(),
        icon: (
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.96 19a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15z" />
            </svg>
        ),
    },
];

export function UserSidebar({ active }: { active: AccountSection }) {
    return (
        <aside className="w-full shrink-0 md:w-52">
            {/* Mobile: native select — compact, familiar, and doesn't fight for
                horizontal space the way a row of pills did. */}
            <div className="relative md:hidden">
                <select
                    aria-label="Menu akun"
                    value={active}
                    onChange={(e) => {
                        const target = NAV_ITEMS.find(
                            (item) => item.key === e.target.value,
                        );

                        if (target) router.visit(target.href);
                    }}
                    className="w-full appearance-none rounded-lg border border-border bg-card px-3 py-2.5 pr-9 text-[13px] font-medium text-foreground outline-none focus:border-primary"
                >
                    {NAV_ITEMS.map((item) => (
                        <option key={item.key} value={item.key}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>

            {/* Desktop: quiet vertical list, active item marked with a left accent bar */}
            <nav className="hidden md:sticky md:top-24 md:flex md:flex-col md:gap-0.5">
                {NAV_ITEMS.map((item) => {
                    const isActive = active === item.key;

                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`flex items-center gap-2 rounded-lg rounded-l-none border-l-2 px-3 py-2 text-[13px] font-medium transition-colors ${
                                isActive
                                    ? 'border-primary bg-secondary/60 font-semibold text-primary'
                                    : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                        >
                            <span className={isActive ? '' : 'opacity-70'}>
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

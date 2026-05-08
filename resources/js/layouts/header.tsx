import { Link, usePage } from '@inertiajs/react';

import type { User as UserType } from '@/types';
import ThemeSwitcher from './ThemeSwitcher';
import { UserMenu } from './user-menu';

const NAV_ITEMS = [
    { label: 'Konselor', href: '/', exact: true },
    {
        label: 'Reservasi Saya',
        href: '/reservasi',
        exact: false,
    },
    { label: 'Tentang', href: '/tentang', exact: true },
] as const;

// ─── Nav ─────────────────────────────────────────────────────────────────────

const Nav = () => {
    const { url } = usePage();

    const isActive = (href: string, exact: boolean) =>
        exact ? url === href : url.startsWith(href);

    return (
        <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
                const active = isActive(item.href, item.exact);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={[
                            'relative rounded-md px-3 py-1.5 text-[13px] transition-colors',
                            active
                                ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                                : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200',
                        ].join(' ')}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
};

// ─── Header (main export) ────────────────────────────────────────────────────

const Header = () => {
    const { props } = usePage();
    const user = (props as any).auth?.user as UserType | null;

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/80">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                {/* Logo — berdiri sendiri, tidak menyatu dengan nav */}
                <Link href="/" className="flex shrink-0 items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                        <svg
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                        >
                            <circle
                                cx={7}
                                cy={7}
                                r="5.5"
                                stroke="#a1a1aa"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M7 4.5v3l1.5 1.5"
                                stroke="#e4e4e7"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Tenang
                    </span>
                </Link>

                {/* Nav — posisi tengah */}
                <div className="flex flex-1 justify-center">
                    <Nav />
                </div>

                {/* Actions — kanan */}
                <div className="flex shrink-0 items-center gap-1">
                    <ThemeSwitcher />

                    {user ? (
                        <UserMenu user={user} />
                    ) : (
                        <Link
                            href="/login"
                            className="ml-1.5 rounded-lg border border-zinc-300 px-3.5 py-1.5 text-[12px] font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                        >
                            Masuk
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

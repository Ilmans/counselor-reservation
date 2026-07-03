import { Link, usePage } from '@inertiajs/react';

import type { User as UserType } from '@/types';
import ThemeSwitcher from './ThemeSwitcher';
import { UserMenu } from './user-menu';

const NAV_ITEMS = [
    { label: 'Home', href: '/', exact: true },
    { label: 'Konselor', href: '/counselors', exact: true },
    { label: 'Tentang', href: '/about-us', exact: true },
] as const;

// Nav

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
                            'relative rounded-full px-4 py-2 text-sm transition-colors',
                            active
                                ? 'bg-primary/10 font-medium text-primary'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        ].join(' ')}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
};

// Header (main export)

const Header = () => {
    const { props } = usePage();
    const user = (props as any).auth?.user as UserType | null;

    return (
        <header className="sticky top-4 z-50 px-4 sm:px-6">
            <div className=" flex h-16 items-center justify-between rounded-full border border-border/50 bg-card/90 px-6 shadow-lg shadow-primary/5 backdrop-blur-md">
                {/* Logo - berdiri sendiri, tidak menyatu dengan nav */}
                <Link href="/" className="flex shrink-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <svg
                            width={16}
                            height={16}
                            viewBox="0 0 14 14"
                            fill="none"
                            className="text-primary"
                        >
                            <circle
                                cx={7}
                                cy={7}
                                r="5.5"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                opacity={0.55}
                            />
                            <path
                                d="M7 4.5v3l1.5 1.5"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <span className="font-serif text-base font-medium tracking-tight text-foreground">
                        Tenang
                    </span>
                </Link>

                {/* Nav - posisi tengah */}
                <div className="flex flex-1 justify-center">
                    <Nav />
                </div>

                {/* Actions - kanan */}
                <div className="flex shrink-0 items-center gap-2">
                    <ThemeSwitcher />

                    {user ? (
                        <UserMenu user={user} />
                    ) : (
                        <Link
                            href="/login"
                            className="ml-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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

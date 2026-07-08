import { Link, router } from '@inertiajs/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Settings,
} from 'lucide-react';
import DashboardController from '@/actions/App/Http/Controllers/Counselor/DashboardController';
import type { User as UserAuth } from '@/types';

export const UserMenu = ({ user }: { user: UserAuth }) => {
    const initials = user.name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    {user.avatar_url ? (
                        <img
                            loading="lazy"
                            src={user.avatar_url}
                            alt={user.name}
                            className="h-7 w-7 shrink-0 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                            {initials}
                        </div>
                    )}
                    <span className="hidden text-[13px] font-medium text-zinc-800 sm:block dark:text-zinc-200">
                        {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown
                        size={13}
                        strokeWidth={2}
                        className="text-zinc-400"
                    />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    sideOffset={8}
                    className="z-50 min-w-[180px] rounded-xl border border-zinc-200 bg-white p-1 shadow-lg shadow-zinc-900/5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                    {/* Info */}
                    <div className="mb-1 px-3 py-2">
                        <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                            {user.name}
                        </p>
                        <p className="truncate text-[11px] text-zinc-400">
                            {user.email}
                        </p>
                    </div>

                    <DropdownMenu.Separator className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />
                    {user.role == 'counselor' && (
                        <DropdownMenu.Item asChild>
                            <a
                                href={DashboardController.index.url()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-zinc-700 transition-colors outline-none hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                            >
                                <LayoutDashboard size={13} strokeWidth={1.8} />
                                Dashboard Konselor
                            </a>
                        </DropdownMenu.Item>
                    )}
                    <DropdownMenu.Item asChild>
                        <Link
                            href="/my-reservations"
                            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-zinc-700 transition-colors outline-none hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            <LayoutDashboard size={13} strokeWidth={1.8} />
                            Dashboard
                        </Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item asChild>
                        <Link
                            href="/settings"
                            className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-zinc-700 transition-colors outline-none hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            <Settings size={13} strokeWidth={1.8} />
                            Pengaturan
                        </Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />

                    <DropdownMenu.Item asChild>
                        <button
                            onClick={() => {
                                router.post('/logout');
                            }}
                            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-red-500 transition-colors outline-none hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                        >
                            <LogOut size={13} strokeWidth={1.8} />
                            Keluar
                        </button>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

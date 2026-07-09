import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import CounselorController from '@/actions/App/Http/Controllers/CounselorController';
import SearchIcon from '@/components/icons/search';
import type { Category } from '@/types/counselor';
import type { FILTERS } from '@/types/filter';

type Props = {
    filters: FILTERS;
    onLoadingChange?: (loading: boolean) => void;
};

function CategoryChip({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                active
                    ? 'shrink-0 cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-all duration-200'
                    : 'shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground'
            }
        >
            {children}
        </button>
    );
}

function Filter({ filters, onLoadingChange }: Props) {
    const { categories } = usePage().props;
    const [search, setSearch] = useState(filters?.search ?? '');
    const isFirstRender = useRef(true);

    const applyFilter = (params: { category?: string; search?: string }) => {
        const category = params.category ?? filters?.category ?? '';
        const searchValue = params.search ?? search;

        router.get(
            CounselorController.index().url + (category ? `/${category}` : ''),
            searchValue ? { search: searchValue } : {},
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onStart: () => onLoadingChange?.(true),
                onFinish: () => onLoadingChange?.(false),
            },
        );
    };

    // debounce ketikan search, jangan fetch tiap huruf
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            applyFilter({ search });
        }, 500);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const hasActiveFilter = Boolean(filters?.category) || Boolean(search);

    return (
        <div className="relative overflow-hidden px-6 pt-14 pb-10 sm:pt-20">
            {/* Ambient breathing glow — signature motif tema tenang, gema di card & skeleton */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="breathing-orb absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="breathing-orb-slow absolute top-8 right-0 h-96 w-96 rounded-full bg-primary/[0.06] blur-3xl" />
            </div>
            <style>{`
                @keyframes orb-breathe {
                    0%, 100% { transform: scale(1); opacity: 0.9; }
                    50% { transform: scale(1.15); opacity: 0.5; }
                }
                .breathing-orb { animation: orb-breathe 8s ease-in-out infinite; }
                .breathing-orb-slow { animation: orb-breathe 11s ease-in-out infinite reverse; }
                @media (prefers-reduced-motion: reduce) {
                    .breathing-orb, .breathing-orb-slow { animation: none; }
                }
            `}</style>

            {/* Heading */}
            <div className="relative mx-auto max-w-2xl text-center">
                <div className="mb-3 flex items-center justify-center gap-2">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-medium tracking-[0.06em] text-muted-foreground uppercase">
                        Cari Konselor
                    </span>
                </div>
                <h1 className="font-serif text-3xl leading-tight font-normal tracking-[-0.02em] text-foreground md:text-4xl">
                    Temukan konselor
                    <span className="text-primary italic">
                        {' '}
                        yang paling pas.
                    </span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm font-light text-muted-foreground">
                    Ruang aman untuk mulai bicara, kapan pun kamu siap — cari
                    berdasarkan spesialisasi, atau lihat semua konselor yang
                    tersedia.
                </p>
            </div>

            {/* Search console */}
            <div className="relative mx-auto mt-8 max-w-2xl">
                <div className="rounded-[28px] border border-border/60 bg-card/90 p-2 shadow-lg backdrop-blur-sm sm:p-2.5">
                    <div className="flex items-center gap-2.5 rounded-[22px] bg-background/70 px-4">
                        <span className="flex-shrink-0 text-muted-foreground">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama atau spesialisasi…"
                            className="min-w-0 flex-1 bg-transparent py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                aria-label="Hapus pencarian"
                                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="mx-3 my-1.5 h-px bg-border/70" />

                    <div className="flex items-center gap-1.5 overflow-x-auto px-1 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <CategoryChip
                            active={!filters?.category}
                            onClick={() => applyFilter({ category: '' })}
                        >
                            Semua
                        </CategoryChip>

                        {categories.map((cat: Category) => (
                            <CategoryChip
                                key={cat.id}
                                active={filters?.category === cat.slug}
                                onClick={() =>
                                    applyFilter({ category: cat.slug })
                                }
                            >
                                {cat.name}
                            </CategoryChip>
                        ))}
                    </div>
                </div>

                {hasActiveFilter && (
                    <div className="mt-3 flex justify-center">
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                applyFilter({ category: '', search: '' });
                            }}
                            className="text-xs font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-primary hover:underline"
                        >
                            Hapus semua filter
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Filter;

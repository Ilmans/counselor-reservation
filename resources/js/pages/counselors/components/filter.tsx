import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

import CounselorController from '@/actions/App/Http/Controllers/CounselorController';
import SearchIcon from '@/components/icons/search';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types/counselor';
import type { FILTERS } from '@/types/filter';

type Props = {
    filters: FILTERS;
};

function Filter({ filters }: Props) {
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
        <div className="px-6 pt-12 pb-8 sm:pt-16">
            <div className="mx-auto max-w-5xl">
                {/* Page heading */}
                <div className="mb-8">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
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
                </div>

                {/* Search bar */}
                <div className="relative mb-4">
                    <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama atau spesialisasi…"
                        className="w-full rounded-full border border-border bg-card py-3 pr-11 pl-11 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none"
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch('')}
                            aria-label="Hapus pencarian"
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Category pills */}
                <div className="relative">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <Button
                            as="button"
                            onClick={() => applyFilter({ category: '' })}
                            mode={!filters?.category ? 'filled' : 'outlined'}
                            className="shrink-0 cursor-pointer rounded-full text-sm"
                        >
                            Semua
                        </Button>

                        {categories.map((cat: Category) => (
                            <Button
                                as="button"
                                onClick={() =>
                                    applyFilter({ category: cat.slug })
                                }
                                key={cat.id}
                                mode={
                                    filters?.category === cat.slug
                                        ? 'filled'
                                        : 'outlined'
                                }
                                className="shrink-0 cursor-pointer rounded-full text-sm"
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>
                    {/* hint scroll di mobile */}
                    <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-background to-transparent sm:hidden" />
                </div>

                {hasActiveFilter && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch('');
                            applyFilter({ category: '', search: '' });
                        }}
                        className="mt-3 text-xs font-medium text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
                    >
                        Hapus semua filter
                    </button>
                )}
            </div>

            {/* Divider */}
            <div className="mx-auto mt-10 max-w-5xl">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
        </div>
    );
}

export default Filter;

import { router, usePage } from '@inertiajs/react';
import CounselorController from '@/actions/App/Http/Controllers/CounselorController';
import SearchIcon from '@/components/icons/search';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types/counselor';
import type { COUNSELOR_FILTER } from '@/types/filter';

type Props = {
    filters: COUNSELOR_FILTER;
};
function Filter({ filters }: Props) {
    const { categories } = usePage().props;

    const filter = (cat: string) => {
        router.get(
            CounselorController.index().url + `${cat}`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <div className=" mb-10  px-6">
                <div className="flex items-center gap-3">
                    {/* Search input */}
                    <div className="relative shrink-0">
                        <div className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground">
                            <SearchIcon />
                        </div>

                        <input
                            type="text"
                            placeholder="Cari nama atau spesialisasi…"
                            className="w-60 rounded-full border border-border bg-card py-2.5 pr-4 pl-9 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:w-80 focus:border-primary focus:outline-none"
                        />
                    </div>

                    {/* Filter pills */}
                    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {/* Tombol Semua */}
                        <Button
                            as="button"
                            onClick={() => filter('/')}
                            mode={!filters?.category ? 'filled' : 'outlined'}
                            className="shrink-0 cursor-pointer rounded-full text-sm"
                        >
                            Semua
                        </Button>

                        {categories.map((cat: Category) => (
                            <Button
                                as="button"
                                onClick={() => filter(cat.slug)}
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
                </div>
            </div>

            {/* DIVIDER */}
            <div className="mx-auto mb-10 max-w-5xl px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
        </>
    );
}

export default Filter;

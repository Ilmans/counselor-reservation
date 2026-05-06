import { router, usePage } from '@inertiajs/react';
import SearchIcon from '@/components/icons/search';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types/counselor';
import type { COUNSELOR_FILTER } from '@/types/filter';
import CounselorController from '@/actions/App/Http/Controllers/CounselorController';

type Props = {
    filters: COUNSELOR_FILTER;
};
function Filter({ filters }: Props) {
    const { categories } = usePage().props;

    return (
        <>
            <div className="mx-auto mb-8 max-w-5xl px-6">
                <div className="flex items-center gap-3">
                    {/* Search input */}
                    <div className="relative shrink-0">
                        <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
                            <SearchIcon />
                        </div>

                        <input
                            type="text"
                            placeholder="Cari nama atau spesialisasi…"
                            className="w-56 rounded-lg border border-zinc-200 bg-white py-2 pr-4 pl-8 text-[13px] text-zinc-800 transition-all placeholder:text-zinc-400 focus:w-72 focus:border-zinc-400 focus:outline-none dark:border-zinc-700/60 dark:bg-transparent dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
                        />
                    </div>

                    {/* Filter pills */}
                    {/* Filter pills */}
                    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {/* Tombol Semua */}
                        <Button
                            as="button"
                            onClick={() =>
                                router.get(
                                    CounselorController.index().url + `/`,
                                )
                            }
                            mode={!filters?.category ? 'filled' : 'outlined'}
                            className="shrink-0 cursor-pointer rounded-full"
                        >
                            Semua
                        </Button>

                        {categories.map((cat: Category) => (
                            <Button
                                as="button"
                                onClick={() => {
                                    router.get(
                                        CounselorController.index().url +
                                            `/${cat.slug}`,
                                    );
                                }}
                                key={cat.id}
                                mode={
                                    filters?.category === cat.slug
                                        ? 'filled'
                                        : 'outlined'
                                }
                                className="shrink-0 cursor-pointer rounded-full"
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="mx-auto mb-8 max-w-5xl px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700/60" />
            </div>
        </>
    );
}

export default Filter;

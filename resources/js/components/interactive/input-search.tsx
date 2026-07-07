import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { FILTERS } from '@/types/filter';

interface Props {
    placeholder: string;
    filters: FILTERS;
    only: string[];
    url: string;
}
function InputSearch({ placeholder, filters, only, url }: Props) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const isFirstRender = useRef(true);

    const applyFilter = (search: string) => {
        router.get(
            url,
            {
                search: search,
            },
            {
                preserveScroll: true,
                only: only,
                preserveState: true,
                replace: true,
            },
        );
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        const timeout = setTimeout(() => {
            applyFilter(search);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2 pr-3 pl-9 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
    );
}

export default InputSearch;

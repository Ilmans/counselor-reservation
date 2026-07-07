import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { FILTERS } from '@/types/filter';

interface Option {
    label: string;
    value: string;
}

interface Props {
    name: string;
    options: Option[];
    filters: FILTERS;
    only: string[];
    url: string;
}

function SelectFilter({ name, options, filters, only, url }: Props) {
    const [value, setValue] = useState(
        filters?.[name] ?? options[0]?.value ?? '',
    );
    const isFirstRender = useRef(true);

    const applyFilter = (value: string) => {
        router.get(
            url,
            {
                ...filters,
                [name]: value,
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

        applyFilter(value);
    }, [value]);

    return (
        <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-[13px] font-medium text-foreground focus:border-primary focus:outline-none sm:flex-none"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}

export default SelectFilter;

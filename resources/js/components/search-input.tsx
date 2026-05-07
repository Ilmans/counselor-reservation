// components/ui/search-input.tsx
import { useEffect, useRef, useState } from 'react';
import SearchIcon from '@/components/icons/search';

type Props = {
    defaultValue?: string;
    placeholder?: string;
    onSearch: (value: string) => void;
    debounceMs?: number;
    className?: string;
};

export function SearchInput({
    defaultValue = '',
    placeholder = 'Cari…',
    onSearch,
    debounceMs = 400,
    className,
}: Props) {
    const [value, setValue] = useState(defaultValue);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        setValue(next);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            onSearch(next);
        }, debounceMs);
    };

    // Cleanup timer saat unmount
    useEffect(
        () => () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        },
        [],
    );

    return (
        <div className={`relative shrink-0 ${className ?? ''}`}>
            <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
                <SearchIcon />
            </div>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-56 rounded-lg border border-zinc-200 bg-white py-2 pr-4 pl-8 text-[13px] text-zinc-800 transition-all placeholder:text-zinc-400 focus:w-72 focus:border-zinc-400 focus:outline-none dark:border-zinc-700/60 dark:bg-transparent dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
            />
        </div>
    );
}

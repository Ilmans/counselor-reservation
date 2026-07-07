import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import type { FILTERS } from '@/types/filter';

interface Props {
    name: string;
    filters: FILTERS;
    only: string[];
    url: string;
    placeholder?: string;
}

function DateFilter({
    name,
    filters,
    only,
    url,
    placeholder = 'Pilih tanggal',
}: Props) {
    
    const initialDate = filters?.[name] ? new Date(filters[name]) : undefined;

    const [date, setDate] = useState<Date | undefined>(initialDate);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const applyFilter = (value: string | undefined) => {
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

        applyFilter(date ? format(date, 'yyyy-MM-dd') : undefined);
    }, [date]);

    return (
        <div className="relative flex-1 sm:flex-none" ref={containerRef}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[13px] font-medium whitespace-nowrap text-foreground hover:bg-muted sm:w-auto sm:justify-start"
            >
                <CalendarIcon className="h-3.5 w-3.5" />
                {date
                    ? format(date, 'd MMM yyyy', { locale: localeId })
                    : placeholder}
                {date && (
                    <X
                        className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                            e.stopPropagation();
                            setDate(undefined);
                        }}
                    />
                )}
            </button>

            {open && (
                <div className="absolute left-0 z-20 mt-2 rounded-xl border border-border bg-background p-2 shadow-lg">
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                            setDate(d);
                            setOpen(false);
                        }}
                        locale={localeId}
                        className="text-[12px]"
                    />
                </div>
            )}
        </div>
    );
}

export default DateFilter;

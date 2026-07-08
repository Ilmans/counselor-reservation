import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
}

/**
 * Select global, dipakai bareng Input agar tampilan form konsisten
 * (misalnya untuk jenis kelamin, kategori, status, dll).
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className, id, name, ...props }, ref) => {
        const selectId = id ?? name;

        return (
            <label className="flex flex-col gap-1.5" htmlFor={selectId}>
                {label && (
                    <span className="text-[11px] font-medium text-muted-foreground">
                        {label}
                    </span>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    name={name}
                    className={cn(
                        'rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground outline-none transition-colors focus:border-primary',
                        error && 'border-destructive focus:border-destructive',
                        className,
                    )}
                    aria-invalid={!!error}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <span className="text-[11px] text-red-500 text-destructive">{error}</span>
                )}
            </label>
        );
    },
);

Select.displayName = 'Select';

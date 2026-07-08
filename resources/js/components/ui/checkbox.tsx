import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

/**
 * Checkbox global. Dipakai untuk pilihan tunggal (mis. "Aktif") maupun
 * sekumpulan pilihan (mis. daftar kategori layanan yang dicentang banyak).
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, id, name, ...props }, ref) => {
        const generatedId = useId();
        const checkboxId = id ?? generatedId;

        return (
            <label
                htmlFor={checkboxId}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-[13px] text-foreground transition-colors hover:bg-muted/50"
            >
                <input
                    ref={ref}
                    type="checkbox"
                    id={checkboxId}
                    name={name}
                    className={cn(
                        'h-4 w-4 shrink-0 rounded border-border accent-primary',
                        className,
                    )}
                    {...props}
                />
                {label}
            </label>
        );
    },
);

Checkbox.displayName = 'Checkbox';

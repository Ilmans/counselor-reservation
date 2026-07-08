import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, hint, className, id, name, ...props }, ref) => {
        const textareaId = id ?? name;

        return (
            <label className="flex flex-col gap-1.5" htmlFor={textareaId}>
                {label && (
                    <span className="text-[11px] font-medium text-muted-foreground">
                        {label}
                    </span>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    name={name}
                    className={cn(
                        'min-h-[120px] resize-y rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary',
                        error && 'border-destructive focus:border-destructive',
                        className,
                    )}
                    aria-invalid={!!error}
                    {...props}
                />
                {error ? (
                    <span className="text-[11px] text-destructive">{error}</span>
                ) : hint ? (
                    <span className="text-[11px] text-muted-foreground">{hint}</span>
                ) : null}
            </label>
        );
    },
);

Textarea.displayName = 'Textarea';

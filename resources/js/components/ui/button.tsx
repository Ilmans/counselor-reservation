import cn from 'classnames';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    variant?: 'default' | 'blue' | 'red' | 'green';
    mode?: 'filled' | 'outlined';
    as?: 'button' | 'span' | 'div';
    size?: 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
}

const SPINNER_SIZE = {
    sm: 11,
    md: 13,
    lg: 15,
};

export function Button({
    variant = 'default',
    mode = 'filled',
    as: Tag = 'button',
    size = 'md',
    hoverable = true,
    disabled = false,
    loading = false,
    type,
    className,
    children,
    ...props
}: ButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <Tag
            type={type}
            className={cn(
                'inline-flex items-center gap-1.5 font-medium transition-colors border rounded-lg',

                // size
                size === 'sm' && 'px-2 py-[3px] text-[11px]',
                size === 'md' && 'px-3.5 py-[5px] text-[12px]',
                size === 'lg' && 'px-5 py-2 text-[14px]',

                // disabled / loading
                isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',

                // default filled
                variant === 'default' && mode === 'filled' &&
                    'bg-zinc-900 text-zinc-100 border-zinc-900 dark:bg-zinc-200 dark:text-zinc-900 dark:border-zinc-200',
                variant === 'default' && mode === 'filled' && hoverable && !isDisabled &&
                    'hover:bg-zinc-700 dark:hover:bg-zinc-400',

                // default outlined
                variant === 'default' && mode === 'outlined' &&
                    'bg-transparent text-zinc-900 border-zinc-900 dark:text-zinc-300 dark:border-zinc-600',
                variant === 'default' && mode === 'outlined' && hoverable && !isDisabled &&
                    'hover:bg-zinc-100 dark:hover:bg-zinc-800',

                // blue filled
                variant === 'blue' && mode === 'filled' &&
                    'bg-blue-600 text-white border-blue-600 dark:bg-blue-400 dark:text-blue-950 dark:border-blue-400',
                variant === 'blue' && mode === 'filled' && hoverable && !isDisabled &&
                    'hover:bg-blue-700 dark:hover:bg-blue-500',

                // blue outlined
                variant === 'blue' && mode === 'outlined' &&
                    'bg-transparent text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-600',
                variant === 'blue' && mode === 'outlined' && hoverable && !isDisabled &&
                    'hover:bg-blue-50 dark:hover:bg-blue-950',

                // red filled
                variant === 'red' && mode === 'filled' &&
                    'bg-red-600 text-white border-red-600 dark:bg-red-400 dark:text-red-950 dark:border-red-400',
                variant === 'red' && mode === 'filled' && hoverable && !isDisabled &&
                    'hover:bg-red-700 dark:hover:bg-red-500',

                // red outlined
                variant === 'red' && mode === 'outlined' &&
                    'bg-transparent text-red-600 border-red-600 dark:text-red-400 dark:border-red-600',
                variant === 'red' && mode === 'outlined' && hoverable && !isDisabled &&
                    'hover:bg-red-50 dark:hover:bg-red-950',

                // green filled
                variant === 'green' && mode === 'filled' &&
                    'bg-green-600 text-white border-green-600 dark:bg-green-400 dark:text-green-950 dark:border-green-400',
                variant === 'green' && mode === 'filled' && hoverable && !isDisabled &&
                    'hover:bg-green-700 dark:hover:bg-green-500',

                // green outlined
                variant === 'green' && mode === 'outlined' &&
                    'bg-transparent text-green-600 border-green-600 dark:text-green-400 dark:border-green-600',
                variant === 'green' && mode === 'outlined' && hoverable && !isDisabled &&
                    'hover:bg-green-50 dark:hover:bg-green-950',

                className,
            )}
            aria-busy={loading || undefined}
            {...(Tag === 'button' && { disabled: isDisabled })}
            {...props}
        >
            {loading && (
                <Loader2
                    size={SPINNER_SIZE[size]}
                    className="shrink-0 animate-spin"
                />
            )}
            {children}
        </Tag>
    );
}

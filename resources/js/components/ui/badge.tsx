import type { ReactNode } from 'react';

type BadgeVariant = 'solid' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

const SIZE_STYLES: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-[11px] gap-1.5',
    lg: 'px-3 py-1.5 text-[13px] gap-1.5',
};

const DOT_SIZE: Record<BadgeSize, string> = {
    sm: 'h-1.5 w-1.5',
    md: 'h-1.5 w-1.5',
    lg: 'h-2 w-2',
};

const VARIANT_STYLES: Record<BadgeVariant, string> = {
    solid: '',
    outline: 'border bg-transparent',
};

export function Badge({
    children,
    variant = 'solid',
    size = 'md',
    dot = false,
    className = '',
    dotClassName = '',
}: {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
    className?: string;
    dotClassName?: string;
}) {
    return (
        <span
            className={`inline-flex items-center rounded-full font-medium ${SIZE_STYLES[size]} ${VARIANT_STYLES[variant]} ${className}`}
        >
            {dot && <span className={`rounded-full ${DOT_SIZE[size]} ${dotClassName}`} />}
            {children}
        </span>
    );
}

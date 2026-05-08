import React from 'react';
import {
    CircleAlert,
    CircleCheck,
    TriangleAlert,
    Info,
    X,
} from 'lucide-react';

type AlertVariant = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
    variant?: AlertVariant;
    children: React.ReactNode;
    onClose?: () => void;
}

const alertStyles: Record<AlertVariant, string> = {
    error: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900/40 dark:text-red-400',
    success:
        'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900/40 dark:text-green-400',
    warning:
        'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900/40 dark:text-amber-400',
    info: 'bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-zinc-400',
};

const alertIcons: Record<AlertVariant, React.ElementType> = {
    error: CircleAlert,
    success: CircleCheck,
    warning: TriangleAlert,
    info: Info,
};

export function Alert({
    variant = 'info',
    children,
    onClose,
}: AlertProps) {
    const Icon = alertIcons[variant];

    return (
        <div
            className={[
                'flex items-start justify-between gap-3 rounded-lg border px-3 py-2.5 text-[12px] leading-relaxed',
                alertStyles[variant],
            ].join(' ')}
        >
            <div className="flex items-start gap-2.5">
                <Icon
                    className="mt-px h-4 w-4 flex-shrink-0"
                    strokeWidth={2}
                />

                <span>{children}</span>
            </div>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="opacity-70 transition hover:opacity-100"
                >
                    <X className="h-4 w-4" strokeWidth={2} />
                </button>
            )}
        </div>
    );
}

import React from 'react';
import cn from 'classnames';

interface DividerProps {
    label?: string;
    className?: string;
}

export function Divider({ label, className }: DividerProps) {
    if (!label) {
        return (
            <div className={cn('h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent', className)} />
        );
    }

    return (
        <div className={cn('flex items-center gap-3', className)}>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800/80" />
            <span className="text-[11px] text-zinc-600 tracking-wide">{label}</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800/80" />
        </div>
    );
}

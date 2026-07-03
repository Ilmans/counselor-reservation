import { Link } from '@inertiajs/react';
import { Button } from './ui/button';

export function EmptyState({
    title,
    description,
    actionLabel,
    actionHref = '/',
}: {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-muted-foreground"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
            </div>
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="mt-1 max-w-xs text-[12px] text-muted-foreground">
                {description}
            </p>
            {actionLabel && (
                <Link href={actionHref} className="mt-4">
                    <Button as="span" variant="default" mode="filled">
                        {actionLabel}
                    </Button>
                </Link>
            )}
        </div>
    );
}

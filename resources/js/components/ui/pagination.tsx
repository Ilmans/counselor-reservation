import { PaginatedData, PaginationLink } from '@/types/consultation';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';


export function Pagination({
    pagination,
    itemLabel = 'data',
}: {
    pagination: Omit<PaginatedData<unknown>, 'data'>;
    itemLabel?: string;
}) {
    const [prevLink, ...rest] = pagination.links;
    const nextLink = rest[rest.length - 1];
    const pageLinks = rest.slice(0, -1);

    return (
        <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-muted-foreground">
                Halaman {pagination.current_page} dari {pagination.last_page} &middot; Total {pagination.total}{' '}
                {itemLabel}
            </p>

            <div className="flex items-center gap-1">
                <NavButton link={prevLink} icon={<ChevronLeft className="h-4 w-4" />} />

                {pageLinks.map((link, i) =>
                    link.label === '...' ? (
                        <span key={i} className="px-1 text-[12px] text-muted-foreground">
                            …
                        </span>
                    ) : (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            preserveScroll
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-medium ${
                                link.active
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ),
                )}

                <NavButton link={nextLink} icon={<ChevronRight className="h-4 w-4" />} />
            </div>
        </div>
    );
}

function NavButton({ link, icon }: { link: PaginationLink; icon: ReactNode }) {
    if (!link.url) {
        return (
            <button
                type="button"
                disabled
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground disabled:pointer-events-none disabled:opacity-40"
            >
                {icon}
            </button>
        );
    }

    return (
        <Link
            href={link.url}
            preserveScroll
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
        >
            {icon}
        </Link>
    );
}

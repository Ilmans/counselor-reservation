import type { CounselorDetail } from '@/types/counselor';

type Props = {
    counselor: CounselorDetail;
};

function StarIcon({ className = 'h-4 w-4' }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
            <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
        </svg>
    );
}

function CounselorHero({ counselor }: Props) {
    return (
        <div className="border-b border-border bg-card">
            <div className="mx-auto max-w-5xl px-6 py-10 sm:py-12">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    {counselor.photo ? (
                        <img
                            src={counselor.photo}
                            alt={counselor.name}
                            className="h-24 w-24 flex-shrink-0 rounded-lg object-cover sm:h-28 sm:w-28"
                        />
                    ) : (
                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-2xl font-semibold text-foreground sm:h-28 sm:w-28">
                            {counselor.name.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            {counselor.specialization?.name ?? 'Konselor'}
                        </p>
                        <h1 className="mt-1 font-serif text-2xl font-normal text-foreground sm:text-3xl">
                            {counselor.name}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                                <StarIcon className="h-4 w-4 text-primary" />
                                {counselor.rating.toFixed(1)}
                                <span className="font-normal text-muted-foreground">
                                    ({counselor.total_reviews} ulasan)
                                </span>
                            </span>

                            {counselor.categories.length > 0 && (
                                <span className="hidden h-3.5 w-px bg-border sm:inline-block" />
                            )}

                            <div className="flex flex-wrap gap-1.5">
                                {counselor.categories.map((cat) => (
                                    <span
                                        key={cat.id}
                                        className="rounded border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground"
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CounselorHero;

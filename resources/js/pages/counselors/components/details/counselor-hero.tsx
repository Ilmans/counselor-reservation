import ReservationController from '@/actions/App/Http/Controllers/ReservationController';
import type { CounselorDetail } from '@/types/counselor';
import { Link } from '@inertiajs/react';
import { Calendar } from 'lucide-react';

type Props = {
    counselor: CounselorDetail;
};

function StarIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-primary"
        >
            <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
        </svg>
    );
}

function CounselorHero({ counselor }: Props) {
    return (
        <div className="relative overflow-hidden px-6 pt-14 pb-10 sm:pt-20">
            {/* Ambient breathing glow — signature motif yang sama dari halaman list */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="breathing-orb absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="breathing-orb-slow absolute top-8 right-0 h-96 w-96 rounded-full bg-primary/[0.06] blur-3xl" />
            </div>
            <style>{`
                @keyframes orb-breathe {
                    0%, 100% { transform: scale(1); opacity: 0.9; }
                    50% { transform: scale(1.15); opacity: 0.5; }
                }
                .breathing-orb { animation: orb-breathe 8s ease-in-out infinite; }
                .breathing-orb-slow { animation: orb-breathe 11s ease-in-out infinite reverse; }
                @media (prefers-reduced-motion: reduce) {
                    .breathing-orb, .breathing-orb-slow { animation: none; }
                }
            `}</style>

            <div className="relative mx-auto max-w-5xl">
                <div className="flex flex-col items-start gap-6 rounded-[32px] border border-border/60 bg-card/90 p-6 shadow-lg backdrop-blur-sm sm:flex-row sm:items-center sm:p-8">
                    {counselor.photo ? (
                        <img
                            src={counselor.photo}
                            alt={counselor.name}
                            className="h-24 w-24 flex-shrink-0 rounded-3xl object-cover ring-2 ring-border/50 sm:h-28 sm:w-28"
                        />
                    ) : (
                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-3xl bg-primary/10 text-2xl font-semibold text-primary ring-2 ring-border/50 sm:h-28 sm:w-28">
                            {counselor.name.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="font-serif text-2xl font-normal text-foreground sm:text-3xl">
                                {counselor.name}
                            </h1>
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                                <StarIcon />
                                {counselor.rating.toFixed(1)}
                                <span className="font-normal text-primary/70">
                                    ({counselor.total_reviews})
                                </span>
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {counselor.specialization?.name ?? 'Konselor'}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {counselor.categories.map((cat) => (
                                <span
                                    key={cat.id}
                                    className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary"
                                >
                                    {cat.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex w-full flex-shrink-0 flex-col items-stretch gap-2 sm:w-auto sm:items-end">
                        <span className="text-right text-lg font-semibold text-foreground">
                            {counselor.pricing.label}
                        </span>

                        <Link
                            href={ReservationController.create.url(
                                counselor.slug,
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="group/btn inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-6 py-1 text-sm font-semibold text-background transition-all duration-300 hover:gap-2.5 hover:bg-primary"
                        >
                            Buat reservasi
                            <Calendar />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CounselorHero;

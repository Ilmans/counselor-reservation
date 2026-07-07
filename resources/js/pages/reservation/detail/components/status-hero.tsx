import { Link } from '@inertiajs/react';
import { ArrowUpRight, Star, X } from 'lucide-react';
import type { ConsultationDetail } from '@/types/consultation';
import type { Review } from '@/types/review';
import {
    JOURNEY,
    journeyIndex,
    STATUS_META,
    TONE_ACCENT_BORDER,
    TONE_STYLES,
    statusDescription,
} from '../components/consultationstatus';

function StatusHero({
    r,
    onOpenCancel,
    onOpenReview,
    feedback,
}: {
    r: ConsultationDetail;
    onOpenCancel: () => void;
    onOpenReview: () => void;
    feedback : Review;
}) {
    const meta = STATUS_META[r.status];
    const Icon = meta.icon;
    const isLive = r.status === 'in_progress' || r.status === 'in_queue';
    const isBroken = r.status_group === 'cancelled';
    const activeIdx = journeyIndex(r.status);
    const progressPct = Math.round((activeIdx / (JOURNEY.length - 1)) * 100);

    return (
        <div
            className={`rounded-2xl border border-l-4 border-border bg-card p-5 sm:p-6 ${TONE_ACCENT_BORDER[meta.tone]}`}
        >
            <div className="flex items-start gap-3.5">
                <span
                    className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${TONE_STYLES[meta.tone]}`}
                >
                    {isLive && (
                        <span className="pulse-dot absolute inset-0 rounded-full bg-current opacity-20" />
                    )}
                    <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                    <h1 className="font-serif text-lg leading-snug text-foreground sm:text-xl">
                        {meta.title}
                    </h1>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {statusDescription(r)}
                    </p>
                </div>
            </div>

            {!isBroken && (
                <div className="mt-5">
                    <svg
                        viewBox="0 0 400 8"
                        className="h-2 w-full text-primary/25"
                        preserveAspectRatio="none"
                        aria-hidden
                    >
                        <path
                            d="M0,4 C40,0 80,8 120,4 C160,0 200,8 240,4 C280,0 320,8 360,4 C380,2 390,4 400,4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="animate-draw-wave"
                        />
                    </svg>

                    <div className="relative mt-4 h-7">
                        <div className="absolute top-3 right-0 left-0 h-1 rounded-full bg-muted" />
                        <div
                            className="absolute top-3 left-0 h-1 rounded-full bg-primary transition-all"
                            style={{ width: `${progressPct}%` }}
                        />
                        <ol className="relative flex items-start justify-between">
                            {JOURNEY.map((step, i) => {
                                const StepIcon = step.icon;
                                const done = i < activeIdx;
                                const active = i === activeIdx;

                                return (
                                    <li
                                        key={step.key}
                                        className="flex flex-1 flex-col items-center"
                                    >
                                        <span
                                            className={`z-10 flex h-6 w-6 items-center justify-center rounded-full border ${
                                                done
                                                    ? 'border-primary bg-primary text-primary-foreground'
                                                    : active
                                                      ? 'breathing-glow border-primary bg-card text-primary'
                                                      : 'border-border bg-card text-muted-foreground'
                                            }`}
                                        >
                                            <StepIcon size={11} />
                                        </span>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    <div className="mt-1.5 flex justify-between text-[10.5px] text-muted-foreground">
                        {JOURNEY.map((step, i) => (
                            <span
                                key={step.key}
                                className={`flex-1 text-center ${i <= activeIdx ? 'font-medium text-foreground' : ''}`}
                            >
                                {step.label}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {r.status === 'pending_confirmation' && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-border px-4 py-3">
                    <p className="text-xs text-muted-foreground">
                        Pembatalan hanya dapat dilakukan sebelum konselor
                        mengonfirmasi.
                    </p>
                    <button
                        type="button"
                        onClick={onOpenCancel}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground transition hover:border-foreground/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                        <X size={13} /> Batalkan
                    </button>
                </div>
            )}

            {r.status === 'completed' &&
                (feedback ? (
                    <div className="mt-5 rounded-xl border border-border bg-secondary/40 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-foreground">
                                Ulasanmu
                            </p>
                            <span className="text-[10.5px] text-muted-foreground">
                                {feedback.created_at}
                            </span>
                        </div>
                        <div className="mt-1.5 flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={
                                        i < feedback.rating
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-muted-foreground/30'
                                    }
                                />
                            ))}
                        </div>
                        {feedback.comment && (
                            <p className="mt-1.5 text-xs text-muted-foreground">
                                {feedback.comment}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-3">
                        <p className="text-xs text-foreground/80">
                            Bagikan pengalamanmu bersama{' '}
                            {r.counselor.name.split(',')[0]}.
                        </p>
                        <button
                            type="button"
                            onClick={onOpenReview}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            <Star size={13} /> Beri Ulasan
                        </button>
                    </div>
                ))}

            {(r.status === 'cancelled' || r.status === 'rejected') && (
                <div className="mt-5">
                    <Link
                        href="/counselors"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                        Cari jadwal baru <ArrowUpRight size={13} />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default StatusHero;

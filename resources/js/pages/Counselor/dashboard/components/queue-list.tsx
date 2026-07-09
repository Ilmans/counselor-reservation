import { Link } from '@inertiajs/react';
import { ChevronRight, Clock, MapPin, Video } from 'lucide-react';
import ConsultationController from '@/actions/App/Http/Controllers/Counselor/ConsultationController';
import { EmptyState } from '@/components/empty-state';
import { Badge } from '@/components/ui/badge';
import { CONSULTATION_STATUS_CLASSES } from '@/types/badge';
import type { QueueItem } from '../type';

interface Props {
    title: string;
    eyebrow: string;
    items: QueueItem[];
    emptyText: string;
    showViewAll?: boolean;
}

function QueueList({ title, eyebrow, items, emptyText, showViewAll = true }: Props) {
    return (
        <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                        {eyebrow}
                    </p>
                    <h2 className="text-lg" style={{ fontFamily: "'Fraunces', serif" }}>
                        {title}
                    </h2>
                </div>
                {showViewAll && (
                    <Link
                        href={ConsultationController.index.url()}
                        className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary"
                    >
                        <span className="hidden sm:inline">Lihat semua</span>
                        <ChevronRight size={15} />
                    </Link>
                )}
            </div>

            {items.length === 0 ? (
                <EmptyState title="Tidak ada data" description={emptyText} />
            ) : (
                <div className="space-y-2.5">
                    {items.map((q) => (
                        <Link
                            key={q.id}
                            href={ConsultationController.show.url({ reference: q.reference })}
                            className="flex flex-col gap-2.5 rounded-xl bg-muted px-3.5 py-3 transition-opacity hover:opacity-80 sm:flex-row sm:items-center sm:gap-3"
                        >
                            <div className="flex shrink-0 items-center justify-between gap-2 sm:w-28 sm:flex-col sm:items-start sm:justify-start">
                                <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                                    <Clock size={13} className="text-muted-foreground" />
                                    {q.time}
                                </span>
                                {q.date && (
                                    <span className="text-[11px] text-muted-foreground">{q.date}</span>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                    {q.is_anonymous ? 'Klien Anonim' : q.client}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-muted-foreground">{q.category}</p>
                            </div>

                            <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                {q.method === 'online' ? <Video size={13} /> : <MapPin size={13} />}
                                {q.method === 'online' ? 'Online' : 'Tatap muka'}
                            </div>

                            <span className="shrink-0">
                                <Badge className={CONSULTATION_STATUS_CLASSES[q.status]}>{q.status_label}</Badge>
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default QueueList;
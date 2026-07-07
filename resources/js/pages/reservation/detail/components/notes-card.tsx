import DOMPurify from 'dompurify';
import { ChevronDown, MessageSquareText, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import type {
    ConsultationNote,
    ConsultationNoteType,
} from '@/types/consultation';

const NOTE_TYPE_META: Record<
    ConsultationNoteType,
    { label: string; badge: string }
> = {
    pre_session: {
        label: 'Sebelum sesi',
        badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-300',
    },
    session: {
        label: 'Selama sesi',
        badge: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400',
    },
    summary: {
        label: 'Ringkasan sesi',
        badge: 'bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400',
    },
    follow_up: {
        label: 'Tindak lanjut',
        badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
    },
};

const DEFAULT_VISIBLE = 3;
const LONG_TEXT_THRESHOLD = 220;

// Tag yang diizinkan dari rich-text editor konselor. Sengaja dibatasi ketat —
// tidak ada script/style/iframe/atribut event handler apa pun yang lolos.
const SANITIZE_CONFIG = {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [] as string[],
};

function NoteBody({ html }: { html: string }) {
    const [expanded, setExpanded] = useState(false);

    const clean = useMemo(
        () => DOMPurify.sanitize(html, SANITIZE_CONFIG),
        [html],
    );
    const isLong = useMemo(
        () => html.replace(/<[^>]+>/g, '').length > LONG_TEXT_THRESHOLD,
        [html],
    );

    return (
        <div>
            <div
                className={`text-sm text-foreground [&_ol]:my-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:my-1 [&_ul]:my-1 [&_ul]:list-disc [&_ul]:pl-4 ${
                    isLong && !expanded ? 'line-clamp-3' : ''
                }`}
                // Konten sudah disanitasi lewat DOMPurify di atas — jangan
                // pernah render note.content mentah tanpa lewat NoteBody ini.
                dangerouslySetInnerHTML={{ __html: clean }}
            />
            {isLong && (
                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="mt-1 text-[11px] font-medium text-primary hover:underline"
                >
                    {expanded ? 'Tampilkan lebih sedikit' : 'Baca selengkapnya'}
                </button>
            )}
        </div>
    );
}

function NotesCard({
    notes,
    excludeNoteId,
}: {
    notes: ConsultationNote[];
    excludeNoteId?: string | null;
}) {
    const [showAll, setShowAll] = useState(false);

    // Klien hanya boleh melihat catatan yang memang dibagikan konselor, dan
    // tidak perlu melihat catatan yang sama persis dengan yang sudah
    // ditampilkan di StatusHero (mis. alasan pembatalan).
    const visibleNotes = notes.filter(
        (note) => note.visibility === 'shared' && note.id !== excludeNoteId,
    );

    // Ringkasan sesi paling relevan buat klien baca ulang — naikkan ke atas,
    // biar tidak tenggelam di antara banyak catatan sesi-sesi sebelumnya.
    const ordered = useMemo(() => {
        const summaries = visibleNotes.filter((n) => n.type === 'summary');
        const rest = visibleNotes.filter((n) => n.type !== 'summary');
        return [...summaries, ...rest];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notes, excludeNoteId]);

    if (ordered.length === 0) {
        return null;
    }

    const displayed = showAll ? ordered : ordered.slice(0, DEFAULT_VISIBLE);
    const hiddenCount = ordered.length - displayed.length;

    return (
        <div className="rounded-2xl border border-border bg-card p-4">
            <p className="mb-3 flex items-center gap-2 font-serif text-base text-foreground">
                <MessageSquareText size={15} /> Catatan
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
                    {ordered.length}
                </span>
            </p>

            <div className="space-y-3">
                {displayed.map((note) => {
                    const meta = NOTE_TYPE_META[note.type];
                    const isSummary = note.type === 'summary';

                    return (
                        <div
                            key={note.id}
                            className={`rounded-xl p-3.5 ${
                                isSummary
                                    ? 'border border-teal-200 bg-teal-50/40 dark:border-teal-900/50 dark:bg-teal-950/10'
                                    : 'border border-border/70 bg-secondary/30'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.badge}`}
                                >
                                    {isSummary && <Sparkles size={10} />}
                                    {meta.label}
                                </span>
                                <span className="shrink-0 text-[11px] text-muted-foreground/70">
                                    {note.created_at}
                                </span>
                            </div>
                            <div className="mt-1.5">
                                <NoteBody html={note.content} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {hiddenCount > 0 && (
                <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="mt-3 flex w-full items-center justify-center gap-1 rounded-full border border-border py-2 text-xs font-medium text-muted-foreground transition hover:border-foreground/40 hover:text-foreground"
                >
                    Lihat {hiddenCount} catatan lainnya{' '}
                    <ChevronDown size={13} />
                </button>
            )}
        </div>
    );
}

export default NotesCard;

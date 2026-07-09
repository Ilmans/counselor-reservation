import {
    AlertTriangle,
    CalendarCheck,
    ClipboardList,
    MessageSquareText,
    Sparkles,
} from 'lucide-react';
import type {
    ConsultationNote,
    ConsultationNoteType,
} from '@/types/consultation';

interface Props {
    notes: ConsultationNote[];
}
const NOTE_TYPE_CONFIG: Record<
    ConsultationNoteType,
    {
        label: string;
        icon: React.ElementType;
    }
> = {
    pre_session: {
        label: 'Keluhan Awal',
        icon: MessageSquareText,
    },
    session: {
        label: 'Catatan Sesi',
        icon: ClipboardList,
    },
    summary: {
        label: 'Ringkasan',
        icon: Sparkles,
    },
    follow_up: {
        label: 'Tindak Lanjut',
        icon: CalendarCheck,
    },
    cancellation: {
        label: 'Pembatalan',
        icon: AlertTriangle,
    },
};

function ConsultationNotes({ notes }: Props) {
    if (notes.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-border/70 p-5 text-center">
                <p className="text-sm text-muted-foreground">
                    Belum ada catatan untuk sesi ini.
                </p>
            </div>
        );
    }

    return (
        <>
            <p className="mb-3 flex items-center gap-2 font-serif text-base text-foreground">
                Catatan Konsultasi
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
                    {notes.length}
                </span>
            </p>
            <div className="max-h-80 space-y-2.5 overflow-y-auto pr-1">
                {notes.map((note) => {
                    const config = NOTE_TYPE_CONFIG[note.type];
                    const Icon = config.icon;
                    const isPreSession = note.type === 'pre_session';

                    return (
                        <div
                            key={note.id}
                            className="rounded-xl border border-border/70 bg-card p-3.5"
                        >
                            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-foreground/80 uppercase">
                                    <Icon
                                        size={12}
                                        className="text-muted-foreground"
                                    />
                                    {config.label}
                                </span>
                                <span className="text-[11px] text-muted-foreground/70">
                                    {note.created_at}
                                </span>
                            </div>

                            {/* content sudah HTML tersanitasi dari backend
                            (lihat catatan produksi di RichTextEditor) */}
                            <div
                                className="prose prose-sm dark:prose-invert mt-2 max-w-none text-sm text-foreground [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:my-0 [&_ul]:list-disc [&_ul]:pl-4"
                                dangerouslySetInnerHTML={{
                                    __html: note.content,
                                }}
                            />

                            {!isPreSession && (
                                <span className="mt-2 inline-block text-[11px] text-muted-foreground">
                                    {note.visibility === 'shared'
                                        ? 'Dibagikan ke klien'
                                        : 'Khusus konselor'}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ConsultationNotes;

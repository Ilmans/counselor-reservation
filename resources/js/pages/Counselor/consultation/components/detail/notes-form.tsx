import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type {
    ConsultationNoteType,
    ConsultationNoteVisibility,
} from '@/types/consultation';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

interface Props {
    consultationId: number;
    onSaved?: () => void;
}

// 'pre_session' sengaja tidak dimasukkan di sini — itu keluhan awal
// yang ditulis klien sendiri, bukan kategori catatan yang dibuat konselor.
// 'cancellation' juga tidak dimasukkan, asumsinya catatan itu dibuat
// otomatis saat aksi batalkan/tolak (lihat modal Tolak di StatusHero),
// bukan lewat form catatan manual ini.
const KATEGORI_OPTIONS: { key: ConsultationNoteType; label: string }[] = [
    { key: 'session', label: 'Saat Sesi' },
    { key: 'summary', label: 'Ringkasan' },
    { key: 'follow_up', label: 'Tindak Lanjut' },
];

function NotesForm({ consultationId, onSaved }: Props) {
    const [kategori, setKategori] = useState<ConsultationNoteType>('session');
    const [visibilitas, setVisibilitas] =
        useState<ConsultationNoteVisibility>('shared');
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    function resetForm() {
        setContent('');
        setKategori('session');
        setVisibilitas('shared');
    }

    async function handleSubmit() {
        const trimmed = content.trim();
        if (!trimmed || trimmed === '<p><br></p>') {
            setError('Catatan tidak boleh kosong.');
            return;
        }
        setError(null);
        setProcessing(true);

        // TODO: router.post(route('consultation.notes.store', consultationId), {
        //     type: kategori,
        //     visibility: visibilitas,
        //     content,
        // }, {
        //     preserveScroll: true,
        //     onSuccess: () => resetForm(),
        //     onFinish: () => setProcessing(false),
        // });

        console.log('[CatatanForm] submit note', {
            consultationId,
            type: kategori,
            visibility: visibilitas,
            content,
        });

        setProcessing(false);
        resetForm();
        onSaved?.();
    }

    return (
        <div className="rounded-xl border border-dashed border-border p-4">
            <p className="text-xs font-medium text-foreground">
                Tulis Catatan Baru
            </p>

            <div className="mt-2.5">
                <p className="mb-1.5 text-[11px] text-muted-foreground">
                    Kategori
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {KATEGORI_OPTIONS.map((opt) => (
                        <button
                            key={opt.key}
                            type="button"
                            onClick={() => setKategori(opt.key)}
                            className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                                kategori === opt.key
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-3">
                <RichTextEditor
                    value={content}
                    onChange={(html) => {
                        setContent(html);
                        if (error) setError(null);
                    }}
                    placeholder="Tulis catatan di sini..."
                    error={error ?? undefined}
                />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex overflow-hidden rounded-full border border-border text-[11px] font-medium">
                    <button
                        type="button"
                        onClick={() => setVisibilitas('shared')}
                        className={`px-3 py-1.5 transition ${
                            visibilitas === 'shared'
                                ? 'bg-secondary text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        Bagikan ke klien
                    </button>
                    <button
                        type="button"
                        onClick={() => setVisibilitas('counselor_only')}
                        className={`border-l border-border px-3 py-1.5 transition ${
                            visibilitas === 'counselor_only'
                                ? 'bg-secondary text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        Khusus konselor
                    </button>
                </div>

                <Button
                    variant="default"
                    mode="filled"
                    size="sm"
                    loading={processing}
                    onClick={handleSubmit}
                    className="!rounded-full"
                >
                    Simpan Catatan
                </Button>
            </div>
        </div>
    );
}

export default NotesForm;

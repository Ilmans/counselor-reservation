import { Loader2, Send } from 'lucide-react';
import { useState, type FormEvent, type KeyboardEvent } from 'react';

interface ConsultationChatFormProps {
    disabled: boolean;
    disabledReason?: string;
    onSend: (message: string) => Promise<void>;
}

export default function ConsultationChatForm({
    disabled,
    disabledReason,
    onSend,
}: ConsultationChatFormProps) {
    const [draft, setDraft] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e?: FormEvent) {
        e?.preventDefault();
        const text = draft.trim();
        if (!text || sending) return;

        setError(null);
        setSending(true);
        setDraft('');

        try {
            await onSend(text);
        } catch {
            setError('Pesan gagal terkirim, coba lagi.');
            setDraft(text); // kembalikan draft supaya user tidak perlu ngetik ulang
        } finally {
            setSending(false);
        }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    if (disabled) {
        return (
            <div className="border-t border-border bg-muted/30 p-4 text-center">
                <p className="text-sm font-medium text-foreground">
                    Chat belum tersedia
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                    {disabledReason ??
                        'Chat akan aktif setelah konsultasi dikonfirmasi.'}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="border-t border-border p-3">
            {error && (
                <p className="mb-2 px-1 text-[11px] text-red-500">{error}</p>
            )}

            <div className="flex items-end gap-2">
                <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Tulis pesan…"
                    className="max-h-28 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                />

                <button
                    type="submit"
                    disabled={!draft.trim() || sending}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {sending ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Send size={16} />
                    )}
                </button>
            </div>
        </form>
    );
}

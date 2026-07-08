import { ReactNode, useEffect, useId, useRef } from 'react';
import { Bold, Italic, List, ListOrdered, Underline } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RichTextEditorProps {
    label?: string;
    error?: string;
    hint?: string;
    /** HTML awal / terkontrol dari luar (mis. saat reset form) */
    value?: string;
    /** HTML awal kalau editor dipakai tanpa kontrol penuh */
    defaultValue?: string;
    /** Dipanggil tiap kali isi editor berubah, membawa HTML terbaru */
    onChange?: (html: string) => void;
    placeholder?: string;
    name?: string;
    className?: string;
}

/**
 * Editor teks kaya (rich text) global, dipakai layaknya Input/Textarea
 * lainnya. Berbasis contentEditable + execCommand seperti CatatanEditor
 * asli — tanpa dependency tambahan, siap dipakai di form manapun.
 *
 * Catatan produksi:
 * - execCommand sudah deprecated di sebagian browser tapi masih didukung
 *   luas. Untuk jangka panjang, pertimbangkan ganti dengan
 *   "react-simple-wysiwyg" (~4kb) yang outputnya tetap HTML polos.
 * - Karena berbasis contentEditable, komponen ini "semi-terkontrol":
 *   `value`/`defaultValue` cuma dipakai untuk mengisi konten AWAL (dan saat
 *   `value` berubah dari luar, mis. reset form) — bukan disinkronkan tiap
 *   ketikan, supaya posisi kursor tidak lompat-lompat.
 * - Selalu sanitize HTML hasil editor ini di backend (mis. DOMPurify /
 *   HTMLPurifier) sebelum disimpan atau ditampilkan ke pengguna lain.
 */
export function RichTextEditor({
    label,
    error,
    hint,
    value,
    defaultValue,
    onChange,
    placeholder = 'Tulis di sini...',
    name,
    className,
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const generatedId = useId();
    const editorId = name ?? generatedId;

    // Isi konten awal, atau sinkronkan ulang kalau `value` berubah dari
    // luar (mis. form di-reset). Tidak dijalankan tiap ketikan.
    useEffect(() => {
        if (!editorRef.current) return;
        const html = value ?? defaultValue ?? '';
        if (editorRef.current.innerHTML !== html) {
            editorRef.current.innerHTML = html;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    function handleInput() {
        if (!editorRef.current) return;
        onChange?.(editorRef.current.innerHTML);
    }

    function format(command: string) {
        editorRef.current?.focus();
        document.execCommand(command);
        handleInput();
    }

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <span className="text-[11px] font-medium text-muted-foreground">
                    {label}
                </span>
            )}

            <div
                className={cn(
                    'overflow-hidden rounded-lg border border-border transition-colors focus-within:border-primary',
                    error && 'border-destructive focus-within:border-destructive',
                    className,
                )}
            >
                <div className="flex items-center gap-1 border-b border-border bg-secondary/40 px-2 py-1.5">
                    <ToolbarButton label="Tebal" onClick={() => format('bold')}>
                        <Bold size={13} />
                    </ToolbarButton>
                    <ToolbarButton label="Miring" onClick={() => format('italic')}>
                        <Italic size={13} />
                    </ToolbarButton>
                    <ToolbarButton label="Garis bawah" onClick={() => format('underline')}>
                        <Underline size={13} />
                    </ToolbarButton>
                    <span className="mx-1 h-4 w-px bg-border" />
                    <ToolbarButton
                        label="Daftar bullet"
                        onClick={() => format('insertUnorderedList')}
                    >
                        <List size={13} />
                    </ToolbarButton>
                    <ToolbarButton
                        label="Daftar bernomor"
                        onClick={() => format('insertOrderedList')}
                    >
                        <ListOrdered size={13} />
                    </ToolbarButton>
                </div>

                <div
                    ref={editorRef}
                    id={editorId}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    data-placeholder={placeholder}
                    className={cn(
                        'min-h-[120px] px-3 py-2.5 text-[13px] text-foreground outline-none',
                        '[&_ol]:list-decimal [&_ol]:pl-4 [&_ul]:list-disc [&_ul]:pl-4',
                        'empty:before:text-muted-foreground/60 empty:before:content-[attr(data-placeholder)]',
                    )}
                />
            </div>

            {error ? (
                <span className="text-[11px] text-red-400 text-destructive">{error}</span>
            ) : hint ? (
                <span className="text-[11px]  text-muted-foreground">{hint}</span>
            ) : null}
        </div>
    );
}

function ToolbarButton({
    onClick,
    label,
    children,
}: {
    onClick: () => void;
    label: string;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={label}
            aria-label={label}
            className="rounded p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
            {children}
        </button>
    );
}

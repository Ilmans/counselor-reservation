import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AvatarUploadProps {
    currentAvatarUrl?: string | null;
    onChange: (file: File | null) => void;
    error?: string;
}

export function AvatarUpload({
    currentAvatarUrl,
    onChange,
    error,
}: AvatarUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(
        currentAvatarUrl ?? null,
    );

    // bersihkan object URL lama supaya tidak bocor memori
    useEffect(() => {
        return () => {
            if (preview && preview.startsWith('blob:')) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        onChange(file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    return (
        <div className="flex items-center gap-4">
            <div
                className={cn(
                    'h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-muted',
                    error && 'border-destructive',
                )}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Foto profil"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                        Foto
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="rounded-lg border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-muted"
                    >
                        Ganti Foto
                    </button>
                    {preview && (
                        <button
                            type="button"
                            onClick={() => {
                                setPreview(null);
                                onChange(null);
                                if (inputRef.current)
                                    inputRef.current.value = '';
                            }}
                            className="hover:text-destructive rounded-lg px-3 py-1.5 text-[12px] font-medium text-muted-foreground transition-colors"
                        >
                            Hapus
                        </button>
                    )}
                </div>
                <span className="text-[11px] text-muted-foreground">
                    JPG atau PNG, maks 2MB
                </span>
                {error && (
                    <span className="text-destructive text-[11px]">
                        {error}
                    </span>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}

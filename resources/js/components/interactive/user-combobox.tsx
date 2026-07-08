import AdminUserSearchController from '@/actions/App/Http/Controllers/Admin/AdminUserSearchController';
import { useEffect, useRef, useState } from 'react';

export interface UserOption {
    id: number;
    name: string;
    email: string;
}

interface Props {
    value: number | null;
    onChange: (userId: number | null, user: UserOption | null) => void;
    error?: string;
    placeholder?: string;
    minChars?: number;
}

// Ganti / tambah endpoint di sini kalau perlu, tanpa perlu ubah props dari luar.
const SEARCH_URL = AdminUserSearchController.search.url();
const DEBOUNCE_MS = 300;
const MAX_RESULTS_HINT = 10; // harus sinkron dengan limit() di backend

export function UserCombobox({
    value,
    onChange,
    error,
    placeholder = 'Cari nama atau email user...',
    minChars = 2,
}: Props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState<UserOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<UserOption | null>(null);
    const [highlighted, setHighlighted] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>();
    const abortRef = useRef<AbortController>();

    // Kalau value di-reset dari luar (misal form di-reset), sinkronkan label yang tampil.
    useEffect(() => {
        if (value === null) setSelected(null);
    }, [value]);

    // Tutup dropdown saat klik di luar komponen.
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
                setQuery('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch dengan debounce + abort. Tidak fetch sama sekali kalau query
    // masih di bawah minChars (perf: hindari hit backend untuk data besar).
    useEffect(() => {
        clearTimeout(debounceRef.current);

        if (!open || query.trim().length < minChars) {
            setOptions([]);
            setLoading(false);
            abortRef.current?.abort();
            return;
        }

        setLoading(true);
        debounceRef.current = setTimeout(async () => {
            abortRef.current?.abort();
            const controller = new AbortController();
            abortRef.current = controller;

            try {
                const res = await fetch(
                    `${SEARCH_URL}?q=${encodeURIComponent(query.trim())}`,
                    {
                        headers: { Accept: 'application/json' },
                        signal: controller.signal,
                    },
                );
                if (!res.ok) throw new Error('Request failed');
                const json = await res.json();
                const list: UserOption[] = Array.isArray(json)
                    ? json
                    : (json.data ?? []);
                setOptions(list);
                setHighlighted(0);
            } catch (e) {
                if ((e as Error).name !== 'AbortError') setOptions([]);
            } finally {
                setLoading(false);
            }
        }, DEBOUNCE_MS);

        return () => clearTimeout(debounceRef.current);
    }, [query, open, minChars]);

    // Bersihkan abort controller saat unmount.
    useEffect(() => {
        return () => abortRef.current?.abort();
    }, []);

    function selectUser(u: UserOption) {
        setSelected(u);
        onChange(u.id, u);
        setOpen(false);
        setQuery('');
    }

    function clearSelection() {
        setSelected(null);
        onChange(null, null);
    }

    function openDropdown() {
        setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!open || options.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlighted((i) => Math.min(i + 1, options.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlighted((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const u = options[highlighted];
            if (u) selectUser(u);
        } else if (e.key === 'Escape') {
            setOpen(false);
            setQuery('');
        }
    }

    const showMinCharsHint =
        open && query.trim().length > 0 && query.trim().length < minChars;
    const showEmpty =
        open &&
        !loading &&
        query.trim().length >= minChars &&
        options.length === 0;
    const showIdleHint = open && query.trim().length === 0;

    return (
        <div className="flex flex-col gap-1.5" ref={containerRef}>
            <span className="text-[11px] font-medium text-gray-500">
                Akun Pengguna (User)
            </span>

            <div className="relative">
                {!open ? (
                    <button
                        type="button"
                        onClick={openDropdown}
                        className={`flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 text-left text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
                            error ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        {selected ? (
                            <span className="truncate">
                                {selected.name}{' '}
                                <span className="text-gray-500">
                                    ({selected.email})
                                </span>
                            </span>
                        ) : (
                            <span className="text-gray-400">{placeholder}</span>
                        )}
                        <span className="ml-2 shrink-0 text-gray-400">▾</span>
                    </button>
                ) : (
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ketik nama atau email..."
                        className="flex h-10 w-full items-center rounded-md border border-blue-500 bg-white px-3 text-sm text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                )}

                {open && (
                    <div className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
                        {loading && (
                            <div className="flex items-center justify-center gap-2 py-4 text-xs text-gray-500">
                                <span className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                                Mencari...
                            </div>
                        )}

                        {showIdleHint && !loading && (
                            <div className="px-3 py-4 text-xs text-gray-500">
                                Ketik untuk mulai mencari.
                            </div>
                        )}

                        {showMinCharsHint && !loading && (
                            <div className="px-3 py-4 text-xs text-gray-500">
                                Ketik minimal {minChars} karakter untuk mencari.
                            </div>
                        )}

                        {showEmpty && (
                            <div className="px-3 py-4 text-xs text-gray-500">
                                Tidak ada user ditemukan.
                            </div>
                        )}

                        {!loading &&
                            options.map((u, i) => (
                                <div
                                    key={u.id}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => selectUser(u)}
                                    onMouseEnter={() => setHighlighted(i)}
                                    className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm ${
                                        i === highlighted ? 'bg-gray-100' : ''
                                    }`}
                                >
                                    <span
                                        className={`w-4 shrink-0 text-blue-600 ${
                                            value === u.id
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        }`}
                                    >
                                        ✓
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-gray-900">
                                            {u.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {u.email}
                                        </span>
                                    </div>
                                </div>
                            ))}

                        {!loading && options.length >= MAX_RESULTS_HINT && (
                            <div className="border-t border-gray-100 px-3 py-1.5 text-[11px] text-gray-400">
                                Hasil dibatasi {MAX_RESULTS_HINT}. Perjelas kata
                                kunci untuk hasil lebih spesifik.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {selected && !open && (
                <button
                    type="button"
                    onClick={clearSelection}
                    className="self-start text-[11px] text-gray-400 hover:text-red-500"
                >
                    Hapus pilihan
                </button>
            )}

            {error && <p className="text-[11px] text-red-500">{error}</p>}
        </div>
    );
}

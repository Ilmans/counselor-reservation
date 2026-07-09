import { useRef, useState } from 'react';
import {
    CheckCircle2,
    Clock,
    Copy,
    ExternalLink,
    History,
    PhoneCall,
    PlayCircle,
    ShieldCheck,
    Sparkles,
    Star,
    Users,
    Video,
    XCircle,
} from 'lucide-react';

// =====================================================================
// TEMPLATE — SISI KONSELOR (halaman detail 1 konsultasi)
// Satu file, data dummy di-hardcode langsung di JSX. Tidak menggunakan
// warna hardcode — semua warna struktural memakai token dari app.css
// (bg-background, bg-card, border-border, text-muted-foreground,
// bg-secondary, bg-primary, text-primary-foreground), sama seperti
// halaman sisi klien. Warna aksen kategori (teal/blue/amber/slate) tetap
// memakai palet Tailwind literal, konsisten dengan NotesCard sisi klien.
//
// Status hanya menampilkan SATU aksi yang relevan (bukan menumpuk semua
// tombol), mengikuti pola conditional-per-status pada StatusHero asli:
//   - pending_confirmation → tombol "Konfirmasi" & "Tolak"
//   - confirmed            → tombol "Mulai Sesi"   (ditampilkan di bawah)
//   - in_progress          → tombol "Tandai Sesi Selesai"
//   - completed            → tanpa aksi, hanya informasi
// Konselor TIDAK memiliki aksi membatalkan sesi — pembatalan hanya
// dilakukan klien (sebelum konfirmasi) atau tim support.
// =====================================================================

const STATUS = 'confirmed'; // ganti untuk melihat konteks status lain

function CatatanEditor() {
    const editorRef = useRef(null);

    // Rich text minimal berbasis contentEditable + execCommand — tanpa
    // dependency tambahan, sehingga siap dipakai langsung di sini.
    // Untuk versi produksi, ganti isi <div contentEditable> ini dengan
    // komponen <Editor> dari "react-simple-wysiwyg" (≈4kb, tanpa
    // dependency berat, output-nya HTML polos yang cocok dengan daftar
    // tag yang sudah diizinkan lewat DOMPurify: p, br, strong, em, u,
    // ul, ol, li). Cukup `npm install react-simple-wysiwyg`.
    const format = (command) => {
        editorRef.current?.focus();
        document.execCommand(command);
    };

    return (
        <div className="overflow-hidden rounded-lg border border-border">
            <div className="flex items-center gap-1 border-b border-border bg-secondary/40 px-2 py-1.5">
                <button
                    type="button"
                    onClick={() => format('bold')}
                    className="rounded px-2 py-1 text-xs font-bold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                    B
                </button>
                <button
                    type="button"
                    onClick={() => format('italic')}
                    className="rounded px-2 py-1 text-xs text-muted-foreground italic transition hover:bg-secondary hover:text-foreground"
                >
                    I
                </button>
                <button
                    type="button"
                    onClick={() => format('underline')}
                    className="rounded px-2 py-1 text-xs text-muted-foreground underline transition hover:bg-secondary hover:text-foreground"
                >
                    U
                </button>
                <span className="mx-1 h-4 w-px bg-border" />
                <button
                    type="button"
                    onClick={() => format('insertUnorderedList')}
                    className="rounded px-2 py-1 text-xs text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                    &bull; Daftar
                </button>
                <button
                    type="button"
                    onClick={() => format('insertOrderedList')}
                    className="rounded px-2 py-1 text-xs text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                    1. Daftar
                </button>
            </div>
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-[100px] px-3 py-2.5 text-sm text-foreground focus:outline-none [&_ol]:list-decimal [&_ol]:pl-4 [&_ul]:list-disc [&_ul]:pl-4"
            >
                <p>Tulis catatan konsultasi di sini...</p>
            </div>
        </div>
    );
}

function CatatanForm() {
    const [kategori, setKategori] = useState('session');
    const [visibilitas, setVisibilitas] = useState('shared');

    const kategoriOptions = [
        { key: 'pre_session', label: 'Pra-Sesi' },
        { key: 'session', label: 'Saat Sesi' },
        { key: 'summary', label: 'Ringkasan' },
        { key: 'follow_up', label: 'Tindak Lanjut' },
    ];

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
                    {kategoriOptions.map((opt) => (
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
                <CatatanEditor />
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
                        onClick={() => setVisibilitas('private')}
                        className={`border-l border-border px-3 py-1.5 transition ${
                            visibilitas === 'private'
                                ? 'bg-secondary text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        Khusus konselor
                    </button>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                >
                    Simpan Catatan
                </button>
            </div>
        </div>
    );
}

export default function KonselorDetailKonsultasi() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased">
            <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6 lg:py-10">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-6">
                    <div className="min-w-0 space-y-4">
                     

                        {/* ---- Catatan Konsultasi ---- */}
                        <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="mb-3 flex items-center gap-2 font-serif text-base text-foreground">
                                Catatan Konsultasi
                                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
                                    3
                                </span>
                            </p>

                            <div className="space-y-3">
                                <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-3.5 dark:border-teal-900/50 dark:bg-teal-950/10">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-700 dark:bg-teal-950/30 dark:text-teal-400">
                                            <Sparkles size={10} /> Ringkasan
                                        </span>
                                        <span className="text-[11px] text-muted-foreground/70">
                                            30 Jun 2026
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-sm text-foreground">
                                        Klien melaporkan kualitas tidur mulai
                                        membaik. Latihan pernapasan{' '}
                                        <strong>4-7-8</strong> sudah rutin
                                        dilakukan sebelum tidur.
                                    </p>
                                    <span className="mt-2 inline-block text-[11px] text-teal-700 dark:text-teal-400">
                                        Dibagikan ke klien
                                    </span>
                                </div>

                                <div className="rounded-xl border border-border/70 bg-secondary/30 p-3.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                                            Saat sesi
                                        </span>
                                        <span className="text-[11px] text-muted-foreground/70">
                                            30 Jun 2026
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-sm text-foreground">
                                        Observasi internal: klien masih
                                        menghindari topik keluarga. Perlu
                                        pendekatan bertahap di sesi berikut.
                                    </p>
                                    <span className="mt-2 inline-block text-[11px] text-muted-foreground">
                                        Khusus konselor
                                    </span>
                                </div>

                                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/10">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                                            Tindak lanjut
                                        </span>
                                        <span className="text-[11px] text-muted-foreground/70">
                                            16 Jun 2026
                                        </span>
                                    </div>
                                    <p className="mt-1.5 text-sm text-foreground">
                                        Minta klien mengisi jurnal cemas harian
                                        sebelum sesi berikutnya.
                                    </p>
                                    <span className="mt-2 inline-block text-[11px] text-teal-700 dark:text-teal-400">
                                        Dibagikan ke klien
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <CatatanForm />
                            </div>
                        </div>

                        {/* ---- Ulasan dari Klien ---- */}
                        <div className="rounded-2xl border border-border bg-card p-5">
                            <p className="flex items-center gap-2 font-serif text-base text-foreground">
                                <Star size={15} /> Ulasan dari Klien
                            </p>
                            <div className="mt-3 flex items-center gap-1 text-amber-400">
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star
                                    size={14}
                                    className="text-muted-foreground/30"
                                />
                                <span className="ml-1.5 text-xs font-medium text-foreground">
                                    4.0 / 5
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-foreground">
                                &ldquo;Konselor sangat sabar mendengarkan dan
                                memberi latihan yang mudah dipraktikkan
                                sehari-hari.&rdquo;
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                                Diberikan 30 Juni 2026 &middot; hanya terlihat
                                oleh tim internal
                            </p>
                        </div>
                    </div>

                    {/* ============ SIDEBAR ============ */}
                    <aside className="space-y-3 lg:sticky lg:top-6">
                        {/* Identitas Klien */}
                        <div className="rounded-2xl border border-border bg-card p-5">
                            <div className="flex items-center gap-3">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground/70">
                                    NP
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-serif text-base text-foreground">
                                        Nadia P.
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        Klien sejak Juni 2026
                                    </p>
                                </div>
                            </div>

                            {/* Ditampilkan hanya jika klien tidak anonim */}
                            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Jenis Kelamin
                                    </p>
                                    <p className="mt-0.5 font-medium text-foreground">
                                        Perempuan
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Usia
                                    </p>
                                    <p className="mt-0.5 font-medium text-foreground">
                                        24 tahun
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition hover:border-foreground/40 hover:text-foreground"
                                >
                                    <PhoneCall size={14} /> Hubungi Klien
                                </button>
                            </div>
                        </div>

                        {/* Pengingat Kerahasiaan */}
                        <div className="flex items-start gap-2.5 rounded-2xl border border-teal-200 bg-teal-50/60 p-4 dark:border-teal-900/50 dark:bg-teal-950/20">
                            <ShieldCheck
                                size={16}
                                className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400"
                            />
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-teal-800 dark:text-teal-300">
                                    Jaga kerahasiaan data klien
                                </p>
                                <p className="mt-0.5 text-[11px] leading-relaxed text-teal-700/80 dark:text-teal-400/70">
                                    Catatan dan identitas klien hanya boleh
                                    diakses untuk kepentingan layanan. Hindari
                                    membagikan di luar sistem ini.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

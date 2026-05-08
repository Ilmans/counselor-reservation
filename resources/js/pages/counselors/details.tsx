import Breadcrumb from '@/components/breadcumb';
import Wrapper from '@/layouts/wrapper';
import { Category, Counselor } from '@/types/counselor';
import { getScheduleLabel } from '@/utils/schedule';
import { ReactNode } from 'react';

// ── Shared UI Components ──────────────────────

function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
            {children}
        </span>
    );
}

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
    return (
        <span className="flex items-center gap-0.5">
            {Array.from({ length: max }, (_, i) => (
                <span
                    key={i}
                    className={
                        i < Math.floor(value)
                            ? 'text-xs text-amber-400'
                            : 'text-xs text-zinc-300 dark:text-zinc-700'
                    }
                >
                    ★
                </span>
            ))}
        </span>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="mb-4 text-[11px] font-medium tracking-[0.08em] text-zinc-500 uppercase dark:text-zinc-600">
            {children}
        </p>
    );
}

// ── Review Card ───────────────────────────────

function ReviewCard({
    name,
    date,
    rating,
    text,
    initials,
}: {
    name: string;
    date: string;
    rating: number;
    text: string;
    initials: string;
}) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800/80 dark:bg-[#111113]">
            <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                        {initials}
                    </div>
                    <div>
                        <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200">
                            {name}
                        </p>
                        <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
                            {date}
                        </p>
                    </div>
                </div>
                <StarRating value={rating} />
            </div>
            <p className="text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                {text}
            </p>
        </div>
    );
}

// ── Stats Box ─────────────────────────────────

function StatBox({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center gap-0.5 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            <span className="font-serif text-xl font-normal text-zinc-900 dark:text-zinc-100">
                {value}
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                {label}
            </span>
        </div>
    );
}

// ── Main Page ─────────────────────────────────
type CounselorProps = {
    counselor: Counselor;
};
export default function Details({ counselor }: CounselorProps) {
    return (
        <div className="min-h-screen bg-background font-sans text-zinc-900 antialiased dark:text-zinc-200">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <Breadcrumb
                    items={[
                        {
                            label: 'Beranda',
                            href: '/',
                        },
                        {
                            label: 'Konselor',
                            href: '/',
                        },
                        {
                            label: counselor.name,
                        },
                    ]}
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <aside className="flex flex-col gap-4 lg:col-span-1">
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800/80 dark:bg-[#111113]">
                            {/* Avatar */}
                            <div className="mb-4 flex flex-col items-center text-center">
                                <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-2xl font-semibold text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400">
                                    AS
                                </div>
                                <h1 className="font-serif text-xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                                    {counselor.name}
                                </h1>
                                <p className="mt-0.5 text-[13px] text-zinc-500">
                                    {counselor.specialization?.name}
                                </p>

                                {/* Rating inline */}
                                <div className="mt-2 flex items-center gap-1.5">
                                    <StarRating value={4.9} />
                                    <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                                        4.9
                                    </span>
                                    <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                                        (127 ulasan)
                                    </span>
                                </div>

                                {/* Availability badge */}
                                <div className="mt-3 flex items-center gap-1.5">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade8088]" />
                                    <span className="text-[12px] text-zinc-500 dark:text-zinc-500">
                                        Jadwal Terdekat :{' '}
                                        {getScheduleLabel(
                                            counselor.next_schedule,
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-800" />

                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-2">
                                <StatBox value="127" label="Sesi" />
                                <StatBox value="5th" label="Tahun" />
                                <StatBox value="98%" label="Respons" />
                            </div>

                            <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-800" />

                            {/* Price */}
                            <div className="flex items-center justify-between">
                                <span className="text-[12px] text-zinc-500 dark:text-zinc-500">
                                    Harga per sesi
                                </span>
                                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Rp 250.000
                                </span>
                            </div>

                            {/* Session modes */}
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-[12px] text-zinc-500 dark:text-zinc-500">
                                    Mode sesi
                                </span>
                                <div className="flex gap-1">
                                    <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800">
                                        Online
                                    </span>
                                    <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800">
                                        Tatap muka
                                    </span>
                                </div>
                            </div>

                            <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-800" />

                            {/* CTA */}
                            <button className="w-full rounded-lg bg-zinc-900 py-2.5 text-[13px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                                Reservasi Sesi
                            </button>
                        </div>

                        {/* Location card */}
                        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800/80 dark:bg-[#111113]">
                            <p className="mb-3 text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-600">
                                Lokasi Praktik
                            </p>
                            <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200">
                                Klinik Sehat Sejahtera
                            </p>
                            <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-500">
                                Jl. Sudirman No. 42, Jakarta Pusat
                            </p>
                            {/* Map placeholder */}
                            <div className="mt-3 flex h-24 items-center justify-center rounded-lg bg-zinc-100 text-[11px] text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
                                Peta lokasi
                            </div>
                        </div>
                    </aside>

                    {/* ──────────────────────────────────
                        RIGHT — Detail Content
                    ─────────────────────────────────── */}
                    <main className="flex flex-col gap-8 lg:col-span-2">
                        {/* About */}
                        <section>
                            <SectionLabel>Tentang</SectionLabel>
                            <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Arini Setyawati adalah psikolog klinis
                                bersertifikat dengan pengalaman lebih dari 5
                                tahun menangani berbagai kondisi kesehatan
                                mental. Ia mengkhususkan diri pada terapi
                                kognitif-perilaku (CBT) untuk kecemasan,
                                depresi, dan trauma.
                            </p>
                            <p className="mt-3 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Arini percaya bahwa setiap individu memiliki
                                potensi untuk tumbuh dan berkembang.
                                Pendekatannya bersifat empatik, kolaboratif, dan
                                berbasis bukti ilmiah.
                            </p>
                        </section>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700/60" />

                        {/* Specializations */}
                        <section>
                            <SectionLabel>Spesialisasi</SectionLabel>
                            <div className="flex flex-wrap gap-2">
                                {counselor.categories.map((s: Category) => (
                                    <Tag key={s.id}>{s.name}</Tag>
                                ))}
                            </div>
                        </section>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700/60" />

                        {/* Availability schedule */}
                        <section>
                            <SectionLabel>Jadwal Tersedia</SectionLabel>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                                {[
                                    {
                                        day: 'Sen',
                                        slots: ['09:00', '11:00', '14:00'],
                                    },
                                    { day: 'Sel', slots: ['10:00', '13:00'] },
                                    { day: 'Rab', slots: [] },
                                    {
                                        day: 'Kam',
                                        slots: ['09:00', '15:00', '16:00'],
                                    },
                                    { day: 'Jum', slots: ['10:00', '11:00'] },
                                    { day: 'Sab', slots: ['09:00'] },
                                ].map((d) => (
                                    <div
                                        key={d.day}
                                        className="rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800"
                                    >
                                        <p className="mb-1.5 text-center text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                                            {d.day}
                                        </p>
                                        {d.slots.length === 0 ? (
                                            <p className="text-center text-[11px] text-zinc-300 dark:text-zinc-700">
                                                —
                                            </p>
                                        ) : (
                                            <div className="flex flex-col gap-1">
                                                {d.slots.map((s) => (
                                                    <button
                                                        key={s}
                                                        className="w-full rounded bg-zinc-100 py-1 text-[11px] text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700/60" />

                        {/* Reviews */}
                        <section>
                            <div className="mb-4 flex items-center justify-between">
                                <SectionLabel>Ulasan Klien</SectionLabel>
                                <div className="flex items-center gap-2">
                                    <StarRating value={4.9} />
                                    <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                                        4.9
                                    </span>
                                    <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                                        · 127 ulasan
                                    </span>
                                </div>
                            </div>

                            {/* Rating breakdown */}
                            <div className="mb-5 flex flex-col gap-1.5">
                                {[
                                    { stars: 5, pct: 88 },
                                    { stars: 4, pct: 9 },
                                    { stars: 3, pct: 2 },
                                    { stars: 2, pct: 1 },
                                    { stars: 1, pct: 0 },
                                ].map((r) => (
                                    <div
                                        key={r.stars}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="w-4 text-right text-[11px] text-zinc-400 dark:text-zinc-600">
                                            {r.stars}
                                        </span>
                                        <span className="text-[11px] text-amber-400">
                                            ★
                                        </span>
                                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                                            <div
                                                className="h-full rounded-full bg-amber-400"
                                                style={{ width: `${r.pct}%` }}
                                            />
                                        </div>
                                        <span className="w-7 text-[11px] text-zinc-400 dark:text-zinc-600">
                                            {r.pct}%
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Review list */}
                            <div className="flex flex-col gap-3">
                                <ReviewCard
                                    initials="MR"
                                    name="Muhammad Rizki"
                                    date="2 minggu lalu"
                                    rating={5}
                                    text="Arini sangat profesional dan penuh empati. Sesi pertama saya langsung merasa nyaman berbagi cerita. Sangat direkomendasikan untuk siapapun yang sedang berjuang dengan kecemasan."
                                />
                                <ReviewCard
                                    initials="SA"
                                    name="Sari Andini"
                                    date="1 bulan lalu"
                                    rating={5}
                                    text="Setelah 3 bulan sesi rutin, saya merasakan perubahan yang signifikan. Teknik CBT yang diajarkan benar-benar membantu saya mengelola pikiran negatif."
                                />
                                <ReviewCard
                                    initials="DP"
                                    name="Dika Pratama"
                                    date="2 bulan lalu"
                                    rating={4}
                                    text="Komunikasinya jelas dan mudah dipahami. Penjelasan tentang kondisi saya sangat membantu. Hanya jadwalnya kadang susah, tapi worth it."
                                />
                                <ReviewCard
                                    initials="NA"
                                    name="Nadia Aulia"
                                    date="3 bulan lalu"
                                    rating={5}
                                    text="Sangat bersyukur menemukan konselor seperti Bu Arini. Beliau sabar, tidak menghakimi, dan selalu memberikan perspektif yang fresh."
                                />
                            </div>

                            {/* Load more reviews */}
                            <button className="mt-4 w-full rounded-lg border border-zinc-200 py-2.5 text-[12px] font-medium text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:text-zinc-300">
                                Tampilkan 123 ulasan lainnya ↓
                            </button>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}

Details.layout = (page: ReactNode) => <Wrapper main={page} />;

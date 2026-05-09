import type { ReactNode } from 'react';
import Breadcrumb from '@/components/breadcumb';
import Tag from '@/components/tag';
import Wrapper from '@/layouts/wrapper';
import type { Category, CounselorDetailPage } from '@/types/counselor';
import LocationCard from './components/details/LocationCard';
import MainProfileCard from './components/details/MainProfileCard';
import SectionLabel from './components/details/section-label';

type CounselorProps = {
    counselor: CounselorDetailPage;
};
export default function Details({ counselor }: CounselorProps) {
    console.log(counselor);

    const breadcumbs = [
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
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-zinc-900 antialiased dark:text-zinc-200">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <Breadcrumb items={breadcumbs} />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <aside className="flex flex-col gap-4 lg:col-span-1">
                        <MainProfileCard counselor={counselor} />
                        <LocationCard address={counselor.address} />
                    </aside>

                    {/* ──────────────────────────────────
                        RIGHT — Detail Content
                    ─────────────────────────────────── */}
                    <main className="flex flex-col gap-8 lg:col-span-2">
                        {/* About */}
                        <section>
                            <SectionLabel>Tentang</SectionLabel>
                            <div
                                className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400"
                                dangerouslySetInnerHTML={{
                                    __html: counselor.bio,
                                }}
                            />
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
                                {counselor.schedules
                                    .filter((s) => s.is_active)
                                    .map((s) => (
                                        <div
                                            key={s.day_of_week}
                                            className="rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800"
                                        >
                                            <p className="mb-1.5 text-center text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                                                {
                                                    [
                                                        'Minggu',
                                                        'Senin',
                                                        'Selasa',
                                                        'Rabu',
                                                        'Kamis',
                                                        'Jumat',
                                                        'Sabtu',
                                                    ][s.day_of_week]
                                                }
                                            </p>
                                            <p className="text-center text-[11px] text-zinc-500 dark:text-zinc-400">
                                                {s.open_time.slice(0, 5)}–
                                                {s.close_time.slice(0, 5)}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </section>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700/60" />

                        {/* Reviews */}
                        <section>
                            {/* Review list */}
                            {/* <div className="flex flex-col gap-3">
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
                            </div> */}

                            {/* Load more reviews */}
                            {/* <button className="mt-4 w-full rounded-lg border border-zinc-200 py-2.5 text-[12px] font-medium text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:text-zinc-300">
                                Tampilkan 123 ulasan lainnya ↓
                            </button> */}
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}

Details.layout = (page: ReactNode) => <Wrapper main={page} />;

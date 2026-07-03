import { Link } from '@inertiajs/react';
import React from 'react';

const values = [
    {
        title: 'Privasi dijaga ketat',
        desc: 'Cerita yang kamu bagikan hanya diketahui kamu dan konselormu.',
    },
    {
        title: 'Empati di atas segalanya',
        desc: 'Kami memilih konselor yang mendengarkan, bukan cuma memberi solusi cepat.',
    },
    {
        title: 'Harga yang jujur',
        desc: 'Biaya sesi tertera jelas di awal, tidak ada biaya tersembunyi.',
    },
    {
        title: 'Terbuka untuk semua',
        desc: 'Online atau tatap muka, sesuaikan dengan kenyamananmu.',
    },
];

function ValuesAndCta() {
    return (
        <div className="px-6 py-20">
            <div className="mx-auto max-w-5xl">
                <div className="mb-14 max-w-lg">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-xs font-medium tracking-[0.06em] text-muted-foreground uppercase">
                            Yang Kami Pegang
                        </span>
                    </div>
                    <h2 className="font-serif text-3xl leading-tight font-normal tracking-[-0.02em] text-foreground md:text-4xl">
                        Nilai yang
                        <span className="text-primary italic"> tidak kami tawar.</span>
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((v) => (
                        <div
                            key={v.title}
                            className="rounded-2xl border border-border/60 bg-card p-6"
                        >
                            <h3 className="mb-2 text-sm font-semibold text-foreground">
                                {v.title}
                            </h3>
                            <p className="text-sm leading-relaxed font-light text-muted-foreground">
                                {v.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-border/60 bg-card px-8 py-12 text-center shadow-xl">
                    <h3 className="max-w-md font-serif text-2xl leading-snug font-normal text-foreground">
                        Sudah siap merasa lebih tenang?
                    </h3>
                    <p className="max-w-sm text-sm font-light text-muted-foreground">
                        Ceritakan yang kamu hadapi, kami bantu temukan
                        konselor yang tepat.
                    </p>
                    <Link
                        href="/"
                        className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Cari Konselor
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ValuesAndCta;

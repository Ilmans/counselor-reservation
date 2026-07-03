import { Link } from '@inertiajs/react';
import React from 'react';

const testimonials = [
    {
        initials: 'NA',
        quote: 'Sesi pertama bikin aku sadar ternyata cemasku boleh divalidasi, bukan cuma dipendam.',
        name: 'Nadia, 26',
        topic: 'Kecemasan',
    },
    {
        initials: 'RH',
        quote: 'Jadwalnya fleksibel, aku bisa konsultasi malam sehabis kerja lewat video call.',
        name: 'Rangga, 31',
        topic: 'Stres kerja',
    },
    {
        initials: 'SW',
        quote: 'Konselornya sabar dengerin dan nggak buru-buru kasih solusi. Cocok buat aku yang butuh waktu.',
        name: 'Salsa, 24',
        topic: 'Hubungan',
    },
];

function TrustAndCta() {
    return (
        <div className="bg-primary/5 px-6 py-20">
            <div className="mx-auto max-w-5xl">
                <div className="mb-14 max-w-lg">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-xs font-medium tracking-[0.06em] text-muted-foreground uppercase">
                            Cerita Klien
                        </span>
                    </div>
                    <h2 className="font-serif text-3xl leading-tight font-normal tracking-[-0.02em] text-foreground md:text-4xl">
                        Kamu nggak sendirian
                        <span className="text-primary italic">
                            {' '}
                            menghadapinya.
                        </span>
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                    {testimonials.map((t) => (
                        <div
                            key={t.initials}
                            className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
                        >
                            <p className="mb-6 text-sm leading-relaxed font-light text-foreground/90">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-foreground">
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {t.topic}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-border/60 bg-card px-8 py-12 text-center shadow-xl">
                    <h3 className="max-w-md font-serif text-2xl leading-snug font-normal text-foreground">
                        Siap bicara dengan konselor yang tepat?
                    </h3>
                    <p className="max-w-sm text-sm font-light text-muted-foreground">
                        Sesi pertama biasanya bisa dijadwalkan dalam 48 jam.
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

export default TrustAndCta;

import React from 'react';

const steps = [
    {
        number: '01',
        title: 'Ceritakan yang kamu rasakan',
        desc: 'Isi kuesioner singkat tentang apa yang sedang kamu hadapi, waktu yang kamu punya, dan preferensi sesi.',
    },
    {
        number: '02',
        title: 'Pilih konselor yang cocok',
        desc: 'Kami sarankan beberapa konselor berdasarkan kebutuhanmu — kamu tetap yang memutuskan.',
    },
    {
        number: '03',
        title: 'Mulai sesi pertamamu',
        desc: 'Booking jadwal, lalu konseling online lewat video call atau tatap muka di klinik terdekat.',
    },
];

function HowItWorks() {
    return (
        <div className="border-t border-border/60 px-6 py-20">
            <div className="mx-auto max-w-5xl">
                <div className="mb-14 max-w-lg">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-xs font-medium tracking-[0.06em] text-muted-foreground uppercase">
                            Cara Kerja
                        </span>
                    </div>
                    <h2 className="font-serif text-3xl leading-tight font-normal tracking-[-0.02em] text-foreground md:text-4xl">
                        Tiga langkah menuju
                        <span className="text-primary italic">
                            {' '}
                            sesi pertamamu.
                        </span>
                    </h2>
                </div>

                <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
                    {steps.map((step, i) => (
                        <div key={step.number} className="relative">
                            <span className="font-serif text-4xl font-normal text-primary/25">
                                {step.number}
                            </span>
                            <h3 className="mt-3 mb-2 text-base font-semibold text-foreground">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed font-light text-muted-foreground">
                                {step.desc}
                            </p>
                            {i < steps.length - 1 && (
                                <span className="absolute top-5 -right-3 hidden h-px w-6 bg-border sm:block" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;

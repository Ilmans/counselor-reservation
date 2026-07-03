import React from 'react';

function AboutHero() {
    return (
        <div className="relative overflow-hidden px-6 pt-16 pb-14 sm:pt-20">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full border border-primary/10" />
            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full border border-primary/15" />

            <div className="relative mx-auto max-w-2xl">
                <div className="mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-medium tracking-[0.06em] text-muted-foreground uppercase">
                        Tentang Kami
                    </span>
                </div>
                <h1 className="mb-5 font-serif text-4xl leading-[1.15] font-normal tracking-[-0.02em] text-foreground md:text-5xl">
                    Nama kami diambil
                    <br />
                    dari satu kata:{' '}
                    <span className="text-primary italic">tenang.</span>
                </h1>
                <p className="text-base leading-relaxed font-light text-muted-foreground">
                    Tenang adalah tempat mencari konselor — semudah mencari apa
                    pun yang kamu butuhkan, tapi dijaga hati-hati karena yang
                    kamu titipkan bukan barang, melainkan cerita.
                </p>
            </div>
        </div>
    );
}

export default AboutHero;

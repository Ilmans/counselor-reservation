import React from 'react';

function OurStory() {
    return (
        <div className="border-t border-border/60 px-6 py-20">
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
                <div className="max-w-xs">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-xs font-medium tracking-[0.06em] text-muted-foreground uppercase">
                            Kenapa Kami Ada
                        </span>
                    </div>
                    <h2 className="font-serif text-3xl leading-tight font-normal tracking-[-0.02em] text-foreground">
                        Cari konselor
                        <br />
                        <span className="text-primary italic">
                            tidak harus rumit.
                        </span>
                    </h2>
                </div>

                <div className="space-y-4 text-base leading-relaxed font-light text-muted-foreground">
                    <p>
                        Banyak orang menunda konseling bukan karena tidak mau,
                        tapi karena bingung mulai dari mana — konselor mana yang
                        cocok, jadwalnya bagaimana, dan apakah biayanya
                        transparan.
                    </p>
                    <p>
                        Tenang dibangun untuk memangkas kebingungan itu. Cukup
                        ceritakan apa yang kamu hadapi, dan kami bantu temukan
                        konselor yang sesuai — kamu tinggal fokus pada
                        prosesnya, bukan pada pencariannya.
                    </p>
                    <p className="text-foreground/80">
                        Karena langkah pertama menuju tenang seharusnya tidak
                        melelahkan.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OurStory;

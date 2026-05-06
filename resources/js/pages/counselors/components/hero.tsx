import React from 'react';

function Hero() {
    return (
        <div className="mx-auto max-w-5xl px-6 pt-14 pb-10">
            <div className="mb-1">
                <span className="text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-500">
                    Platform Konseling
                </span>
            </div>
            <h1 className="mb-3 font-serif text-4xl leading-tight font-normal tracking-[-0.02em] text-zinc-900 md:text-5xl dark:text-zinc-100">
                Temukan konselor
                <br />
                <span className="text-zinc-400 italic dark:text-zinc-500">
                    yang tepat untuk kamu.
                </span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed font-light text-zinc-500 dark:text-zinc-500">
                Reservasi sesi konseling online maupun tatap muka dengan
                konselor berpengalaman dan tersertifikasi.
            </p>
        </div>
    );
}

export default Hero;

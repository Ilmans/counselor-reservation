import CounselorController from '@/actions/App/Http/Controllers/CounselorController';
import { Link } from '@inertiajs/react';
import React from 'react';

function Hero() {
    return (
        <div className="relative overflow-hidden px-6 pt-16 pb-20 sm:pt-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                {/* Teks */}
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-xs font-medium tracking-[0.06em] text-muted-foreground uppercase">
                            Platform Konseling
                        </span>
                    </div>
                    <h1 className="mb-4 font-serif text-5xl leading-[1.1] font-normal tracking-[-0.02em] text-foreground md:text-6xl">
                        Temukan konselor
                        <br />
                        <span className="text-primary italic">
                            yang tepat untuk kamu.
                        </span>
                    </h1>
                    <p className="max-w-lg text-base leading-relaxed font-light text-muted-foreground">
                        Reservasi sesi konseling online maupun tatap muka dengan
                        konselor berpengalaman dan tersertifikasi.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <Link
                            href={CounselorController.index.url()}
                            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Cari Konselor
                        </Link>
                        <Link
                            href="/about-us"
                            className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Pelajari cara kerja →
                        </Link>
                    </div>
                </div>

                {/* Visual - "napas tenang": ring konsentris yang berdenyut
                    pelan, senada dengan mark logo di tengah */}
                <div className="relative hidden items-center justify-center lg:flex">
                    <div className="relative flex h-80 w-80 items-center justify-center">
                        <div className="breathing-glow absolute inset-0 rounded-full border border-primary/15" />
                        <div className="absolute inset-[12%] rounded-full border border-primary/20" />
                        <div className="absolute inset-[26%] rounded-full border border-primary/25" />
                        <div className="absolute inset-[40%] rounded-full bg-primary/10" />
                        <div className="absolute inset-[46%] flex items-center justify-center rounded-full bg-primary">
                            <svg
                                width={28}
                                height={28}
                                viewBox="0 0 14 14"
                                fill="none"
                                className="text-primary-foreground"
                            >
                                <circle
                                    cx={7}
                                    cy={7}
                                    r="5.5"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    opacity={0.6}
                                />
                                <path
                                    d="M7 4.5v3l1.5 1.5"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Kartu kepercayaan, mengambang */}
                        <div className="absolute -bottom-6 -left-8 flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3 shadow-xl">
                            <div className="flex -space-x-2">
                                {['DA', 'RF', 'SK'].map((initial) => (
                                    <div
                                        key={initial}
                                        className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-primary/15 text-[10px] font-semibold text-primary"
                                    >
                                        {initial}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">
                                    2.500+ sesi
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    rating 4.9 dari klien
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;

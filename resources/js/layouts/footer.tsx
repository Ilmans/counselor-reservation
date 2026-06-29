import { Link } from '@inertiajs/react';
import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-border">
            <div className="px-6 py-12">
                {/* Band reassurance + CTA */}
                <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-primary/10 p-6 sm:flex-row sm:items-center">
                    <div>
                        <p className="font-serif text-lg text-foreground">
                            Butuh teman bicara?
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Konselor kami siap mendengarkan, kapan pun kamu
                            siap.
                        </p>
                    </div>
                    <Link
                        href="/"
                        className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Cari Konselor
                    </Link>
                </div>

                {/* Brand + link columns */}
                <div className="flex flex-col justify-between gap-8 md:flex-row">
                    <div>
                        <div className="mb-3 flex items-center gap-2.5">
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-primary">
                                <svg
                                    width={12}
                                    height={12}
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    className="text-primary-foreground"
                                >
                                    <circle
                                        cx={7}
                                        cy={7}
                                        r="5.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        opacity={0.6}
                                    />
                                    <path
                                        d="M7 4.5v3l1.5 1.5"
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <span className="font-serif text-base font-medium text-foreground">
                                Tenang
                            </span>
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            Platform reservasi konseling yang menghubungkan kamu
                            dengan konselor profesional tersertifikasi.
                        </p>
                    </div>

                    <div className="flex gap-12 md:gap-16">
                        <div>
                            <p className="mb-3 text-xs font-medium tracking-[0.08em] text-muted-foreground/80 uppercase">
                                Platform
                            </p>
                            <div className="flex flex-col gap-2.5">
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Cari Konselor
                                </a>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Cara Kerja
                                </a>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Harga
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className="mb-3 text-xs font-medium tracking-[0.08em] text-muted-foreground/80 uppercase">
                                Bantuan
                            </p>
                            <div className="flex flex-col gap-2.5">
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    FAQ
                                </a>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Kontak
                                </a>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Privasi
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer divider */}
                <div className="mt-8 mb-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="text-[13px] text-muted-foreground/70">
                        Tenang {new Date().getFullYear()}. Semua hak dilindungi.
                    </p>
                    <p className="text-[13px] text-muted-foreground/70">
                        Dibuat dengan niat baik - Indonesia
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

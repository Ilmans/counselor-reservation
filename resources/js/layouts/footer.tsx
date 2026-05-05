import React from 'react';

const Footer = () => {
    return (
        <>
            {/* ─────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────── */}
            <footer className="border-t border-zinc-800/60 bg-background dark:bg-zinc-950">
                <div className="mx-auto max-w-5xl px-6 py-10">
                    <div className="flex flex-col justify-between gap-8 md:flex-row">
                        {/* Brand */}
                        <div>
                            <div className="mb-3 flex items-center gap-2.5">
                                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-zinc-900">
                                    <svg
                                        width={11}
                                        height={11}
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <circle
                                            cx={7}
                                            cy={7}
                                            r="5.5"
                                            stroke="#71717a"
                                            strokeWidth="1.2"
                                        />
                                        <path
                                            d="M7 4.5v3l1.5 1.5"
                                            stroke="#a1a1aa"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-zinc-400">
                                    Tenang
                                </span>
                            </div>
                            <p className="max-w-xs text-xs leading-relaxed text-zinc-600">
                                Platform reservasi konseling yang menghubungkan
                                kamu dengan konselor profesional tersertifikasi.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex gap-12 md:gap-16">
                            <div>
                                <p className="mb-3 text-xs font-medium tracking-[0.08em] text-zinc-500 uppercase">
                                    Platform
                                </p>
                                <div className="flex flex-col gap-2">
                                    <a
                                        href="#"
                                        className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                    >
                                        Cari Konselor
                                    </a>
                                    <a
                                        href="#"
                                        className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                    >
                                        Cara Kerja
                                    </a>
                                    <a
                                        href="#"
                                        className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                    >
                                        Harga
                                    </a>
                                </div>
                            </div>
                            <div>
                                <p className="mb-3 text-xs font-medium tracking-[0.08em] text-zinc-500 uppercase">
                                    Bantuan
                                </p>
                                <div className="flex flex-col gap-2">
                                    <a
                                        href="#"
                                        className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                    >
                                        FAQ
                                    </a>
                                    <a
                                        href="#"
                                        className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                    >
                                        Kontak
                                    </a>
                                    <a
                                        href="#"
                                        className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                    >
                                        Privasi
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer divider */}
                    <div className="mt-8 mb-6 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

                    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                        <p className="text-xs text-zinc-700">
                            © 2025 Tenang. Semua hak dilindungi.
                        </p>
                        <p className="text-xs text-zinc-700">
                            Dibuat dengan niat baik · Indonesia
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;

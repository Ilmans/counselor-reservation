const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 backdrop-blur-md dark:border-zinc-800/60 bg-background">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <a href="#" className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            <svg
                                width={14}
                                height={14}
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <circle
                                    cx={7}
                                    cy={7}
                                    r="5.5"
                                    stroke="#a1a1aa"
                                    strokeWidth="1.2"
                                />
                                <path
                                    d="M7 4.5v3l1.5 1.5"
                                    stroke="#e4e4e7"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <span className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                            Tenang
                        </span>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a
                            href="#"
                            className="text-[13px] text-zinc-800 transition-colors hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-white"
                        >
                            Konselor
                        </a>
                        <a
                            href="#"
                            className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200"
                        >
                            Reservasi Saya
                        </a>
                        <a
                            href="#"
                            className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200"
                        >
                            Tentang
                        </a>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <button className="rounded-lg border border-zinc-300 px-3 py-1.5 text-[12px] text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200">
                        Masuk
                    </button>
                    <button className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                        Daftar
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

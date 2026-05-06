import React from 'react';

function Filter() {
    return (
        <>
            <div className="mx-auto mb-8 max-w-5xl px-6">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    {/* Search input */}
                    <div className="relative max-w-xs flex-1">
                        <svg
                            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
                            width={13}
                            height={13}
                            viewBox="0 0 13 13"
                            fill="none"
                        >
                            <circle
                                cx="5.5"
                                cy="5.5"
                                r="4.5"
                                stroke="#a1a1aa"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M9 9l2.5 2.5"
                                stroke="#a1a1aa"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari nama atau spesialisasi…"
                            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pr-4 pl-8 text-[13px] text-zinc-800 transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700/60 dark:bg-transparent dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
                        />
                    </div>

                    {/* Filter pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* active */}
                        <button className="rounded-full border border-zinc-900 bg-zinc-900 px-3.5 py-[5px] text-[12px] font-medium text-zinc-100 dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900">
                            Semua
                        </button>
                        <button className="rounded-full border border-zinc-300 px-3.5 py-[5px] text-[12px] font-medium text-zinc-500 transition-all hover:border-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
                            Kecemasan
                        </button>
                        <button className="rounded-full border border-zinc-300 px-3.5 py-[5px] text-[12px] font-medium text-zinc-500 transition-all hover:border-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
                            Depresi
                        </button>
                        <button className="rounded-full border border-zinc-300 px-3.5 py-[5px] text-[12px] font-medium text-zinc-500 transition-all hover:border-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
                            Relationship
                        </button>
                        <button className="rounded-full border border-zinc-300 px-3.5 py-[5px] text-[12px] font-medium text-zinc-500 transition-all hover:border-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200">
                            Karier
                        </button>
                    </div>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="mx-auto mb-8 max-w-5xl px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700/60" />
            </div>
        </>
    );
}

export default Filter;

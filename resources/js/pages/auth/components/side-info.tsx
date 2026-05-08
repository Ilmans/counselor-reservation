function SideInfo() {
    return (
        <div className="hidden max-w-[240px] lg:flex lg:flex-col">
            <span className="mb-4 text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase">
                Platform Konseling
            </span>
            <h2 className="mb-3 font-serif text-3xl leading-tight font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                Mulai perjalanan{' '}
                <em className="text-zinc-400 dark:text-zinc-500">
                    pemulihanmu.
                </em>
            </h2>
            <p className="text-xs leading-relaxed font-light text-zinc-500 dark:text-zinc-500">
                Konselor tersertifikasi siap menemanimu. Reservasi mudah, aman,
                dan terpercaya.
            </p>

            <div className="mt-8 flex flex-col gap-3.5">
                {[
                    'Konselor berpengalaman & tersertifikasi',
                    'Sesi online & tatap muka tersedia',
                    'Privasi terjaga sepenuhnya',
                    'Jadwal fleksibel sesuai kebutuhanmu',
                ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                        <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                        <p className="text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideInfo;

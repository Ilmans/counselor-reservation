const STATUS_ITEMS: {
    key: 'tersedia' | 'terbatas' | 'penuh';
    label: string;
    dot: string;
}[] = [
    { key: 'tersedia', label: 'Tersedia', dot: 'bg-emerald-400' },
    { key: 'terbatas', label: 'Terbatas', dot: 'bg-amber-400' },
    { key: 'penuh', label: 'Penuh', dot: 'bg-red-400' },
];

function StatusInformation() {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800/80 dark:bg-[#111113]">
            {STATUS_ITEMS.map(({ key, label, dot }) => (
                <div key={key} className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${dot}`} />
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default StatusInformation;

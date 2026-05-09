const statusDot = {
    tersedia: 'bg-emerald-400',
    terbatas: 'bg-amber-400',
    penuh: 'bg-red-400',
};
function StatusInformation() {
    return (
        <div className="mt-3 flex items-center gap-4 px-1">
            {[
                ['tersedia', 'Tersedia'],
                ['terbatas', 'Terbatas'],
                ['penuh', 'Penuh'],
            ].map(([k, l]) => (
                <div key={k} className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${statusDot[k]}`} />
                    <span className="text-[11px] text-zinc-500">{l}</span>
                </div>
            ))}
        </div>
    );
}

export default StatusInformation;

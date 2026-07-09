import type { Method } from '@/types/schedule';
import { formatDateLabel } from '@/utils/helper';

type Props = {
    date: string;
    method: Method;
    selected: 'online' | 'offline' | null;
    onSelect: (mode: 'online' | 'offline') => void;
};

const OPTIONS = [
    { id: 'online' as const, label: 'Online', sub: 'Video call', icon: '🎥' },
    {
        id: 'offline' as const,
        label: 'Tatap Muka',
        sub: 'Di klinik',
        icon: '🏥',
    },
];

export default function SessionModePicker({
    date,
    method,
    selected,
    onSelect,
}: Props) {
    const isSingle = method !== 'both';
    const singleOption = OPTIONS.find((o) => o.id === method);

    return (
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
            <p className="text-[10px] font-medium tracking-[0.08em] text-zinc-400 uppercase dark:text-zinc-600">
                Mode Sesi
            </p>
            <p className="mt-0.5 mb-3 text-[12px] text-zinc-500">
                {formatDateLabel(date)}
            </p>

            {isSingle && singleOption ? (
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-700 dark:bg-zinc-900/30">
                    <span className="text-base">{singleOption.icon}</span>
                    <div>
                        <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                            {singleOption.label}
                        </p>
                        <p className="text-[11px] text-zinc-400">
                            {singleOption.sub} · Satu-satunya pilihan di tanggal
                            ini
                        </p>
                    </div>
                    <span className="ml-auto rounded-md bg-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                        Otomatis dipilih
                    </span>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2">
                    {OPTIONS.map((opt) => (
                        <label
                            key={opt.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-colors ${
                                selected === opt.id
                                    ? 'border-zinc-900 bg-zinc-50 dark:border-zinc-400 dark:bg-zinc-900/50'
                                    : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#111113]'
                            }`}
                        >
                            <input
                                type="radio"
                                name="session-mode"
                                className="hidden"
                                checked={selected === opt.id}
                                onChange={() => onSelect(opt.id)}
                            />
                            <span className="text-base">{opt.icon}</span>
                            <div>
                                <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                                    {opt.label}
                                </p>
                                <p className="text-[11px] text-zinc-400">
                                    {opt.sub}
                                </p>
                            </div>
                        </label>
                    ))}
                </div>
            )}
        </section>
    );
}

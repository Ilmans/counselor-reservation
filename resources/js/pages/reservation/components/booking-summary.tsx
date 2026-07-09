import { formatDateLabel } from '@/utils/helper';

type Props = {
    selectedDate: string | null;
    selectedSlot: string | null;
    sessionMode: 'online' | 'offline' | null;
};

const MODE_LABEL: Record<'online' | 'offline', string> = {
    online: 'Online · Video call',
    offline: 'Tatap Muka · Di klinik',
};

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500"
        >
            <path
                d="M3.5 8.5l3 3 6-6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SummaryRow({ label, value }: { label: string; value: string | null }) {
    return (
        <div className="flex items-center justify-between gap-3 py-2">
            <span className="text-[11px] font-medium tracking-[0.06em] text-zinc-400 uppercase dark:text-zinc-600">
                {label}
            </span>
            <span
                className={[
                    'flex items-center gap-1.5 text-[12px] font-medium',
                    value
                        ? 'text-zinc-800 dark:text-zinc-200'
                        : 'text-zinc-300 dark:text-zinc-700',
                ].join(' ')}
            >
                {value && <CheckIcon />}
                {value ?? 'Belum dipilih'}
            </span>
        </div>
    );
}

export default function BookingSummary({
    selectedDate,
    selectedSlot,
    sessionMode,
}: Props) {
    return (
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
            <p className="text-[10px] font-medium tracking-[0.08em] text-zinc-400 uppercase dark:text-zinc-600">
                Ringkasan Reservasi
            </p>
            <div className="mt-1 divide-y divide-zinc-100 dark:divide-zinc-800">
                <SummaryRow
                    label="Tanggal"
                    value={selectedDate ? formatDateLabel(selectedDate) : null}
                />
                <SummaryRow label="Jam" value={selectedSlot} />
                <SummaryRow
                    label="Mode"
                    value={sessionMode ? MODE_LABEL[sessionMode] : null}
                />
            </div>
        </section>
    );
}

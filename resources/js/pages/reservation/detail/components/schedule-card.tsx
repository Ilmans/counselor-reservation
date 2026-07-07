import { MapPin, Sprout, Users, Video } from 'lucide-react';
import type { ComponentType } from 'react';
import type { ConsultationDetail } from '@/types/consultation';

const ACCENTS = {
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400',
    emerald:
        'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
    teal: 'bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400',
} as const;

export function InfoItem({
    icon: Icon,
    label,
    value,
    accent = 'teal',
}: {
    icon?: ComponentType<{ size?: number }>;
    label: string;
    value: string;
    accent?: keyof typeof ACCENTS;
}) {
    return (
        <div className="flex items-start gap-2.5">
            {Icon && (
                <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${ACCENTS[accent]}`}
                >
                    <Icon size={13} />
                </span>
            )}
            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-0.5 truncate font-medium text-foreground">
                    {value}
                </p>
            </div>
        </div>
    );
}

// Heuristik ringan untuk format tanggal Indonesia semacam
// "Senin, 14 Juli 2026" atau "14 Juli 2026" -> { day: "14", month: "JUL" }.
function parseDateBadge(dateStr: string) {
    const cleaned = dateStr.includes(',')
        ? dateStr.split(',').pop()!.trim()
        : dateStr;
    const [day, month] = cleaned.split(' ');

    return {
        day: day ?? '—',
        month: month ? month.slice(0, 3).toUpperCase() : '',
    };
}

function ScheduleCard({ r }: { r: ConsultationDetail }) {
    const isOnline = r.method_label === 'Online';
    const { day, month } = parseDateBadge(r.schedule.date);

    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">
                {/* Kartu tanggal jadi elemen visual utama di sini, menggantikan
                    foto konselor yang sudah tampil di sidebar. */}
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <span className="text-[10px] font-semibold tracking-wide uppercase opacity-80">
                        {month}
                    </span>
                    <span className="font-serif text-2xl leading-none">
                        {day}
                    </span>
                </div>

                <div className="min-w-0">
                    <p className="font-serif text-base text-foreground">
                        {r.schedule.date}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {r.schedule.duration
                            ? `${r.schedule.time} · ${r.schedule.duration}`
                            : r.schedule.time}
                    </p>
                    <span
                        className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            isOnline
                                ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400'
                                : 'bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400'
                        }`}
                    >
                        {isOnline ? <Video size={11} /> : <MapPin size={11} />}
                        {r.method_label}
                    </span>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-border pt-4 text-sm">
                <InfoItem
                    icon={Users}
                    label="Topik"
                    value={r.categories}
                    accent="violet"
                />
                <InfoItem
                    icon={Sprout}
                    label="Sesi ke"
                    value={r.is_first ? 'Pertama' : 'Lanjutan'}
                    accent="emerald"
                />
            </div>
        </div>
    );
}

export default ScheduleCard;

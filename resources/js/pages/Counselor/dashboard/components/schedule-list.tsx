import type { ScheduleItem } from '../type';

interface Props {
    schedules: ScheduleItem[];
}

function ScheduleList({ schedules }: Props) {
    const activeSchedules = schedules.filter((s) => s.is_active);

    return (
        <div className="rounded-2xl border border-border bg-secondary p-4 md:p-5">
            <p className="mb-1 text-[10px] font-semibold tracking-widest text-secondary-foreground/70 uppercase">
                Minggu Ini
            </p>
            <h2 className="mb-3 text-lg text-secondary-foreground" style={{ fontFamily: "'Fraunces', serif" }}>
                Jadwal Praktik
            </h2>

            {activeSchedules.length === 0 ? (
                <p className="text-sm text-secondary-foreground/70">Belum ada jadwal aktif.</p>
            ) : (
                <div className="space-y-2">
                    {activeSchedules.map((s) => (
                        <div key={s.id} className="flex items-center gap-2.5 rounded-lg bg-card p-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                                {s.day_label.slice(0, 3)}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm leading-tight font-medium">
                                    {s.open_time} – {s.close_time}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-muted-foreground">{s.method_label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ScheduleList;
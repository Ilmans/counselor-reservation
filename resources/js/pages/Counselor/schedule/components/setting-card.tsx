import { Info } from 'lucide-react';
import type { DayScheduleUI, ScheduleMethod } from '../schedule-type';
import { METHOD_META } from '../schedule-type';

interface ScheduleSettingsCardProps {
    schedule: DayScheduleUI[];
    saving: boolean;
    onToggleActive: (dow: number) => void;
    onSetMethod: (dow: number, method: ScheduleMethod) => void;
    onSetTime: (dow: number, field: 'open' | 'close', value: string) => void;
    onSave: () => void;
}

export default function ScheduleSettingsCard({
    schedule,
    saving,
    onToggleActive,
    onSetMethod,
    onSetTime,
    onSave,
}: ScheduleSettingsCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-serif text-base text-foreground">
                Jam Konsultasi Mingguan
            </p>

            <div className="mt-3 divide-y divide-border/70">
                {schedule.map((d) => (
                    <div
                        key={d.dow}
                        className="flex flex-wrap items-center gap-3 py-3.5"
                    >
                        <button
                            type="button"
                            onClick={() => onToggleActive(d.dow)}
                            aria-pressed={d.active}
                            className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition ${
                                d.active
                                    ? 'justify-end bg-primary'
                                    : 'justify-start bg-secondary'
                            }`}
                        >
                            <span className="h-4 w-4 rounded-full bg-white shadow" />
                        </button>

                        <span
                            className={`w-16 shrink-0 text-sm font-medium ${
                                d.active
                                    ? 'text-foreground'
                                    : 'text-muted-foreground'
                            }`}
                        >
                            {d.label}
                        </span>

                        {d.active ? (
                            <>
                                <div className="flex items-center gap-1.5 text-sm">
                                    <input
                                        type="time"
                                        value={d.open}
                                        onChange={(e) =>
                                            onSetTime(
                                                d.dow,
                                                'open',
                                                e.target.value,
                                            )
                                        }
                                        className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground"
                                    />
                                    <span className="text-muted-foreground">
                                        –
                                    </span>
                                    <input
                                        type="time"
                                        value={d.close}
                                        onChange={(e) =>
                                            onSetTime(
                                                d.dow,
                                                'close',
                                                e.target.value,
                                            )
                                        }
                                        className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground"
                                    />
                                </div>

                                <div className="ml-auto flex flex-wrap gap-1.5">
                                    {Object.entries(METHOD_META).map(
                                        ([key, meta]) => (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() =>
                                                    onSetMethod(
                                                        d.dow,
                                                        key as ScheduleMethod,
                                                    )
                                                }
                                                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                                                    d.method === key
                                                        ? meta.pillActive
                                                        : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                                                }`}
                                            >
                                                {meta.label}
                                            </button>
                                        ),
                                    )}
                                </div>
                            </>
                        ) : (
                            <span className="ml-auto text-xs text-muted-foreground">
                                Libur
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-secondary/40 px-3.5 py-3 text-xs text-muted-foreground">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <p>
                    Perubahan jam di atas hanya berlaku untuk sesi yang{' '}
                    <span className="font-medium text-foreground">
                        belum dipesan
                    </span>
                    . Sesi yang sudah dikonfirmasi klien tidak akan berubah atau
                    terhapus.
                </p>
            </div>

            <div className="mt-4 flex justify-end border-t border-border pt-4">
                <button
                    type="button"
                    onClick={onSave}
                    disabled={saving}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </div>
        </div>
    );
}

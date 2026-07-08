import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AdminCounselorController from '@/actions/App/Http/Controllers/Admin/AdminCounselorController';
import { Button } from '@/components/ui/button';
import {
    buildWeeklySchedule,
    toSchedulePayload,
    METHOD_META,
} from '@/pages/Counselor/schedule/schedule-type';
import type {
    DayScheduleUI,
    ScheduleMethod,
} from '@/pages/Counselor/schedule/schedule-type';

// Reuse tipe raw schedule yang sama persis dengan yang diterima buildWeeklySchedule,
// supaya tidak perlu import/duplikasi tipe secara manual.
type RawSchedules = Parameters<typeof buildWeeklySchedule>[0];

interface AdminScheduleSettingsCardProps {
    counselorId: number;
    schedules: RawSchedules;
}

export default function AdminScheduleSettingsCard({
    counselorId,
    schedules,
}: AdminScheduleSettingsCardProps) {
    const [schedule, setSchedule] = useState<DayScheduleUI[]>(() =>
        buildWeeklySchedule(schedules),
    );
    const [saving, setSaving] = useState(false);

    // Sinkronkan ulang state lokal setiap kali prop schedules berubah
    // (mis. berpindah ke konselor lain, atau data direfresh dari server).
    useEffect(() => {
        setSchedule(buildWeeklySchedule(schedules));
    }, [schedules]);

    const toggleActive = (dow: number) => {
        setSchedule((prev) =>
            prev.map((d) => (d.dow === dow ? { ...d, active: !d.active } : d)),
        );
    };

    const setMethod = (dow: number, method: ScheduleMethod) => {
        setSchedule((prev) =>
            prev.map((d) => (d.dow === dow ? { ...d, method } : d)),
        );
    };

    const setTime = (dow: number, field: 'open' | 'close', value: string) => {
        setSchedule((prev) =>
            prev.map((d) => (d.dow === dow ? { ...d, [field]: value } : d)),
        );
    };

    const handleSave = () => {
        setSaving(true);

        router.put(
            AdminCounselorController.updateSchedule.url(counselorId),
            { schedules: toSchedulePayload(schedule) },
            {
                preserveScroll: true,
                onSuccess: () => {},
                onError: () => {},
                onFinish: () => setSaving(false),
            },
        );
    };

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
                            onClick={() => toggleActive(d.dow)}
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
                                            setTime(
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
                                            setTime(
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
                                                    setMethod(
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

            <div className="mt-4 flex justify-end border-t border-border pt-4">
                <Button
                    type="button"
                    loading={saving}
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? 'Menyimpan' : 'Simpan Perubahan'}
                </Button>
            </div>
        </div>
    );
}

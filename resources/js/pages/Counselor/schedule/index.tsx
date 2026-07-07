import { router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import ScheduleController from '@/actions/App/Http/Controllers/Counselor/ScheduleController';
import { AlertCard } from '@/components/ui/alert';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';

import ScheduleCalendarCard from './components/calendar-card';
import ScheduleSettingsCard from './components/setting-card';
import type {
    DayScheduleUI,
    ScheduleMethod,
    SchedulePageProps,
} from './schedule-type';
import { buildWeeklySchedule, toSchedulePayload } from './schedule-type';

export default function Index({ schedules, calendar }: SchedulePageProps) {
    const { props } = usePage<{
        alert?: { type?: string; msg?: string };
    }>();

    const [schedule, setSchedule] = useState<DayScheduleUI[]>(() =>
        buildWeeklySchedule(schedules),
    );
    const [saving, setSaving] = useState(false);

    // Sinkronkan ulang state lokal setiap kali Inertia mengirim props baru
    // (mis. setelah "Simpan Perubahan" berhasil dan halaman reload data).
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
            ScheduleController.update.url(),
            { schedules: toSchedulePayload(schedule) },
            {
                onFinish: () => setSaving(false),
            },
        );
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased">
            <DashboardTitle
                title="Jadwal Konsultasi"
                desc="Atur hari dan jam kamu tersedia menerima sesi. Klien hanya
                      dapat memesan pada rentang waktu ini."
            />
            {props.alert && (
                <div className="mt-6">
                    <AlertCard variant="success">{props.alert.msg}</AlertCard>
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-6">
                <ScheduleSettingsCard
                    schedule={schedule}
                    saving={saving}
                    onToggleActive={toggleActive}
                    onSetMethod={setMethod}
                    onSetTime={setTime}
                    onSave={handleSave}
                />

                <ScheduleCalendarCard calendar={calendar} />
            </div>
        </div>
    );
}

Index.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="schedule" />
);

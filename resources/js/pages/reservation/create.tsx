import type { ReactNode } from 'react';
import { useState } from 'react';
import CounselorController from '@/actions/App/Http/Controllers/CounselorController';
import Breadcrumb from '@/components/breadcumb';
import Wrapper from '@/layouts/wrapper';
import type { CounselorDetailPage } from '@/types/counselor';
import type { ScheduleOverview } from '@/types/schedule';
import Form from './components/form';
import SessionModePicker from './components/session-mode-picker';
import StatusInformation from './components/status-information';
import TimeSlotPicker from './components/time-slot-picker';
import BookingSummary from './components/booking-summary';
import CounselorCard from './components/cunselor-card';
import CalendarPicker from './components/calendar-picker';
import PageHead from '@/components/page-head';

type Props = {
    counselor: CounselorDetailPage;
    overview: ScheduleOverview;
};

export default function Create({ counselor, overview }: Props) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [sessionMode, setSessionMode] = useState<'online' | 'offline' | null>(
        null,
    );
    const current = selectedDate ? overview.avaibility[selectedDate] : null;

    function handleSelectDate(date: string) {
        const item = overview.avaibility[date];
        setSelectedDate(date);
        setSelectedSlot(null);
        setSessionMode(item?.method !== 'both' ? (item?.method ?? null) : null);
    }

    function handleSelectMode(mode: 'online' | 'offline') {
        setSessionMode(mode);
    }

    const breadcumbs = [
        {
            label: 'Beranda',
            href: '/',
        },
        {
            label: 'Konselor',
            href: '/',
        },
        {
            label: counselor.name,
            href: CounselorController.details().url + `/${counselor.slug}`,
        },
        {
            label: 'Reservasi',
        },
    ];

    return (
        <>
            <PageHead title="Reservasi" />
            <div className="min-h-screen font-sans text-zinc-900 antialiased dark:bg-[#0d0d0f] dark:text-zinc-200">
                <div className="mx-auto max-w-4xl px-4 py-8">
                    <Breadcrumb items={breadcumbs} />
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        <aside className="flex flex-col gap-5 lg:sticky lg:top-8 lg:col-span-1 lg:self-start">
                            <CounselorCard counselor={counselor} />
                            <BookingSummary
                                selectedDate={selectedDate}
                                selectedSlot={selectedSlot}
                                sessionMode={sessionMode}
                            />
                            <StatusInformation />
                        </aside>

                        <main className="flex flex-col gap-5 lg:col-span-2">
                            <CalendarPicker
                                overview={overview}
                                selectedDate={selectedDate}
                                onSelect={handleSelectDate}
                            />
                            {selectedDate && current && (
                                <TimeSlotPicker
                                    date={selectedDate}
                                    slots={current.slots}
                                    selected={selectedSlot}
                                    onSelect={setSelectedSlot}
                                />
                            )}

                            {selectedDate && current && (
                                <SessionModePicker
                                    date={selectedDate}
                                    method={current.method}
                                    selected={sessionMode}
                                    onSelect={handleSelectMode}
                                />
                            )}

                            <Form
                                counselor={counselor}
                                selectedDate={selectedDate}
                                selectedSlot={selectedSlot}
                                sessionMode={sessionMode}
                            />
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

Create.layout = (page: ReactNode) => <Wrapper main={page} />;

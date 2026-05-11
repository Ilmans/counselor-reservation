import type { ReactNode } from 'react';
import { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import type { CounselorDetailPage } from '@/types/counselor';
import type { AvaibilityItem } from '@/types/schedule';
import CalendarPicker from './components/calendar-picker';
import CounselorCard from './components/cunselor-card';
import Form from './components/form';
import SessionModePicker from './components/session-mode-picker';
import StatusInformation from './components/status-information';
import TimeSlotPicker from './components/time-slot-picker';
import CounselorController from '@/actions/App/Http/Controllers/CounselorController';
import Breadcrumb from '@/components/breadcumb';

type Props = {
    counselor: CounselorDetailPage;
    availability: AvaibilityItem;
};

export default function Create({ counselor, availability }: Props) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [sessionMode, setSessionMode] = useState<'online' | 'offline' | null>(
        null,
    );
    const current = selectedDate ? availability[selectedDate] : null;

    function handleSelectDate(date: string) {
        const item = availability[date];
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
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-[#0d0d0f] dark:text-zinc-200">
            <div className="mx-auto max-w-4xl px-4 py-8">
                <Breadcrumb items={breadcumbs} />
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    <aside className="lg:col-span-1">
                        <CounselorCard counselor={counselor} />
                        <StatusInformation />
                    </aside>

                    <main className="flex flex-col gap-5 lg:col-span-2">
                        <CalendarPicker
                            availability={availability}
                            selectedDate={selectedDate}
                            onSelect={handleSelectDate}
                        />
                        {selectedDate && current && (
                            <TimeSlotPicker
                                date={selectedDate}
                                slots={current.slots}
                                bookedTimes={current.booked_times}
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
    );
}

Create.layout = (page: ReactNode) => <Wrapper main={page} />;

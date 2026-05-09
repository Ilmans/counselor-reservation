import type { ReactNode } from 'react';
import { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import type { CounselorDetailPage } from '@/types/counselor';
import type { AvaibilityItem } from '@/types/schedule';
import CalendarPicker from './components/calendar-picker';
import CounselorCard from './components/cunselor-card';
import SessionModePicker from './components/session-mode-picker';
import StatusInformation from './components/status-information';
import TimeSlotPicker from './components/time-slot-picker';

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
    const canProceed = !!(selectedDate && sessionMode && selectedSlot);

    function handleSelectDate(date: string) {
        const item = availability[date];
        setSelectedDate(date);
        setSelectedSlot(null);
        setSessionMode(item?.method !== 'both' ? (item?.method ?? null) : null);
    }

    function handleSelectMode(mode: 'online' | 'offline') {
        setSessionMode(mode);
        setSelectedSlot(null);
    }

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-[#0d0d0f] dark:text-zinc-200">
            <div className="mx-auto max-w-4xl px-4 py-8">
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
                            <SessionModePicker
                                date={selectedDate}
                                method={current.method}
                                selected={sessionMode}
                                onSelect={handleSelectMode}
                            />
                        )}

                        {selectedDate && sessionMode && current && (
                            <TimeSlotPicker
                                date={selectedDate}
                                slots={current.slots}
                                bookedTimes={current.booked_times}
                                selected={selectedSlot}
                                onSelect={setSelectedSlot}
                            />
                        )}

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                            <button className="rounded-lg border border-zinc-200 px-5 py-2.5 text-[13px] font-medium text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500">
                                ← Kembali
                            </button>
                            <button
                                disabled={!canProceed}
                                className={`rounded-lg px-7 py-2.5 text-[13px] font-medium transition-colors ${
                                    canProceed
                                        ? 'bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white'
                                        : 'cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600'
                                }`}
                            >
                                Lanjut ke Data Diri →
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

Create.layout = (page: ReactNode) => <Wrapper main={page} />;

import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import ReservationController from '@/actions/App/Http/Controllers/ReservationController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { CounselorDetailPage } from '@/types/counselor';
import { GENDER_OPTIONS, SESSION_FIRST_OPTIONS } from '@/utils/constant';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

type Props = {
    counselor: CounselorDetailPage;
    selectedDate: string | null;
    selectedSlot: string | null;
    sessionMode: 'online' | 'offline' | null;
};

export default function Form({
    counselor,
    selectedDate,
    selectedSlot,
    sessionMode,
}: Props) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const isLoggedIn = !!user;
    const isReadOnly = (val: string | number | undefined) =>
        isLoggedIn && !!val;

    const canProceed = !!(selectedDate && sessionMode && selectedSlot);

    const concerns = [
        ...counselor.categories.map((c) => ({
            id: String(c.id),
            name: c.name,
        })),
        { id: 'other', name: 'Lainnya' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        counselor: counselor.id,
        date: selectedDate ?? '',
        time: selectedSlot ?? '',
        method: sessionMode ?? '',
        is_anonymous: false,
        concerns: '',
        is_first: '',
        notes: '',
    });

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            date: selectedDate ?? '',
            time: selectedSlot ?? '',
            method: sessionMode ?? '',
        }));
    }, [selectedDate, selectedSlot, sessionMode]);

    function toggleConcern(name: string) {
        const current = data.concerns ? data.concerns.split(',') : [];
        const next = current.includes(name)
            ? current.filter((c) => c !== name)
            : [...current, name];
        setData('concerns', next.join(','));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        post(ReservationController.store().url);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800/80 dark:bg-[#111113]">
                {/* ── Topik & Keluhan ── */}
                <div>
                    <p className="text-[10px] font-medium tracking-[0.08em] text-zinc-400 uppercase dark:text-zinc-600">
                        Topik & Keluhan
                    </p>
                    <p className="mt-0.5 mb-3 text-[11px] text-zinc-400">
                        Pilih satu atau lebih yang relevan
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {concerns.map((c) => {
                            const active = data.concerns
                                .split(',')
                                .includes(c.name);

                            return (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => toggleConcern(c.name)}
                                    className={`rounded-xl border px-3 py-2.5 text-left text-[12px] transition-colors ${
                                        active
                                            ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#111113] dark:text-zinc-400 dark:hover:border-zinc-700'
                                    }`}
                                >
                                    {c.name}
                                </button>
                            );
                        })}
                    </div>
                    {errors.concerns && (
                        <p className="mt-1.5 text-[11px] text-red-500">
                            {errors.concerns}
                        </p>
                    )}
                </div>

                <div className="my-5 h-px bg-zinc-100 dark:bg-zinc-800" />

                {/* ── Anonim toggle ── */}
                <div className="mb-5 flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                    <div>
                        <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                            Lanjut sebagai anonim
                        </p>
                        <p className="text-[11px] text-zinc-400">
                            Identitasmu tidak akan ditampilkan ke konselor
                        </p>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={data.is_anonymous}
                        onClick={() =>
                            setData('is_anonymous', !data.is_anonymous)
                        }
                        className={`relative h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none ${
                            data.is_anonymous
                                ? 'bg-zinc-900 dark:bg-zinc-100'
                                : 'bg-zinc-200 dark:bg-zinc-700'
                        }`}
                    >
                        <span
                            className={`block h-4 w-4 translate-y-[-1px] rounded-full bg-white shadow transition-transform dark:bg-zinc-900 ${
                                data.is_anonymous
                                    ? 'translate-x-5'
                                    : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>

                {/* ── Data Diri ── */}
                <div className="flex flex-col gap-4">
                    <ToggleGroup
                        label="Apakah ini pengalaman pertama anda berkonsultasi?"
                        options={SESSION_FIRST_OPTIONS}
                        value={data.is_first}
                        onChange={(v) => setData('is_first', v)}
                        error={errors.is_first}
                    />
                </div>

                {/* ── Catatan ── */}
                <div className="mt-4">
                    <RichTextEditor
                        label="Ceritakan Situasimu "
                        placeholder="Deskripsikan secara keluhanmu atau apa yang ingin dibahas"
                        value={data.notes}
                        onChange={(html) => setData('notes', html)}
                        error={errors.notes}
                    />
                </div>
            </section>

            {/* ── CTA ── */}
            <div className="flex items-center justify-between">
                <Button
                    type="button"
                    variant="default"
                    mode="outlined"
                    size="lg"
                >
                    ← Kembali
                </Button>
                <Button
                    type="submit"
                    variant="default"
                    mode="filled"
                    size="lg"
                    disabled={!canProceed || processing}
                >
                    {processing ? 'Memproses…' : 'Konfirmasi Booking →'}
                </Button>
            </div>
        </form>
    );
}

function ToggleGroup({
    label,
    options,
    value,
    onChange,
    error,
}: {
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (v: string) => void;
    error?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-500">
                {label}
            </label>
            <div className="flex gap-2">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(opt.value)}
                        className={`flex-1 rounded-lg border py-2 text-[12px] font-medium transition-colors ${
                            value == opt.value
                                ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                                : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 dark:border-zinc-800 dark:bg-transparent dark:text-zinc-400'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            {error && <p className="text-[11px] text-red-500">{error}</p>}
        </div>
    );
}

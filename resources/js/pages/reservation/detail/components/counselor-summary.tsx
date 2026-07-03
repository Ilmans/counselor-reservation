import type { ReservationDetail } from '@/types/reservation-detail';

export default function CounselorSummary({
    reservation,
}: {
    reservation: ReservationDetail;
}) {
    const { counselor, schedule, method_label, price_label } = reservation;

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
                <img
                    src={counselor.photo_url}
                    alt={counselor.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-zinc-100 dark:ring-zinc-800"
                />
                <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {counselor.name}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {counselor.specialization}
                    </p>
                </div>
            </div>

            <dl className="mt-4 space-y-2.5 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
                <Row label="Tanggal" value={schedule.date} />
                <Row label="Waktu" value={schedule.time} />
                <Row label="Durasi" value={schedule.duration} />
                <Row label="Metode" value={method_label} />
                <Row label="Biaya" value={price_label} />
                <Row label="Topik" value={reservation.categories} />
                <Row
                    label="Sesi pertama?"
                    value={reservation.is_first ? 'Ya' : 'Tidak'}
                />
                <Row
                    label="Anonim"
                    value={reservation.is_anonymous ? 'Ya' : 'Tidak'}
                />
            </dl>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
            <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">
                {value}
            </dd>
        </div>
    );
}

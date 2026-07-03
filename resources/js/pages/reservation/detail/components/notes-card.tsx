import type { ReservationDetail } from '@/types/reservation-detail';

export default function NotesCard({
    reservation,
}: {
    reservation: ReservationDetail;
}) {
    const { notes, status_group } = reservation;

    const items: { label: string; content: string; tone: string }[] = [];

    if (notes.client) {
        items.push({
            label: 'Catatan Anda saat reservasi',
            content: notes.client,
            tone: 'bg-zinc-50 dark:bg-zinc-800/40',
        });
    }

    if (notes.progress) {

        items.push({
            label: 'Catatan Konselor',
            content: notes.progress,
            tone: 'bg-blue-50 dark:bg-blue-500/5',
        });
    }

    if (notes.post_session) {
        items.push({
            label: 'Ringkasan Sesi',
            content: notes.post_session,
            tone: 'bg-emerald-50 dark:bg-emerald-500/5',
        });
    }

    if (status_group === 'cancelled') {
        items.push({
            label:
                reservation.status === 'rejected'
                    ? 'Alasan Penolakan'
                    : 'Alasan Pembatalan',
            content: notes.cancellation_reason ?? 'Tidak ada catatan tambahan.',
            tone: 'bg-rose-50 dark:bg-rose-500/5',
        });
    }

    if (items.length === 0) {
        return null
    }

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Catatan
            </p>
            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className={`rounded-lg p-3 ${item.tone}`}
                    >
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            {item.label}
                        </p>
                        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                            {item.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

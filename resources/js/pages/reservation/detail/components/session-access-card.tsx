import type { ReservationDetail } from '@/types/reservation-detail';

export default function SessionAccessCard({
    reservation,
}: {
    reservation: ReservationDetail;
}) {
    const isOnlineReady = reservation.method === 'online' && reservation.meeting_link;
    const isOfflineReady = reservation.method === 'offline' && reservation.location;

    if (!isOnlineReady && !isOfflineReady) {
        // belum dikonfirmasi -> tampilkan info menunggu, bukan data kosong
        if (
            reservation.status === 'pending_confirmation' &&
            reservation.status_group !== 'cancelled'
        ) {
            return (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/30 dark:text-zinc-400">
                    {reservation.method === 'online'
                        ? 'Link pertemuan akan muncul di sini setelah konselor mengonfirmasi jadwal Anda.'
                        : 'Detail lokasi sesi akan muncul di sini setelah konselor mengonfirmasi jadwal Anda.'}
                </div>
            );
        }
        
        return null;
    }

    if (isOnlineReady) {
        return (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    Link Pertemuan Online
                </p>
                <p className="mt-1 break-all text-sm text-emerald-700 dark:text-emerald-400">
                    {reservation.meeting_link}
                </p>

                    <a href={reservation.meeting_link ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    Gabung Sesi
                </a>
            </div>
        );
    }

    const location = reservation.location!;

    return (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-500/20 dark:bg-blue-500/5">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                Lokasi Sesi Tatap Muka
            </p>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                {location.name}
            </p>
            <p className="text-sm text-blue-700/80 dark:text-blue-400/80">
                {location.address}, {location.city}
            </p>
            {location.maps_url && (

                   <a href={location.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Buka di Peta
                </a>
            )}
        </div>
    );
}

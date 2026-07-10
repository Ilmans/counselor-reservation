import ReservationController from '@/actions/App/Http/Controllers/ReservationController';
import type { CounselorDetail } from '@/types/counselor';
import { Link } from '@inertiajs/react';

type Props = {
    counselor: CounselorDetail;
};

function BookingPanel({ counselor }: Props) {
    const schedules = counselor.schedules;

    return (
        <>
            <div className="sticky top-6 space-y-4 rounded-lg border border-border">
                <div className="border-b border-border bg-card p-5">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Biaya konsultasi
                    </p>
                    <p className="mt-1 text-xl font-semibold text-foreground">
                        {counselor.pricing.label}
                    </p>

                    <Link
                        href={ReservationController.create.url(counselor.slug)}
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center rounded-md bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-primary"
                    >
                        Buat reservasi
                    </Link>
                </div>

                <div className="bg-card p-5">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Jadwal praktik
                    </p>

                    {schedules.length === 0 ? (
                        <p className="mt-3 text-sm text-muted-foreground">
                            Belum ada jadwal yang tersedia.
                        </p>
                    ) : (
                        <ul className="mt-3 divide-y divide-border">
                            {schedules.map((schedule) => (
                                <li
                                    key={schedule.id}
                                    className="flex items-center justify-between gap-2 py-2.5 text-sm first:pt-0 last:pb-0"
                                >
                                    <div>
                                        <p className="font-medium text-foreground">
                                            {schedule.day_label}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {schedule.method_label}
                                        </p>
                                    </div>
                                    <span className="flex-shrink-0 text-muted-foreground">
                                        {schedule.open_time}–
                                        {schedule.close_time}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="border-b border-border px-4 py-3">
                        <h3 className="text-sm font-semibold text-foreground">
                            Lokasi Praktik Offline
                        </h3>
                    </div>

                    <iframe
                        src={counselor.address.maps_url}
                        className="h-52 w-full"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    <div className="border-t border-border p-3">
                        <a
                            href={counselor.address.maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-primary hover:underline"
                        >
                            Buka di Google Maps →
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingPanel;

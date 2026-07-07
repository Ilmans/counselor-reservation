import { Hourglass, Info, MapPin, Video } from 'lucide-react';

import CopyButton from '@/components/ui/copybtn';
import type { ConsultationDetail } from '@/types/consultation';

function SessionInfoCard({
    r,
    isConfirmedOrLater,
}: {
    r: ConsultationDetail;
    isConfirmedOrLater: boolean;
}) {
    if (r.status === 'completed' || r.status_group === 'cancelled') {
        return null;
    }

    if (!isConfirmedOrLater) {
        return (
            <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                <Hourglass size={16} className="shrink-0" />
                Detail sesi (link pertemuan atau lokasi) akan muncul di sini
                setelah konselor mengonfirmasi jadwal.
            </div>
        );
    }

    const isOnline = r.method_label === 'Online';
    const meetLink = isOnline ? r.meeting_link : null;
    const address = !isOnline ? r.location : null;

    return (
        <div className="rounded-2xl border border-primary/25 bg-secondary/50 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Info size={13} />
                </span>
                Informasi Sesi
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Sesi kamu akan dilakukan secara{' '}
                <span className="font-medium text-foreground">
                    {r.method_label}
                </span>
                , berikut detailnya:
            </p>

            <div className="mt-4 divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70 bg-card">
                <div className="p-3.5">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400">
                            <Video size={11} />
                        </span>
                        Google Meet
                    </p>
                    {meetLink ? (
                        <>
                            <p className="mt-1 text-sm break-all text-foreground">
                                {meetLink}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <a
                                    href={meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                                >
                                    Gabung Sesi
                                </a>
                                <CopyButton
                                    value={meetLink}
                                    label="Salin link"
                                />
                            </div>
                        </>
                    ) : (
                        <p className="mt-1 text-sm text-muted-foreground/50">
                            —
                        </p>
                    )}
                </div>

                <div className="p-3.5">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400">
                            <MapPin size={11} />
                        </span>
                        Alamat
                    </p>
                    {address ? (
                        <>
                            <p className="mt-1 text-sm text-foreground">
                                {address.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {address.address}, {address.city}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {address.maps_url && (
                                    <a
                                        href={address.maps_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                                    >
                                        Buka di Peta
                                    </a>
                                )}
                                {address.address && (
                                    <CopyButton
                                        value={`${address.name ?? ''} ${address.address}, ${address.city ?? ''}`.trim()}
                                        label="Salin alamat"
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="mt-1 text-sm text-muted-foreground/50">
                            —
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SessionInfoCard;

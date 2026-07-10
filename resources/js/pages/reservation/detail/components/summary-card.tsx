import { Link } from '@inertiajs/react';
import {
    FileDown,
    MessageCircle,
    ShieldCheck,
    Video,
    Wallet,
} from 'lucide-react';
import type { ConsultationDetail } from '@/types/consultation';

function SummaryCard({
    r,
    showContact,
}: {
    r: ConsultationDetail;
    showContact: boolean;
}) {
    const canJoinNow =
        r.method_label === 'Online' && !!r.meeting_link && showContact;

    return (
        <div className="space-y-3">
            <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                    <img
                        src={r.counselor.photo}
                        alt={r.counselor.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary"
                    />
                    <div className="min-w-0">
                        <p className="truncate font-serif text-base text-foreground">
                            {r.counselor.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                            {r.counselor.specialization}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/40 px-3.5 py-3">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Wallet size={13} /> Biaya Sesi
                    </span>
                    <span className="font-serif text-lg text-foreground">
                        {r.price ?? '-'}
                    </span>
                </div>

                {(r.needs_payment ||
                    canJoinNow ||
                    (showContact && r.counselor.whatsapp) ||
                    r.status === 'completed') && (
                    <div className="mt-3 flex flex-col gap-2">
                        {r.status === 'completed' && (
                            // Bukan <Link> Inertia — ini memicu unduhan file,
                            // jadi harus navigasi browser biasa supaya header
                            // Content-Disposition dari server diproses benar.
                            <a
                                href={`/reservations/${r.reference}/summary-pdf`}
                                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                            >
                                <FileDown size={14} /> Unduh Ringkasan Sesi
                                (PDF)
                            </a>
                        )}

                        {r.needs_payment && r.invoice && (
                            <Link
                                href={`/invoice/${r.invoice.id}`}
                                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                            >
                                <Wallet size={14} /> Bayar Sekarang
                            </Link>
                        )}

                        {canJoinNow && (
                            <a
                                href={r.meeting_link ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/40 px-4 py-2.5 text-xs font-semibold text-primary transition hover:bg-secondary/50"
                            >
                                <Video size={14} /> Gabung Sesi
                            </a>
                        )}

                        {/* {showContact && r.counselor.whatsapp && (
                            <a
                                href={`https://wa.me/${r.counselor.whatsapp.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
                            >
                                <MessageCircle size={14} /> Hubungi via WhatsApp
                            </a>
                        )} */}
                    </div>
                )}
            </div>

            {/* Satu-satunya tempat No. Referensi ditampilkan (sebelumnya juga
                muncul di header halaman — dobel tanpa alasan). Digabung
                dengan pesan kerahasiaan biar sidebar kanan terasa terisi
                dan tetap relevan buat konteks konsultasi psikologis. */}
            <div className="flex items-start gap-2.5 rounded-2xl border border-teal-200 bg-teal-50/60 p-4 dark:border-teal-900/50 dark:bg-teal-950/20">
                <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400"
                />
                <div className="min-w-0">
                    <p className="text-xs font-medium text-teal-800 dark:text-teal-300">
                        {r.is_anonymous
                            ? 'Identitasmu dirahasiakan'
                            : 'Percakapanmu bersifat rahasia'}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-teal-700/80 dark:text-teal-400/70">
                        No. Referensi{' '}
                        <button
                            type="button"
                            onClick={() =>
                                navigator.clipboard?.writeText(r.reference)
                            }
                            className="font-mono font-medium text-teal-800 underline decoration-dotted underline-offset-2 dark:text-teal-300"
                        >
                            {r.reference}
                        </button>{' '}
                        — hanya kamu dan tim kami yang bisa mengaksesnya.
                    </p>
                </div>
            </div>

            {r.location?.maps_url && r.method == 'offline' && (
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="border-b border-border px-4 py-3">
                        <h3 className="text-sm font-semibold text-foreground">
                            Lokasi Konsultasi
                        </h3>
                    </div>

                    <iframe
                        src={r.location.maps_url}
                        className="h-52 w-full"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    <div className="border-t border-border p-3">
                        <a
                            href={r.location.maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-primary hover:underline"
                        >
                            Buka di Google Maps →
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SummaryCard;

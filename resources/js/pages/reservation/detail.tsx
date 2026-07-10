import { Link, router } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import Breadcrumb from '@/components/breadcumb';
import Wrapper from '@/layouts/wrapper';
import type { ConsultationDetail } from '@/types/consultation';
import type { Review } from '@/types/review';
import CancelReservationModal from './detail/components/cancel-modal';
import { getSurfacedNoteId } from './detail/components/consultationstatus';
import NotesCard from './detail/components/notes-card';
import PaymentAlert from './detail/components/payment-alert';
import ReviewModal from './detail/components/review-modal';
import ScheduleCard from './detail/components/schedule-card';
import SessionInfoCard from './detail/components/session-info';
import StatusHero from './detail/components/status-hero';
import SummaryCard from './detail/components/summary-card';
import PageHead from '@/components/page-head';
import consultation from '@/routes/consultation';
import ConsultationChatCard from '@/components/interactive/consultation-chat-card';
import ConsultationChatWidget from '@/components/interactive/consultation-chat-widget';

type Props = {
    reservation: ConsultationDetail;
    feedback: Review | null;
};

export default function Detail({ reservation: r, feedback }: Props) {
    const [cancelOpen, setCancelOpen] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);

    const isBroken = r.status_group === 'cancelled';
    const isConfirmedOrLater = !isBroken && r.status !== 'pending_confirmation';
    // Kontak konselor hanya relevan selama jadwal masih berjalan — sebelum
    // dikonfirmasi belum tentu jadi, dan setelah selesai tidak lagi perlu.
    const showContact =
        r.status === 'confirmed' ||
        r.status === 'in_queue' ||
        r.status === 'in_progress';

    // Catatan yang sudah tampil sebagai alasan pembatalan di StatusHero tidak
    // perlu diulang lagi di NotesCard.
    const excludedNoteId = getSurfacedNoteId(r);

    const breadcumbs = [
        { label: 'Beranda', href: '/' },
        { label: 'Reservasi Saya', href: '/my-reservations' },
        { label: r.reference },
    ];

    function handleReviewSuccess() {
        router.reload({ only: ['feedback'] });
    }

    return (
        <>
            <PageHead title={`Detail konsultasi ${r.reference}`} />
            <div className="min-h-screen bg-background font-sans text-foreground antialiased">
                <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6 lg:py-10">
                    <Breadcrumb items={breadcumbs} />

                    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-6">
                        <div className="min-w-0 space-y-4">
                            {r.needs_payment && r.invoice && (
                                <PaymentAlert invoice={r.invoice} />
                            )}

                            <StatusHero
                                r={r}
                                feedback={feedback}
                                onOpenCancel={() => setCancelOpen(true)}
                                onOpenReview={() => setReviewOpen(true)}
                            />

                            <ScheduleCard r={r} />

                            <SessionInfoCard
                                r={r}
                                isConfirmedOrLater={isConfirmedOrLater}
                            />

                            <NotesCard
                                notes={r.notes}
                                excludeNoteId={excludedNoteId}
                            />

                            {r.status !== 'completed' && (
                                <p className="text-center text-xs text-muted-foreground">
                                    Ada yang perlu ditanyakan?{' '}
                                    <Link
                                        href="/support"
                                        className="font-medium text-foreground underline underline-offset-2"
                                    >
                                        Hubungi tim kami
                                    </Link>
                                </p>
                            )}
                        </div>

                        <aside className="lg:sticky lg:top-24">
                            <SummaryCard r={r} showContact={showContact} />
                        </aside>
                    </div>
                </div>

                <CancelReservationModal
                    reservation={r}
                    open={cancelOpen}
                    onClose={() => setCancelOpen(false)}
                />
                <ReviewModal
                    reservation={r}
                    open={reviewOpen}
                    onClose={() => setReviewOpen(false)}
                    onSuccess={handleReviewSuccess}
                />
            </div>

            <ConsultationChatWidget
                consultationStatus={r.status}
                consultationId={r.id}
                currentSenderType="user"
                consultationReference={r.reference}
                statusLabel={r.status_label}
            />
        </>
    );
}

Detail.layout = (page: ReactNode) => <Wrapper main={page} />;

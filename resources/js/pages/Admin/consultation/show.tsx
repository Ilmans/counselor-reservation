import { Link } from '@inertiajs/react';
import { ArrowLeft, Star } from 'lucide-react';
import { useState, ReactNode } from 'react';
import AdminConsultationController from '@/actions/App/Http/Controllers/Admin/AdminConsultationController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import type {
    ConsultationDetail,
    ConsultationNoteType,
} from '@/types/consultation';
import { CONSULTATION_STATUS_CLASSES } from '@/types/consultation';
import StatusModal from './components/status-modal';
import ConsultationNotes from '@/pages/Counselor/consultation/components/detail/notes-consultation';
import { Review } from '@/types/review';

interface Props {
    consultation: ConsultationDetail;
    feedback: Review;
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
                {title}
            </h3>
            {children}
        </div>
    );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex justify-between gap-4 py-1 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-right font-medium text-foreground">
                {value}
            </span>
        </div>
    );
}

function Show({ consultation,feedback }: Props) {
    const [statusModalOpen, setStatusModalOpen] = useState(false);

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <Link
                        href={AdminConsultationController.index.url()}
                        className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Kembali
                    </Link>
                    <DashboardTitle
                        title={`Konsultasi ${consultation.reference}`}
                        desc="Detail data konsultasi."
                    />
                </div>

                <div className="flex items-center gap-3">
                    <Badge
                        className={
                            CONSULTATION_STATUS_CLASSES[consultation.status]
                        }
                    >
                        {consultation.status_label}
                    </Badge>
                    <Button
                        type="button"
                        onClick={() => setStatusModalOpen(true)}
                    >
                        Ubah Status
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Section title="Data Konsultasi">
                    <Row label="Kategori" value={consultation.categories} />
                    <Row label="Tanggal" value={consultation.date} />
                    <Row label="Waktu" value={consultation.time} />
                    <Row label="Metode" value={consultation.mode} />
                    <Row label="Durasi" value={consultation.duration} />
                    <Row
                        label="Antrian ke"
                        value={consultation.queue_position}
                    />
                    <Row
                        label="Anonim"
                        value={consultation.is_anonymous ? 'Ya' : 'Tidak'}
                    />
                    <Row
                        label="Pengalaman pertama"
                        value={
                            consultation.client_first_experience
                                ? 'Ya'
                                : 'Tidak'
                        }
                    />
                    {consultation.meeting_link && (
                        <Row
                            label="Link Meeting"
                            value={
                                <a
                                    href={consultation.meeting_link}
                                    target="_blank"
                                    className="text-primary hover:underline"
                                >
                                    Buka Link
                                </a>
                            }
                        />
                    )}
                </Section>

                <Section title="Klien & Konselor">
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                        Klien
                    </p>
                    <Row label="Nama" value={consultation.user.name} />
                    <Row label="Email" value={consultation.user.email} />
                    <Row
                        label="WhatsApp"
                        value={consultation.user.whatsapp ?? '-'}
                    />

                    <p className="mt-3 mb-1 text-xs font-medium text-muted-foreground">
                        Konselor
                    </p>
                    <Row label="Nama" value={consultation.counselor.name} />
                    <Row
                        label="Spesialisasi"
                        value={consultation.counselor.specialization}
                    />
                    <Row
                        label="WhatsApp"
                        value={consultation.counselor.whatsapp ?? '-'}
                    />
                </Section>

                <Section title="Invoice">
                    {consultation.invoice ? (
                        <>
                            <Row
                                label="Reference"
                                value={consultation.invoice.reference}
                            />
                            <Row
                                label="Jumlah"
                                value={consultation.invoice.amount}
                            />
                            <Row
                                label="Status"
                                value={consultation.invoice.status_label}
                            />
                            <Row
                                label="Dibayar pada"
                                value={consultation.invoice.paid_at ?? '-'}
                            />
                            <Row
                                label="Kadaluarsa pada"
                                value={consultation.invoice.expired_at ?? '-'}
                            />
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Belum ada invoice.
                        </p>
                    )}
                </Section>

                <Section title="Feedback">
                    {feedback ? (
                        <>
                            <div className="mb-2 flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < feedback.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-muted-foreground/30'
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-foreground">
                                {feedback.comment}
                            </p>
                            {consultation.is_anonymous && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Feedback dikirim secara anonim
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Belum ada feedback dari klien.
                        </p>
                    )}
                </Section>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-card p-4">
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                    Riwayat Catatan
                </h3>
                {consultation.notes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        Belum ada catatan.
                    </p>
                ) : (
                    <div className="flex flex-col gap-3">
                        <ConsultationNotes notes={consultation.notes} />
                    </div>
                )}
            </div>

            <StatusModal
                open={statusModalOpen}
                onClose={() => setStatusModalOpen(false)}
                consultation={consultation}
            />
        </>
    );
}

export default Show;
Show.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-consultations" />
);

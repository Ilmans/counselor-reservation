import { CheckCircle2, Clock, PlayCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { useConfirm } from '@/hooks/use-confirm';
import { router } from '@inertiajs/react';
import type { ConsultationDetail } from '@/types/consultation';
import ManageStatusConsultationController from '@/actions/App/Http/Controllers/Counselor/ManageStatusConsultationController';

interface Props {
    consultation: ConsultationDetail;
}

function StatusHero({ consultation }: Props) {
    const { confirm, ConfirmDialog, setProcessing } = useConfirm();

    // state khusus modal tolak (butuh form, jadi tidak lewat useConfirm)
    const [rejectOpen, setRejectOpen] = useState(false);
    const [rejectNote, setRejectNote] = useState('');
    const [rejectError, setRejectError] = useState<string | null>(null);
    const [rejectProcessing, setRejectProcessing] = useState(false);

    const closeReject = () => {
        if (rejectProcessing) return;

        setRejectOpen(false);
        setRejectNote('');
        setRejectError(null);
    };

    async function handleReject() {
        const note = rejectNote.trim();

        if (!note || note === '<p><br></p>') {
            setRejectError('Catatan penolakan wajib diisi.');

            return;
        }
        setRejectError(null);
        setRejectProcessing(true);
        // TODO: router.post(route('consultation.reject', consultation.id), { note })
        router.post(
            ManageStatusConsultationController.reject.url(consultation.id),
            { note },
        );
        setRejectProcessing(false);
        closeReject();
    }

    function askApprove() {
        confirm({
            title: 'Konfirmasi Sesi',
            description:
                'Sesi ini akan dikonfirmasi dan jadwal akan mengikat kedua pihak. Lanjutkan?',
            confirmLabel: 'Ya, Konfirmasi',
            cancelLabel: 'Batal',
            variant: 'default',
            onConfirm: async () => {
                setProcessing(true);
                router.post(
                    ManageStatusConsultationController.approve.url(
                        consultation.id,
                    ),
                );

                setProcessing(false);
            },
        });
    }

    function askStart() {
        confirm({
            title: 'Mulai Sesi',
            description:
                'Pastikan Anda siap memulai sesi konsultasi ini sekarang.',
            confirmLabel: 'Ya, Mulai',
            cancelLabel: 'Batal',
            variant: 'default',
            onConfirm: async () => {
                setProcessing(true);
                router.post(
                    ManageStatusConsultationController.start.url(
                        consultation.id,
                    ),
                );

                setProcessing(false);
            },
        });
    }

    function askComplete() {
        confirm({
            title: 'Tandai Sesi Selesai',
            description:
                'Sesi ini akan ditandai selesai dan tidak dapat diubah kembali.',
            confirmLabel: 'Ya, Selesai',
            cancelLabel: 'Batal',
            variant: 'default',
            onConfirm: async () => {
                setProcessing(true);
                router.post(
                    ManageStatusConsultationController.complete.url(
                        consultation.id,
                    ),
                );

                setProcessing(false);
            },
        });
    }

    return (
        <div className="rounded-2xl border border-l-4 border-border border-l-primary bg-card p-5 sm:p-6">
            <div className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-foreground/80">
                    <Clock size={18} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                    <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground/80">
                        {consultation.status_label}
                    </span>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Tanggal : {consultation.date} | {consultation.time}
                    </p>
                </div>
            </div>

            {/* ==== Footer aksi, tergantung status ==== */}

            {consultation.status == 'pending_confirmation' && (
                <div className="mt-5 flex items-center justify-end gap-2 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                        Klien telah menyelesaikan administrasi pembayaran dan
                        menunggu konfirmasi anda.
                    </p>
                    <Button
                        variant="red"
                        mode="outlined"
                        size="sm"
                        onClick={() => setRejectOpen(true)}
                    >
                        <XCircle size={14} /> Tolak
                    </Button>
                    <Button
                        variant="green"
                        mode="filled"
                        size="sm"
                        onClick={askApprove}
                    >
                        <CheckCircle2 size={14} /> Konfirmasi
                    </Button>
                </div>
            )}

            {(consultation.status === 'in_queue' ||
                consultation.status === 'confirmed') && (
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                        {consultation.status == 'confirmed'
                            ? 'Sesi dapat dimulai saat jadwal tiba'
                            : `Dalam antrian ke-${consultation.queue_position}`}
                    </p>
                    <Button
                        variant="default"
                        mode="filled"
                        size="sm"
                        onClick={askStart}
                    >
                        <PlayCircle size={14} /> Mulai Sesi
                    </Button>
                </div>
            )}

            {consultation.status === 'in_progress' && (
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                        Tandai sesi selesai setelah konsultasi berakhir.
                    </p>
                    <Button
                        variant="blue"
                        mode="filled"
                        size="sm"
                        onClick={askComplete}
                    >
                        <CheckCircle2 size={14} /> Tandai Sesi Selesai
                    </Button>
                </div>
            )}

            {consultation.status === 'completed' && (
                <div className="mt-5 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                        Sesi ini sudah selesai. Tidak ada aksi lanjutan.
                    </p>
                </div>
            )}

            {/* modal konfirmasi generik (approve/start/complete) dari useConfirm */}
            <ConfirmDialog />

            {/* modal tolak, custom karena butuh form catatan */}
            <Modal open={rejectOpen} onClose={closeReject}>
                <h2 className="font-serif text-base text-foreground">
                    Tolak Sesi
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                    Jelaskan alasan penolakan agar dapat dilihat oleh pemohon.
                </p>

                <div className="mt-4">
                    <RichTextEditor
                        label="Catatan Penolakan"
                        value={rejectNote}
                        onChange={(html) => {
                            setRejectNote(html);
                            if (rejectError) setRejectError(null);
                        }}
                        placeholder="Tuliskan alasan penolakan..."
                        error={rejectError ?? undefined}
                    />
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                    <Button
                        variant="default"
                        mode="outlined"
                        size="sm"
                        disabled={rejectProcessing}
                        onClick={closeReject}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="red"
                        mode="filled"
                        size="sm"
                        loading={rejectProcessing}
                        onClick={handleReject}
                    >
                        <XCircle size={14} /> Tolak Sesi
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default StatusHero;

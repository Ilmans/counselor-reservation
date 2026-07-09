import { useForm } from '@inertiajs/react';
import { useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import AdminConsultationController from '@/actions/App/Http/Controllers/Admin/AdminConsultationController';
import type { ConsultationDetail } from '@/types/consultation';
import Modal from '@/components/ui/modal';

interface Props {
    open: boolean;
    onClose: () => void;
    consultation: ConsultationDetail;
}

const STATUS_OPTIONS = [
    { value: 'pending_payment', label: 'Menunggu Pembayaran' },
    { value: 'pending_confirmation', label: 'Menunggu Konfirmasi' },
    { value: 'confirmed', label: 'Terkonfirmasi' },
    { value: 'in_queue', label: 'Dalam Antrian' },
    { value: 'in_progress', label: 'Sedang Berlangsung' },
    { value: 'completed', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' },
    { value: 'rejected', label: 'Ditolak' },
];

function StatusModal({ open, onClose, consultation }: Props) {
    const form = useForm<{ status: string; note: string }>({
        status: consultation.status,
        note: '',
    });

    useEffect(() => {
        if (!open) return;
        form.setData({ status: consultation.status, note: '' });
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, consultation.status]);

    const requiresNote =
        form.data.status === 'cancelled' || form.data.status === 'rejected';

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.post(
            AdminConsultationController.updateStatus.url(consultation.id),
            {
                preserveScroll: true,
                onSuccess: () => onClose(),
            },
        );
    };

    return (
        <Modal open={open} onClose={onClose} className="max-w-md">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
                Ubah Status Konsultasi
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Status
                    </label>
                    <select
                        value={form.data.status}
                        onChange={(e) => form.setData('status', e.target.value)}
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {form.errors.status && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.status}
                        </p>
                    )}
                </div>

                {requiresNote && (
                    <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                            Catatan Pembatalan/Penolakan{' '}
                            <span className="text-red-600">*</span>
                        </label>
                        <textarea
                            value={form.data.note}
                            onChange={(e) =>
                                form.setData('note', e.target.value)
                            }
                            rows={4}
                            placeholder="Jelaskan alasan pembatalan/penolakan..."
                            className="w-full rounded-md border border-border px-3 py-2 text-sm"
                        />
                        {form.errors.note && (
                            <p className="mt-1 text-xs text-red-600">
                                {form.errors.note}
                            </p>
                        )}
                    </div>
                )}

                <div className="mt-2 flex justify-end gap-2">
                    <Button
                        type="button"
                        mode="outlined"
                        onClick={onClose}
                        disabled={form.processing}
                    >
                        Batal
                    </Button>
                    <Button type="submit" disabled={form.processing}>
                        Simpan
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default StatusModal;

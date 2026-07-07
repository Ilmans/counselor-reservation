import ConfirmModal from '@/components/ui/confirm-modal';
import type { ConsultationDetail } from '@/types/consultation';

function CancelReservationModal({
    reservation,
    open,
    onClose,
}: {
    reservation: ConsultationDetail;
    open: boolean;
    onClose: () => void;
}) {
    return (
        <ConfirmModal
            open={open}
            onClose={onClose}
            onConfirm={() => {
                // TODO: hubungkan ke router.post(`/reservations/${reservation.id}/cancel`) setelah alur ini disetujui
            }}
            title="Batalkan reservasi ini?"
            description={`Pembatalan hanya dapat dilakukan sebelum konselor mengonfirmasi. Jadwal ${reservation.schedule.date}, pukul ${reservation.schedule.time} bersama ${reservation.counselor.name} akan dilepas.`}
            cancelLabel="Simpan Jadwal"
            confirmLabel="Ya, Batalkan"
        />
    );
}

export default CancelReservationModal;

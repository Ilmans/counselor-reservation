import { router } from '@inertiajs/react';
import { Loader2, PartyPopper, Star, X } from 'lucide-react';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import Modal from '@/components/ui/modal';
import type { ConsultationDetail } from '@/types/consultation';

function ReviewModal({
    reservation,
    open,
    onClose,
    onSuccess,
}: {
    reservation: ConsultationDetail;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Kunci modal tetap terbuka selama proses submit / sudah sukses,
    // walau parent mengirim `open=false` akibat data ter-refresh.
    const [visible, setVisible] = useState(open);

    useEffect(() => {
        if (open) {
            setVisible(true);
        } else if (!processing && !submitted) {
            // hanya ikut tutup dari parent kalau memang tidak sedang
            // proses / belum menampilkan pesan sukses
            setVisible(false);
        }
    }, [open, processing, submitted]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setProcessing(true);
        router.post(
            `/reservations/${reservation.reference}/review`,
            { rating, comment, is_anonymous: reservation.is_anonymous },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setSubmitted(true);
                    onSuccess();
                },
                onError: () => {
                    // biarkan modal tetap terbuka supaya user bisa retry
                },
                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    }

    function handleClose() {
        setVisible(false);
        onClose();
        setTimeout(() => {
            setRating(0);
            setHovered(0);
            setComment('');
            setSubmitted(false);
            setProcessing(false);
        }, 300);
    }

    return (
        <Modal open={visible} onClose={handleClose}>
            {submitted ? (
                <div className="flex flex-col items-center py-6 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <PartyPopper size={20} />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                        Terima kasih atas ulasanmu
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Masukanmu membantu klien lain menemukan konselor yang
                        tepat.
                    </p>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="mt-5 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                    >
                        Selesai
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-foreground">
                                Beri Ulasan
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                Sesi bersama {reservation.counselor.name}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={processing}
                            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
                            aria-label="Tutup"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="mt-4 flex justify-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHovered(star)}
                                onMouseLeave={() => setHovered(0)}
                                onClick={() => setRating(star)}
                                disabled={processing}
                                className="p-0.5 text-amber-400 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label={`${star} bintang`}
                            >
                                <Star
                                    size={26}
                                    fill={
                                        (hovered || rating) >= star
                                            ? 'currentColor'
                                            : 'none'
                                    }
                                />
                            </button>
                        ))}
                    </div>

                    <label className="mt-4 block">
                        <span className="text-xs font-medium text-muted-foreground">
                            Ceritakan pengalamanmu (opsional)
                        </span>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            disabled={processing}
                            placeholder="Apa yang membuat sesi ini terasa membantu?"
                            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary disabled:opacity-60"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={rating === 0 || processing}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {processing && (
                            <Loader2 size={14} className="animate-spin" />
                        )}
                        {processing ? 'Mengirim...' : 'Kirim Ulasan'}
                    </button>
                </form>
            )}
        </Modal>
    );
}

export default ReviewModal;

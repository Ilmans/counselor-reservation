import { PartyPopper, Star, X } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import Modal from '@/components/ui/modal';
import type { ConsultationDetail } from '@/types/consultation';

function ReviewModal({
    reservation,
    open,
    onClose,
}: {
    reservation: ConsultationDetail;
    open: boolean;
    onClose: () => void;
}) {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // TODO: kirim ke endpoint review setelah tersedia, mis.
        // router.post(`/reservations/${reservation.id}/review`, { rating, comment })
        setSubmitted(true);
    }

    function handleClose() {
        onClose();
        setTimeout(() => {
            setRating(0);
            setHovered(0);
            setComment('');
            setSubmitted(false);
        }, 300);
    }

    return (
        <Modal open={open} onClose={handleClose}>
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
                            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
                                className="p-0.5 text-amber-400 transition-transform hover:scale-110"
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
                            placeholder="Apa yang membuat sesi ini terasa membantu?"
                            className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-primary"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={rating === 0}
                        className="mt-4 w-full rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Kirim Ulasan
                    </button>
                </form>
            )}
        </Modal>
    );
}

export default ReviewModal;

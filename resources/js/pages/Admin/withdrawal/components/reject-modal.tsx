import { useForm } from '@inertiajs/react';
import { useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import WithdrawController from '@/actions/App/Http/Controllers/Admin/WithdrawController';
import type { AdminWithdrawal } from '@/types/withdrawal';

interface Props {
    open: boolean;
    onClose: () => void;
    withdrawal: AdminWithdrawal | null;
}

function RejectModal({ open, onClose, withdrawal }: Props) {
    const form = useForm<{ notes: string }>({ notes: '' });

    useEffect(() => {
        if (!open) return;
        form.setData('notes', '');
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!withdrawal) return;

        form.post(WithdrawController.reject.url(withdrawal.id), {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    };

    return (
        <Modal open={open} onClose={onClose} className="max-w-sm">
            <h2 className="mb-1 text-lg font-semibold text-foreground">
                Tolak Penarikan Dana
            </h2>
            <p className="mb-4 text-[12px] text-muted-foreground">
                Saldo sebesar {withdrawal?.amount_formatted} akan dikembalikan
                ke saldo {withdrawal?.counselor.name}.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Alasan Penolakan
                    </label>
                    <textarea
                        rows={3}
                        value={form.data.notes}
                        onChange={(e) => form.setData('notes', e.target.value)}
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                        placeholder="Contoh: Nomor rekening tidak sesuai nama pemilik"
                    />
                    {form.errors.notes && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.notes}
                        </p>
                    )}
                </div>

                <div className="mt-2 flex justify-end gap-2">
                    <Button
                        type="button"
                        mode="outlined"
                        onClick={onClose}
                        disabled={form.processing}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        variant="red"
                        disabled={form.processing}
                    >
                        {form.processing ? 'Memproses...' : 'Tolak Penarikan'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default RejectModal;

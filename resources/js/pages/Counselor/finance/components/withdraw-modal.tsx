import { useForm } from '@inertiajs/react';
import { useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import FinanceController from '@/actions/App/Http/Controllers/Counselor/FinanceController';
import type { Wallet } from '@/types/withdrawal';

interface Props {
    open: boolean;
    onClose: () => void;
    wallet: Wallet;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value || 0);
}

function WithdrawModal({ open, onClose, wallet }: Props) {
    const form = useForm<{ amount: string }>({ amount: '' });

    useEffect(() => {
        if (!open) return;
        form.setData('amount', '');
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.post(FinanceController.store.url(), {
            preserveScroll: true,
            onSuccess: () => onClose(),
        });
    };

    const hasBankInfo = !!wallet.bank_name && !!wallet.account_number;

    return (
        <Modal open={open} onClose={onClose} className="max-w-sm">
            <h2 className="mb-1 text-lg font-semibold text-foreground">
                Tarik Dana
            </h2>
            <p className="mb-4 text-[12px] text-muted-foreground">
                Saldo tersedia: {formatCurrency(wallet.balance)}
            </p>

            {!hasBankInfo ? (
                <p className="rounded-md bg-yellow-50 p-3 text-xs text-yellow-700">
                    Kamu belum mengisi informasi rekening bank. Lengkapi dulu di
                    menu Pengaturan sebelum menarik dana.
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="rounded-md border border-border p-3 text-xs text-muted-foreground">
                        <p className="font-medium text-foreground">
                            {wallet.bank_name}
                        </p>
                        <p>
                            {wallet.account_number} &middot;{' '}
                            {wallet.account_holder_name}
                        </p>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                            Jumlah Penarikan
                        </label>
                        <input
                            type="number"
                            value={form.data.amount}
                            onChange={(e) =>
                                form.setData('amount', e.target.value)
                            }
                            placeholder="Contoh: 100000"
                            className="w-full rounded-md border border-border px-3 py-2 text-sm"
                        />
                        {form.errors.amount && (
                            <p className="mt-1 text-xs text-red-600">
                                {form.errors.amount}
                            </p>
                        )}
                        <p className="mt-1 text-[11px] text-muted-foreground">
                            Minimal penarikan Rp50.000
                        </p>
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
                        <Button type="submit" disabled={form.processing}>
                            {form.processing ? 'Mengirim...' : 'Tarik Dana'}
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}

export default WithdrawModal;

import { useForm } from '@inertiajs/react';
import { useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import AdminPaymentMethodController from '@/actions/App/Http/Controllers/Admin/AdminPaymentMethodController';
import Modal from '@/components/ui/modal';

interface Props {
    open: boolean;
    onClose: () => void;
    paymentMethod: any | null;
}

interface PaymentMethodForm {
    code: string;
    name: string;
    type: 'bank_transfer' | 'ewallet' | 'qris' | 'virtual_account';
    is_active: boolean;
    metadata: {
        logo: string;
        account_name: string;
        account_number: string;
        qr_image: string;
        merchant_name: string;
    };
}

const EMPTY_METADATA = {
    logo: '',
    account_name: '',
    account_number: '',
    qr_image: '',
    merchant_name: '',
};

function PaymentMethodModal({ open, onClose, paymentMethod }: Props) {
    const isEdit = !!paymentMethod;

    const form = useForm<PaymentMethodForm>({
        code: '',
        name: '',
        type: 'bank_transfer',
        is_active: true,
        metadata: EMPTY_METADATA,
    });

    useEffect(() => {
        if (!open) return;

        if (paymentMethod) {
            form.setData({
                code: paymentMethod.code,
                name: paymentMethod.name,
                type: paymentMethod.type,
                is_active: paymentMethod.is_active,
                metadata: {
                    ...EMPTY_METADATA,
                    ...(paymentMethod.metadata ?? {}),
                },
            });
        } else {
            form.reset();
        }
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, paymentMethod]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            form.put(
                AdminPaymentMethodController.update.url(paymentMethod.id),
                {
                    preserveScroll: true,
                    onSuccess: () => onClose(),
                },
            );
        } else {
            form.post(AdminPaymentMethodController.store.url(), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        }
    };

    const isBankLike =
        form.data.type === 'bank_transfer' ||
        form.data.type === 'virtual_account';
    const isQris = form.data.type === 'qris';

    return (
        <Modal open={open} onClose={onClose} className="max-w-md">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
                {isEdit ? 'Edit Metode Pembayaran' : 'Tambah Metode Pembayaran'}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1"
            >
                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Kode
                    </label>
                    <input
                        type="text"
                        value={form.data.code}
                        onChange={(e) => form.setData('code', e.target.value)}
                        placeholder="mis. bca_va, gopay, qris_static"
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    />
                    {form.errors.code && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.code}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Nama
                    </label>
                    <input
                        type="text"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    />
                    {form.errors.name && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Tipe
                    </label>
                    <select
                        value={form.data.type}
                        onChange={(e) =>
                            form.setData(
                                'type',
                                e.target.value as PaymentMethodForm['type'],
                            )
                        }
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    >
                        <option value="bank_transfer">Transfer Bank</option>
                        <option value="virtual_account">Virtual Account</option>
                        <option value="ewallet">E-Wallet</option>
                        <option value="qris">QRIS</option>
                    </select>
                    {form.errors.type && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.type}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Logo (URL, opsional)
                    </label>
                    <input
                        type="text"
                        value={form.data.metadata.logo}
                        onChange={(e) =>
                            form.setData('metadata', {
                                ...form.data.metadata,
                                logo: e.target.value,
                            })
                        }
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    />
                </div>

                {isBankLike && (
                    <>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-foreground">
                                Nama Rekening
                            </label>
                            <input
                                type="text"
                                value={form.data.metadata.account_name}
                                onChange={(e) =>
                                    form.setData('metadata', {
                                        ...form.data.metadata,
                                        account_name: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-border px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-foreground">
                                Nomor Rekening
                            </label>
                            <input
                                type="text"
                                value={form.data.metadata.account_number}
                                onChange={(e) =>
                                    form.setData('metadata', {
                                        ...form.data.metadata,
                                        account_number: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-border px-3 py-2 text-sm"
                            />
                        </div>
                    </>
                )}

                {isQris && (
                    <>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-foreground">
                                URL Gambar QR
                            </label>
                            <input
                                type="text"
                                value={form.data.metadata.qr_image}
                                onChange={(e) =>
                                    form.setData('metadata', {
                                        ...form.data.metadata,
                                        qr_image: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-border px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-foreground">
                                Nama Merchant
                            </label>
                            <input
                                type="text"
                                value={form.data.metadata.merchant_name}
                                onChange={(e) =>
                                    form.setData('metadata', {
                                        ...form.data.metadata,
                                        merchant_name: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-border px-3 py-2 text-sm"
                            />
                        </div>
                    </>
                )}

                <label className="mt-1 flex items-center gap-2 text-sm text-foreground">
                    <input
                        type="checkbox"
                        checked={form.data.is_active}
                        onChange={(e) =>
                            form.setData('is_active', e.target.checked)
                        }
                    />
                    Aktif
                </label>

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
                        {isEdit ? 'Simpan' : 'Tambah'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default PaymentMethodModal;

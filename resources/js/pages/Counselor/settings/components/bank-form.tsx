import { useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';
import CounselorSettingController from '@/actions/App/Http/Controllers/Counselor/CounselorSettingController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface AvailableBank {
    code: string;
    name: string;
}

interface Wallet {
    balance: number;
    bank_name: string | null;
    account_number: string | null;
    account_holder_name: string | null;
}

interface Props {
    wallet: Wallet;
    counselorId: number;
}

function BankForm({ wallet, counselorId }: Props) {
    const { app } = usePage().props as unknown as {
        app: { availableBank: AvailableBank[] };
    };

    const { data, setData, post, processing, errors } = useForm({
        bank_name: wallet.bank_name ?? '',
        account_number: wallet.account_number ?? '',
        account_holder_name: wallet.account_holder_name ?? '',
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(CounselorSettingController.updateBank.url(counselorId), {
            preserveScroll: true,
            only: ['toast', 'counselor', 'alert'],
        });
    };

    return (
        <div className="space-y-5">
            {/* --- Ringkasan Saldo --- */}
            {/* <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-medium text-foreground">
                    Saldo Kamu
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                    {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0,
                    }).format(wallet.balance)}
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">
                    Saldo bertambah otomatis setiap sesi konsultasi selesai.
                </p>
            </div> */}

            {/* --- Form Info Rekening --- */}
            <form
                onSubmit={onSubmit}
                className="rounded-xl border border-border bg-card p-5"
            >
                <p className="text-sm font-medium text-foreground">
                    Rekening Penarikan Dana
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">
                    Pastikan data rekening benar. Dana akan ditransfer ke
                    rekening ini saat kamu melakukan penarikan.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select
                        label="Nama Bank"
                        value={data.bank_name}
                        onChange={(e) => setData('bank_name', e.target.value)}
                        error={errors.bank_name}
                        options={[
                            { label: 'Pilih bank', value: '' },
                            ...app.availableBank.map((b) => ({
                                label: b.name,
                                value: b.code,
                            })),
                        ]}
                    />
                    <Input
                        label="Nomor Rekening"
                        value={data.account_number}
                        onChange={(e) =>
                            setData('account_number', e.target.value)
                        }
                        error={errors.account_number}
                        inputMode="numeric"
                    />
                    <Input
                        label="Nama Pemilik Rekening"
                        value={data.account_holder_name}
                        onChange={(e) =>
                            setData('account_holder_name', e.target.value)
                        }
                        error={errors.account_holder_name}
                        hint="Harus sesuai nama di buku tabungan"
                    />
                </div>

                <div className="mt-5 flex justify-end">
                    <Button
                        type="submit"
                        variant="default"
                        mode="filled"
                        disabled={processing}
                        loading={processing}
                    >
                        {processing ? 'Menyimpan' : 'Simpan Rekening'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default BankForm;

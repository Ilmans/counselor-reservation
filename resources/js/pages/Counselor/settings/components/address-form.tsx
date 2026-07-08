import CounselorSettingController from '@/actions/App/Http/Controllers/Counselor/CounselorSettingController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { CounselorAddress } from '@/types/counselor';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Props {
    address: CounselorAddress;
    counselorId: number;
}
function AddressForm({ address, counselorId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: address.name,
        city: address.city,
        province: address.province,
        postal_code: address.postal_code,
        address: address.address,
        maps_url: address.maps_url,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(CounselorSettingController.updateAddress.url(counselorId), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-medium text-foreground">
                Lokasi Praktik
            </p>
            <p className="mt-1 text-[12px] text-muted-foreground">
                Dipakai untuk sesi konsultasi offline dan tampil di profil
                publik.
            </p>
            <form onSubmit={onSubmit}>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                        error={errors?.name}
                        label="Nama Tempat Praktik"
                        value={data.name}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        hint="Contoh: Klinik Delon Fahry"
                    />
                    <Input
                        error={errors?.city}
                        label="Kota"
                        value={data.city}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                city: e.target.value,
                            }))
                        }
                    />
                    <Input
                        error={errors?.province}
                        label="Provinsi"
                        value={data.province}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                province: e.target.value,
                            }))
                        }
                    />
                    <Input
                        error={errors?.postal_code}
                        label="Kode Pos"
                        value={data.postal_code}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                postal_code: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="mt-4">
                    <Input
                        error={errors?.address}
                        label="Alamat Lengkap"
                        value={data.address}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                address: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="mt-4">
                    <Input
                        error={errors?.maps_url}
                        label="Link Google Maps"
                        value={data.maps_url}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                maps_url: e.target.value,
                            }))
                        }
                        hint="Opsional, biar klien gampang cari lokasi"
                    />
                </div>

                <div className="mt-5 flex justify-end">
                    <Button
                        disabled={processing}
                        loading={processing}
                        type="submit"
                        variant="default"
                        mode="filled"
                    >
                        {processing ? 'Menyimpan' : 'Simpan Lokasi'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;

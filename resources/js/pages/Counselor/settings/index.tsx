import { ReactNode, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import ProfileForm from './components/profile-form';
import { CounselorRow } from '@/types/row';
import { usePage } from '@inertiajs/react';
import { AlertCard } from '@/components/ui/alert';

const DUMMY_CATEGORIES = [
    { id: 1, name: 'Kecemasan' },
    { id: 2, name: 'Depresi' },
    { id: 3, name: 'Hubungan' },
    { id: 4, name: 'Trauma & PTSD' },
    { id: 5, name: 'Stres Kerja' },
    { id: 6, name: 'Pengembangan Diri' },
    { id: 7, name: 'Masalah Keluarga' },
    { id: 8, name: 'Remaja & Tumbuh Kembang' },
    { id: 9, name: 'Karier & Akademik' },
    { id: 10, name: 'Kesehatan Mental Umum' },
];

const DUMMY_COUNSELOR = {
    name: 'Billie Eilish, M.Psi.',
    specialization_id: 1,
    experience_years: 8,
    email: 'delon.fahry@konselor.com',
    whatsapp: '082100000001',
    bio: 'Saya adalah psikolog klinis dengan lebih dari 8 tahun pengalaman dalam menangani berbagai gangguan kecemasan dan trauma psikologis.',
    photo_url: 'https://ui-avatars.com/api/?name=Billie+Eilish',
    status: 'active' as 'active' | 'inactive',
    pricing_type: 'paid' as 'paid' | 'free',
    price_per_hour: 150000,
    session_duration_minutes: 60,
};

const DUMMY_ADDRESS = {
    name: 'Klinik Billie Eilish, M.Psi.',
    address: 'Jl. Sudirman No. 45',
    city: 'Jakarta Pusat',
    province: 'DKI Jakarta',
    postal_code: '10220',
    maps_url: '',
};

const DUMMY_SELECTED_CATEGORY_IDS = [1, 4, 10];

// ---------------------------------------------------------------------------
// KONTEN UTAMA
// ---------------------------------------------------------------------------
interface Props {
    counselor: CounselorRow;
}
export default function Index({ counselor }: Props) {
    // --- state tab "Profil" ---
    const { alert } = usePage().props;
    // --- state tab "Lokasi Praktik" ---
    const [address, setAddress] = useState({
        name: DUMMY_ADDRESS.name,
        address: DUMMY_ADDRESS.address,
        city: DUMMY_ADDRESS.city,
        province: DUMMY_ADDRESS.province,
        postal_code: DUMMY_ADDRESS.postal_code,
        maps_url: DUMMY_ADDRESS.maps_url,
    });

    // --- state tab "Layanan & Harga" ---
    const [services, setServices] = useState({
        pricing_type: DUMMY_COUNSELOR.pricing_type,
        price_per_hour: String(DUMMY_COUNSELOR.price_per_hour),
        session_duration_minutes: String(
            DUMMY_COUNSELOR.session_duration_minutes,
        ),
        category_ids: DUMMY_SELECTED_CATEGORY_IDS as number[],
    });

    function toggleCategory(id: number, checked: boolean) {
        setServices((prev) => ({
            ...prev,
            category_ids: checked
                ? [...prev.category_ids, id]
                : prev.category_ids.filter((existingId) => existingId !== id),
        }));
    }

    return (
        <Tabs defaultValue="profil">
            <TabsList>
                <TabsTrigger value="profil">Profil</TabsTrigger>
                <TabsTrigger value="lokasi">Lokasi Praktik</TabsTrigger>
                <TabsTrigger value="layanan">Layanan & Harga</TabsTrigger>
            </TabsList>

            {alert && (
                <div className="my-2">
                    <AlertCard variant={alert.type}>{alert.message}</AlertCard>
                </div>
            )}
            {/* ------------------------------------------------------------ */}
            {/* TAB: PROFIL                                                    */}
            {/* ------------------------------------------------------------ */}
            <TabsContent value="profil">
                <ProfileForm counselor={counselor} />
            </TabsContent>

            {/* ------------------------------------------------------------ */}
            {/* TAB: LOKASI PRAKTIK                                            */}
            {/* ------------------------------------------------------------ */}
            <TabsContent value="lokasi">
                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-foreground">
                        Lokasi Praktik
                    </p>
                    <p className="mt-1 text-[12px] text-muted-foreground">
                        Dipakai untuk sesi konsultasi offline dan tampil di
                        profil publik.
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                            label="Nama Tempat Praktik"
                            value={address.name}
                            onChange={(e) =>
                                setAddress((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            hint="Contoh: Klinik Delon Fahry"
                        />
                        <Input
                            label="Kota"
                            value={address.city}
                            onChange={(e) =>
                                setAddress((prev) => ({
                                    ...prev,
                                    city: e.target.value,
                                }))
                            }
                        />
                        <Input
                            label="Provinsi"
                            value={address.province}
                            onChange={(e) =>
                                setAddress((prev) => ({
                                    ...prev,
                                    province: e.target.value,
                                }))
                            }
                        />
                        <Input
                            label="Kode Pos"
                            value={address.postal_code}
                            onChange={(e) =>
                                setAddress((prev) => ({
                                    ...prev,
                                    postal_code: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="mt-4">
                        <Input
                            label="Alamat Lengkap"
                            value={address.address}
                            onChange={(e) =>
                                setAddress((prev) => ({
                                    ...prev,
                                    address: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="mt-4">
                        <Input
                            label="Link Google Maps"
                            value={address.maps_url}
                            onChange={(e) =>
                                setAddress((prev) => ({
                                    ...prev,
                                    maps_url: e.target.value,
                                }))
                            }
                            hint="Opsional, biar klien gampang cari lokasi"
                        />
                    </div>

                    <div className="mt-5 flex justify-end">
                        <Button type="button" variant="default" mode="filled">
                            Simpan Lokasi
                        </Button>
                    </div>
                </div>
            </TabsContent>

            {/* ------------------------------------------------------------ */}
            {/* TAB: LAYANAN & HARGA                                           */}
            {/* ------------------------------------------------------------ */}
            <TabsContent value="layanan">
                <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm font-medium text-foreground">
                        Layanan & Harga
                    </p>
                    <p className="mt-1 text-[12px] text-muted-foreground">
                        Atur kategori konsultasi yang kamu layani, durasi sesi,
                        dan tarif.
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Select
                            label="Tipe Harga"
                            value={services.pricing_type}
                            onChange={(e) =>
                                setServices((prev) => ({
                                    ...prev,
                                    pricing_type: e.target.value as
                                        | 'paid'
                                        | 'free',
                                }))
                            }
                            options={[
                                { label: 'Gratis', value: 'free' },
                                { label: 'Berbayar', value: 'paid' },
                            ]}
                        />
                        {services.pricing_type === 'paid' && (
                            <Input
                                label="Tarif per Sesi (Rp)"
                                type="number"
                                min={0}
                                step={5000}
                                value={services.price_per_hour}
                                onChange={(e) =>
                                    setServices((prev) => ({
                                        ...prev,
                                        price_per_hour: e.target.value,
                                    }))
                                }
                            />
                        )}
                        <Input
                            label="Durasi Sesi (menit)"
                            type="number"
                            min={15}
                            step={5}
                            value={services.session_duration_minutes}
                            onChange={(e) =>
                                setServices((prev) => ({
                                    ...prev,
                                    session_duration_minutes: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="mt-5">
                        <span className="text-[11px] font-medium text-muted-foreground">
                            Kategori Konsultasi
                        </span>
                        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {DUMMY_CATEGORIES.map((category) => (
                                <Checkbox
                                    key={category.id}
                                    label={category.name}
                                    checked={services.category_ids.includes(
                                        category.id,
                                    )}
                                    onChange={(e) =>
                                        toggleCategory(
                                            category.id,
                                            e.target.checked,
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 flex justify-end">
                        <Button type="button" variant="default" mode="filled">
                            Simpan Layanan
                        </Button>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
}

Index.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="settings" />
);

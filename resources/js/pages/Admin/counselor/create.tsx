import { useForm, usePage } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import AdminCounselorController from '@/actions/App/Http/Controllers/Admin/AdminCounselorController';
import { AvatarUpload } from '@/components/avatar-upload';
import { UserCombobox } from '@/components/interactive/user-combobox';
import { AlertCard } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Select } from '@/components/ui/select';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import {
    buildWeeklySchedule,
    toSchedulePayload,
    METHOD_META,
} from '@/pages/Counselor/schedule/schedule-type';
import type {
    DayScheduleUI,
    ScheduleMethod,
} from '@/pages/Counselor/schedule/schedule-type';

interface Category {
    id: number;
    name: string;
}
interface Specialization {
    id: number;
    name: string;
}

interface PageProps {
    categories: Category[];
    specializations: Specialization[];
}

// Section wrapper — dipakai berulang, bukan Tabs, supaya error di section manapun
// tetap terlihat tanpa harus pindah tab.
function Section({
    title,
    desc,
    children,
}: {
    title: string;
    desc?: string;
    children: ReactNode;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-medium text-foreground">{title}</p>
            {desc && (
                <p className="mt-1 text-[12px] text-muted-foreground">{desc}</p>
            )}
            <div className="mt-4">{children}</div>
        </div>
    );
}

function CreateCounselor() {
    const { categories, specializations } = usePage()
        .props as unknown as PageProps;
    const { alert } = usePage().props;

    const [showScheduleEditor, setShowScheduleEditor] = useState(false);
    // Jadwal kosong (semua hari nonaktif) sebagai starting point kalau admin
    // memilih untuk mengatur jadwal langsung saat create.
    const [schedule, setSchedule] = useState<DayScheduleUI[]>(() =>
        buildWeeklySchedule([]),
    );

    const { data, setData, post, processing, errors, transform } = useForm({
        // Akun
        user_id: null as number | null,

        // Profil
        name: '',
        specialization_id: '',
        experience_years: '',
        email: '',
        whatsapp: '',
        bio: '',
        status: 'active' as 'active' | 'inactive',
        photo: null as File | null,

        // Lokasi praktik (address_id NOT NULL di DB, jadi wajib diisi di create)
        address: {
            name: '',
            city: '',
            province: '',
            postal_code: '',
            address: '',
            maps_url: '',
        },

        // Layanan & harga
        pricing_type: 'free' as 'paid' | 'free',
        price_per_hour: '',
        session_duration_minutes: '',
        category_ids: [] as number[],
    });

    console.log(errors);
    const toggleCategory = (categoryId: number, checked: boolean) => {
        setData(
            'category_ids',
            checked
                ? [...data.category_ids, categoryId]
                : data.category_ids.filter((id) => id !== categoryId),
        );
    };

    const toggleActive = (dow: number) => {
        setSchedule((prev) =>
            prev.map((d) => (d.dow === dow ? { ...d, active: !d.active } : d)),
        );
    };
    const setMethod = (dow: number, method: ScheduleMethod) => {
        setSchedule((prev) =>
            prev.map((d) => (d.dow === dow ? { ...d, method } : d)),
        );
    };
    const setTime = (dow: number, field: 'open' | 'close', value: string) => {
        setSchedule((prev) =>
            prev.map((d) => (d.dow === dow ? { ...d, [field]: value } : d)),
        );
    };

    transform((formData) => ({
        ...formData,
        schedules: showScheduleEditor ? toSchedulePayload(schedule) : [],
    }));

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post(AdminCounselorController.store.url(), {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    return (
        <>
            <div className="mb-4">
                <DashboardTitle
                    title="Tambah Konselor"
                    desc="Isi data konselor baru. Semua data disimpan sekaligus saat Anda menekan Simpan di bagian bawah."
                />
            </div>

            {alert && (
                <div className="mb-4">
                    <AlertCard variant={alert.type}>{alert.message}</AlertCard>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Section
                    title="Akun Pengguna"
                    desc="Hubungkan konselor ini ke akun user yang sudah terdaftar."
                >
                    <UserCombobox
                        value={data.user_id}
                        onChange={(userId, user: UserOption | null) => {
                            setData((prev) => ({
                                ...prev,
                                user_id: userId,
                                // auto-isi nama & email dari user terpilih, tetap bisa diedit manual
                                name: user?.name ?? prev.name,
                                email: user?.email ?? prev.email,
                            }));
                        }}
                        error={errors.user_id}
                    />
                </Section>

                <Section title="Profil Konselor">
                    <div className="mb-4">
                        <AvatarUpload
                            currentAvatarUrl={undefined}
                            onChange={(file) => setData('photo', file)}
                            error={errors.photo}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                            label="Nama Lengkap & Gelar"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                        />
                        <Select
                            label="Spesialisasi"
                            value={data.specialization_id}
                            onChange={(e) =>
                                setData('specialization_id', e.target.value)
                            }
                            error={errors.specialization_id}
                            options={[
                                { label: 'Pilih spesialisasi', value: '' },
                                ...specializations.map((s) => ({
                                    label: s.name,
                                    value: String(s.id),
                                })),
                            ]}
                        />
                        <Input
                            label="Lama Pengalaman (tahun)"
                            type="number"
                            min={0}
                            max={60}
                            value={data.experience_years}
                            onChange={(e) =>
                                setData('experience_years', e.target.value)
                            }
                            error={errors.experience_years}
                        />
                        <Select
                            label="Status Profil"
                            value={data.status}
                            onChange={(e) =>
                                setData(
                                    'status',
                                    e.target.value as 'active' | 'inactive',
                                )
                            }
                            error={errors.status}
                            options={[
                                {
                                    label: 'Aktif — tampil di pencarian',
                                    value: 'active',
                                },
                                {
                                    label: 'Nonaktif — disembunyikan sementara',
                                    value: 'inactive',
                                },
                            ]}
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                        />
                        <Input
                            label="No. WhatsApp"
                            value={data.whatsapp}
                            onChange={(e) =>
                                setData('whatsapp', e.target.value)
                            }
                            error={errors.whatsapp}
                            hint="Dipakai untuk konfirmasi jadwal konsultasi"
                        />
                    </div>
                    <div className="mt-4">
                        <RichTextEditor
                            label="Tentang Saya (Bio)"
                            value={data.bio}
                            onChange={(html) => setData('bio', html)}
                            error={errors.bio}
                        />
                    </div>
                </Section>

                <Section
                    title="Lokasi Praktik"
                    desc="Dipakai untuk sesi konsultasi offline dan tampil di profil publik."
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                            label="Nama Tempat Praktik"
                            value={data.address.name}
                            onChange={(e) =>
                                setData('address', {
                                    ...data.address,
                                    name: e.target.value,
                                })
                            }
                            error={errors['address.name' as never]}
                            hint="Contoh: Klinik Delon Fahry"
                        />
                        <Input
                            label="Kota"
                            value={data.address.city}
                            onChange={(e) =>
                                setData('address', {
                                    ...data.address,
                                    city: e.target.value,
                                })
                            }
                            error={errors['address.city' as never]}
                        />
                        <Input
                            label="Provinsi"
                            value={data.address.province}
                            onChange={(e) =>
                                setData('address', {
                                    ...data.address,
                                    province: e.target.value,
                                })
                            }
                            error={errors['address.province' as never]}
                        />
                        <Input
                            label="Kode Pos"
                            value={data.address.postal_code}
                            onChange={(e) =>
                                setData('address', {
                                    ...data.address,
                                    postal_code: e.target.value,
                                })
                            }
                            error={errors['address.postal_code' as never]}
                        />
                    </div>
                    <div className="mt-4">
                        <Input
                            label="Alamat Lengkap"
                            value={data.address.address}
                            onChange={(e) =>
                                setData('address', {
                                    ...data.address,
                                    address: e.target.value,
                                })
                            }
                            error={errors['address.address' as never]}
                        />
                    </div>
                    <div className="mt-4">
                        <Input
                            label="Link Google Maps"
                            value={data.address.maps_url}
                            onChange={(e) =>
                                setData('address', {
                                    ...data.address,
                                    maps_url: e.target.value,
                                })
                            }
                            error={errors['address.maps_url' as never]}
                            hint="Opsional, biar klien gampang cari lokasi"
                        />
                    </div>
                </Section>

                <Section title="Layanan & Harga">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Select
                            error={errors.pricing_type}
                            label="Tipe Harga"
                            value={data.pricing_type}
                            onChange={(e) =>
                                setData(
                                    'pricing_type',
                                    e.target.value as 'paid' | 'free',
                                )
                            }
                            options={[
                                { label: 'Gratis', value: 'free' },
                                { label: 'Berbayar', value: 'paid' },
                            ]}
                        />
                        {data.pricing_type === 'paid' && (
                            <Input
                                label="Tarif per Sesi (Rp)"
                                type="number"
                                min={0}
                                step={5000}
                                error={errors.price_per_hour}
                                value={data.price_per_hour}
                                onChange={(e) =>
                                    setData('price_per_hour', e.target.value)
                                }
                            />
                        )}
                        <Input
                            label="Durasi Sesi (menit)"
                            type="number"
                            min={15}
                            step={5}
                            error={errors.session_duration_minutes}
                            value={data.session_duration_minutes}
                            onChange={(e) =>
                                setData(
                                    'session_duration_minutes',
                                    e.target.value,
                                )
                            }
                        />
                    </div>

                    <div className="mt-5">
                        <span className="text-[11px] font-medium text-muted-foreground">
                            Kategori Konsultasi
                        </span>
                        {errors.category_ids && (
                            <p className="mt-1 text-[11px] text-red-500">
                                {errors.category_ids}
                            </p>
                        )}
                        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {categories.map((category) => (
                                <Checkbox
                                    key={category.id}
                                    label={category.name}
                                    checked={data.category_ids.includes(
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
                </Section>

                <Section
                    title="Jadwal Konsultasi"
                    desc="Opsional. Kalau tidak diisi sekarang, Anda tetap bisa mengaturnya nanti lewat halaman Edit konselor ini."
                >
                    <Checkbox
                        label="Atur jadwal sekarang"
                        checked={showScheduleEditor}
                        onChange={(e) =>
                            setShowScheduleEditor(e.target.checked)
                        }
                    />

                    {showScheduleEditor && (
                        <div className="mt-4 divide-y divide-border/70">
                            {schedule.map((d) => (
                                <div
                                    key={d.dow}
                                    className="flex flex-wrap items-center gap-3 py-3.5"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleActive(d.dow)}
                                        aria-pressed={d.active}
                                        className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition ${
                                            d.active
                                                ? 'justify-end bg-primary'
                                                : 'justify-start bg-secondary'
                                        }`}
                                    >
                                        <span className="h-4 w-4 rounded-full bg-white shadow" />
                                    </button>

                                    <span
                                        className={`w-16 shrink-0 text-sm font-medium ${
                                            d.active
                                                ? 'text-foreground'
                                                : 'text-muted-foreground'
                                        }`}
                                    >
                                        {d.label}
                                    </span>

                                    {d.active ? (
                                        <>
                                            <div className="flex items-center gap-1.5 text-sm">
                                                <input
                                                    type="time"
                                                    value={d.open}
                                                    onChange={(e) =>
                                                        setTime(
                                                            d.dow,
                                                            'open',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground"
                                                />
                                                <span className="text-muted-foreground">
                                                    –
                                                </span>
                                                <input
                                                    type="time"
                                                    value={d.close}
                                                    onChange={(e) =>
                                                        setTime(
                                                            d.dow,
                                                            'close',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground"
                                                />
                                            </div>

                                            <div className="ml-auto flex flex-wrap gap-1.5">
                                                {Object.entries(
                                                    METHOD_META,
                                                ).map(([key, meta]) => (
                                                    <button
                                                        key={key}
                                                        type="button"
                                                        onClick={() =>
                                                            setMethod(
                                                                d.dow,
                                                                key as ScheduleMethod,
                                                            )
                                                        }
                                                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                                                            d.method === key
                                                                ? meta.pillActive
                                                                : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                                                        }`}
                                                    >
                                                        {meta.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <span className="ml-auto text-xs text-muted-foreground">
                                            Libur
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                <div className="flex justify-end pb-8">
                    <Button
                        type="submit"
                        variant="default"
                        mode="filled"
                        disabled={processing}
                        loading={processing}
                    >
                        {processing ? 'Menyimpan' : 'Simpan Konselor'}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default CreateCounselor;
CreateCounselor.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-counselors" />
);

import { usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import CounselorSettingController from '@/actions/App/Http/Controllers/Counselor/CounselorSettingController';
import { AvatarUpload } from '@/components/avatar-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { Select } from '@/components/ui/select';
import type { CounselorRow } from '@/types/row';

interface Specialization {
    id: number;
    name: string;
}

interface Props {
    counselor: CounselorRow;
}

interface ProfileFormData {
    name: string;
    specialization_id: string;
    experience_years: string;
    email: string;
    whatsapp: string;
    bio: string;
    status: 'active' | 'inactive';
    photo: File | null;
}

function ProfileForm({ counselor }: Props) {
    const { specializations } = usePage().props as unknown as {
        specializations: Specialization[];
    };

    const { data, setData, post, processing, errors } =
        useForm<ProfileFormData>({
            name: counselor.name,
            specialization_id: String(counselor.specialization_id),
            experience_years: String(counselor.experience_years),
            email: counselor.email,
            whatsapp: counselor.whatsapp,
            bio: counselor.bio,
            status: counselor.status,
            photo: null,
        });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        // forceFormData wajib ada karena ada file (photo) di dalam payload
        post(CounselorSettingController.updateProfile.url(counselor.id), {
            forceFormData: true,
            preserveScroll: true,
            only : ["toast","counselor"]
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-5"
        >
            <p className="text-sm font-medium text-foreground">
                Profil Konselor
            </p>
            <p className="mt-1 text-[12px] text-muted-foreground">
                Informasi ini tampil di halaman profil publikmu.
            </p>

            <div className="mt-4">
                <AvatarUpload
                    currentAvatarUrl={
                        data.photo ? undefined : counselor.photo_path
                    }
                    onChange={(file) => setData('photo', file)}
                    error={errors.photo}
                />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    onChange={(e) => setData('whatsapp', e.target.value)}
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

            <div className="mt-5 flex items-center justify-end gap-3">
                <Button
                    type="submit"
                    variant="default"
                    mode="filled"
                    disabled={processing}
                    loading={processing}
                >
                    {processing ? 'Menyimpan' : 'Simpan Profil'}
                </Button>
            </div>
        </form>
    );
}

export default ProfileForm;

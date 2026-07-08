import { useForm } from '@inertiajs/react';
import ProfileSettingController from '@/actions/App/Http/Controllers/ProfileSettingController';
import { FormEvent } from 'react';
import { AvatarUpload } from '@/components/avatar-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface AccountSettingsFormProps {
    user: {
        name: string;
        email: string;
        whatsapp?: string | null;
        age?: number | string | null;
        gender?: string | null;
        avatar_url?: string | null;
    };
}

interface AccountSettingsFormData {
    name: string;
    email: string;
    whatsapp: string;
    age: string;
    gender: string;
    avatar: File | null;
}

export function AccountSettingsForm({ user }: AccountSettingsFormProps) {
    const { data, setData, post, processing, errors } =
        useForm<AccountSettingsFormData>({
            name: user.name ?? '',
            email: user.email ?? '',
            whatsapp: user.whatsapp ?? '',
            age: user.age ? String(user.age) : '',
            gender: user.gender ?? '',
            avatar: null,
        });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        // forceFormData wajib ada karena ada file (avatar) di dalam payload
        post(ProfileSettingController.update.url(), {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-5"
        >
            <p className="text-sm font-medium text-foreground">
                Informasi Akun
            </p>

            <div className="mt-4">
                <AvatarUpload
                    currentAvatarUrl={user.avatar_url}
                    onChange={(file) => setData('avatar', file)}
                    error={errors.avatar}
                />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                    label="Nama Lengkap"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />
                <Input
                    label="No. WhatsApp"
                    name="whatsapp"
                    value={data.whatsapp}
                    onChange={(e) => setData('whatsapp', e.target.value)}
                    error={errors.whatsapp}
                    hint="Contoh: 08123456789"
                />
                <Input
                    label="Usia"
                    name="age"
                    type="number"
                    min={0}
                    max={150}
                    value={data.age}
                    onChange={(e) => setData('age', e.target.value)}
                    error={errors.age}
                />
                <Select
                    label="Jenis Kelamin"
                    name="gender"
                    value={data.gender}
                    onChange={(e) => setData('gender', e.target.value)}
                    error={errors.gender}
                    options={[
                        { label: 'Pilih jenis kelamin', value: '' },
                        { label: 'Laki-laki', value: 'L' },
                        { label: 'Perempuan', value: 'P' },
                    ]}
                />
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">

                <Button
                    type="submit"
                    variant="green"
                    mode="outlined"
                    disabled={processing}
                >
                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
            </div>
        </form>
    );
}

import { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import GoogleIcon from '@/components/icons/google-icon';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Input } from '@/components/ui/input';
import { AlertCard } from '@/components/ui/alert';
import RegisterController from '@/actions/App/Http/Controllers/Auth/RegisterController';

const genderOptions = [
    { value: 'L', label: 'Laki-laki' },
    { value: 'P', label: 'Perempuan' },
];

function RegisterForm() {
    const { alert } = usePage().props;
    const [googleNotice, setGoogleNotice] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        whatsapp: '',
        age: '20',
        gender: '',
        password: '',
        password_confirmation: '',
    });

    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(RegisterController.store().url);
    };

    const onGoogleClick = () => {
        setGoogleNotice(true);
    };

    return (
        <form method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
            {alert && (
                <AlertCard variant={alert.type}>{alert.message}</AlertCard>
            )}

            {googleNotice && (
                <AlertCard variant="warning">
                    Mohon maaf, Login atau daftar via Google sedang tidak
                    tersedia.
                </AlertCard>
            )}

            <Input
                label="Nama Lengkap"
                name="name"
                placeholder="Nama kamu"
                error={errors?.name}
                value={data.name}
                onChange={onChange}
            />

            <Input
                label="Email"
                type="email"
                name="email"
                placeholder="nama@email.com"
                error={errors?.email}
                value={data.email}
                onChange={onChange}
            />

            <Input
                label="No. WhatsApp (opsional)"
                name="whatsapp"
                placeholder="08xxxxxxxxxx"
                error={errors?.whatsapp}
                value={data.whatsapp}
                onChange={onChange}
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Usia"
                    type="number"
                    name="age"
                    min={10}
                    max={100}
                    error={errors?.age}
                    value={data.age}
                    onChange={onChange}
                />

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Jenis Kelamin
                    </label>
                    <div className="flex gap-2">
                        {genderOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setData('gender', option.value)}
                                className={`flex-1 rounded-lg border px-3 py-2.5 text-[12px] transition-colors ${
                                    data.gender === option.value
                                        ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                                        : 'border-zinc-200 text-zinc-500 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-700'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                    {errors?.gender && (
                        <p className="text-[11px] text-red-500">
                            {errors.gender}
                        </p>
                    )}
                </div>
            </div>

            <Input
                label="Kata Sandi"
                type="password"
                name="password"
                placeholder="Minimal 8 karakter"
                error={errors?.password}
                value={data.password}
                onChange={onChange}
            />

            <Input
                label="Konfirmasi Kata Sandi"
                type="password"
                name="password_confirmation"
                placeholder="Ulangi kata sandi"
                error={errors?.password_confirmation}
                value={data.password_confirmation}
                onChange={onChange}
            />

            <Button
                type="submit"
                disabled={processing}
                className="w-full cursor-pointer justify-center py-2.5 text-[13px]"
            >
                Daftar
            </Button>

            <Divider label="atau" />

            <Button
                type="button"
                mode="outlined"
                onClick={onGoogleClick}
                className="w-full cursor-pointer justify-center gap-2.5 px-4 py-2.5 text-[12px]"
            >
                <GoogleIcon />
                Daftar dengan Google
            </Button>

            <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-600">
                Sudah punya akun?{' '}
                <Link
                    href="/login"
                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                    Masuk
                </Link>
            </p>
        </form>
    );
}

export default RegisterForm;

import { Link, useForm, usePage } from '@inertiajs/react';
import LoginController from '@/actions/App/Http/Controllers/Auth/LoginController';
import GoogleIcon from '@/components/icons/google-icon';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Input } from '@/components/ui/input';
import { AlertCard } from '@/components/ui/alert';

function LoginForm() {
    const { alert } = usePage().props;

    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(LoginController.store().url);
    };

    return (
        <form method="post" onSubmit={onSubmit} className="flex flex-col gap-5">
            {alert && (
                <AlertCard variant={alert.type}>{alert.message}</AlertCard>
            )}

            <Input
                label="Email"
                type="email"
                name="email"
                placeholder="nama@email.com"
                error={errors?.email}
                value={data.email}
                onChange={onChange}
            />

            <div className="flex flex-col gap-1.5">
                <Input
                    name="password"
                    label="Kata Sandi"
                    type="password"
                    error={errors?.password}
                    value={data.password}
                    onChange={onChange}
                    placeholder="Masukkan kata sandi"
                />
                <div className="flex justify-end">
                    <a
                        href="#"
                        className="text-[11px] text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
                    >
                        Lupa kata sandi?
                    </a>
                </div>
            </div>

            <Button
                type="submit"
                disabled={processing}
                className="w-full cursor-pointer justify-center py-2.5 text-[13px]"
            >
                Masuk
            </Button>

            <Divider label="atau" />

            <Button
                loading={processing}
                mode="outlined"
                className="w-full cursor-pointer justify-center gap-2.5 px-4 py-2.5 text-[12px]"
            >
                <GoogleIcon />
                Lanjutkan dengan Google
            </Button>

            <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-600">
                Belum punya akun?{' '}
                <Link
                    href="/register"
                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                    Daftar gratis
                </Link>
            </p>
        </form>
    );
}

export default LoginForm;

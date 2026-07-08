import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from '@inertiajs/react';
import React from 'react';
import AdminAuthController from '@/actions/App/Http/Controllers/Admin/AdminAuthController';


function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       post(AdminAuthController.AdminLoginStore.url());
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6">
                <p className="text-lg font-medium text-foreground">
                    Login Admin
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">
                    Masuk menggunakan akun admin untuk mengakses dashboard.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        autoFocus
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                    />
                    <Checkbox
                        label="Ingat saya"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />

                    <Button
                        type="submit"
                        variant="default"
                        mode="filled"
                        disabled={processing}
                        className="w-full"
                    >
                        Masuk
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;

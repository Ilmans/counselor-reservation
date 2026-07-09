import type { ReactNode } from 'react';
import Wrapper from '@/layouts/wrapper';
import AuthCard from './components/auth-card';
import RegisterForm from './form/register-form';
import Tab from './components/tab';
import PageHead from '@/components/page-head';

function Register() {
    return (
        <>
            <PageHead title="Daftar" />
            <main className="relative flex min-h-[calc(100dvh-112px)] items-center justify-center overflow-hidden bg-zinc-50/60 px-6 py-16 dark:bg-zinc-950/40">
                <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-15"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                <AuthCard>
                    <Tab active="register" />
                    <div className="mt-6 mb-6">
                        <h1 className="font-serif text-2xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                            Buat akun baru.
                        </h1>
                        <p className="mt-1.5 text-xs font-light text-zinc-500 dark:text-zinc-500">
                            Daftar untuk mulai sesi konseling pertamamu.
                        </p>
                    </div>
                    <RegisterForm />
                </AuthCard>
            </main>
        </>
    );
}

export default Register;
Register.layout = (page: ReactNode) => <Wrapper main={page} />;

import type { ReactNode } from 'react';
import Wrapper from '@/layouts/wrapper';

import LoginForm from './form/login-form';
import AuthCard from './components/auth-card';
import Tab from './components/tab';
import PageHead from '@/components/page-head';

function Login() {
    return (
        <>
            <PageHead title="Masuk" />
            <main className="relative flex min-h-[calc(100dvh-112px)] items-center justify-center overflow-hidden bg-zinc-50/60 px-6 py-16 dark:bg-zinc-950/40">
                {/* dot pattern tipis biar background nggak polos tapi tetap kalem */}
                <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-15"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                <AuthCard>
                    <Tab active="login" />
                    <div className="mt-6 mb-6">
                        <h1 className="font-serif text-2xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                            Selamat datang kembali.
                        </h1>
                        <p className="mt-1.5 text-xs font-light text-zinc-500 dark:text-zinc-500">
                            Masuk untuk melanjutkan sesi konselingmu.
                        </p>
                    </div>
                    <LoginForm />
                </AuthCard>
            </main>
        </>
    );
}

export default Login;
Login.layout = (page: ReactNode) => <Wrapper main={page} />;

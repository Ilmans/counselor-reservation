import type { ReactNode } from 'react';
import Wrapper from '@/layouts/wrapper';
import SideInfo from './components/side-info';
import Tab from './components/Tab';

import LoginForm from './form/login-form';




function Login() {
    return (
        <main className="flex min-h-[calc(100dvh-112px)]  items-center justify-center gap-20 px-6 py-16">
            <SideInfo />
            <div className="w-full max-w-[400px]">
                <Tab active="login" />
                {/* Heading */}
                <div className="mb-6">
                    <h1 className="font-serif text-2xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                        Selamat datang kembali.
                    </h1>
                    <p className="mt-1.5 text-xs font-light text-zinc-500 dark:text-zinc-500">
                        Masuk untuk melanjutkan sesi konselingmu.
                    </p>
                </div>

                <LoginForm />
            </div>
        </main>
    );
}

export default Login;
Login.layout = (page: ReactNode) => <Wrapper main={page} />;

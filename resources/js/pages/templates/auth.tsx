import { AlertCircle } from 'lucide-react';
import React, { useState } from 'react';

// ─────────────────────────────────────────
// components/ui/Input.tsx
// ─────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Input = ({
    label,
    error,
    hint,
    className = '',
    ...props
}: InputProps) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-500">
                    {label}
                </label>
            )}
            <input
                className={[
                    'w-full rounded-lg border bg-white px-3 py-2 text-[13px] text-zinc-900 placeholder-zinc-400 transition-colors outline-none',
                    'focus:border-zinc-400',
                    'dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600',
                    error
                        ? 'border-red-400 dark:border-red-800'
                        : 'border-zinc-200 dark:border-zinc-800 dark:focus:border-zinc-600',
                    className,
                ].join(' ')}
                {...props}
            />
            {error && (
                <span className="flex items-center gap-1 text-[11px] text-red-500 dark:text-red-400">
                    <AlertCircle className="size-3 font-medium" />
                    {error}
                </span>
            )}
            {hint && !error && (
                <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                    {hint}
                </span>
            )}
        </div>
    );
};

// ─────────────────────────────────────────
// components/ui/Alert.tsx
// ─────────────────────────────────────────
type AlertVariant = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
    variant?: AlertVariant;
    children: React.ReactNode;
}

const alertStyles: Record<AlertVariant, string> = {
    error: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900/40 dark:text-red-400',
    success:
        'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900/40 dark:text-green-400',
    warning:
        'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900/40 dark:text-amber-400',
    info: 'bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-zinc-400',
};

const AlertIcon = ({ variant }: { variant: AlertVariant }) => {
    if (variant === 'success') {
        return (
            <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="mt-px flex-shrink-0"
            >
                <circle
                    cx="7"
                    cy="7"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                />
                <path
                    d="M4.5 7l2 2 3-3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="mt-px flex-shrink-0"
        >
            <circle
                cx="7"
                cy="7"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.2"
            />
            <path
                d="M7 4.5v3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
            <circle cx="7" cy="9.5" r="0.6" fill="currentColor" />
        </svg>
    );
};

const Alert = ({ variant = 'info', children }: AlertProps) => {
    return (
        <div
            className={[
                'flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-[12px] leading-relaxed',
                alertStyles[variant],
            ].join(' ')}
        >
            <AlertIcon variant={variant} />
            <span>{children}</span>
        </div>
    );
};

// ─────────────────────────────────────────
// components/ui/Divider.tsx
// ─────────────────────────────────────────
const Divider = ({ label }: { label?: string }) => (
    <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
        {label && (
            <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                {label}
            </span>
        )}
        <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
    </div>
);

// ─────────────────────────────────────────
// Header (sudah ada, disertakan untuk kelengkapan layout)
// ─────────────────────────────────────────
const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-background backdrop-blur-md dark:border-zinc-800/60">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <a href="#" className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            <svg
                                width={14}
                                height={14}
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <circle
                                    cx={7}
                                    cy={7}
                                    r="5.5"
                                    stroke="#a1a1aa"
                                    strokeWidth="1.2"
                                />
                                <path
                                    d="M7 4.5v3l1.5 1.5"
                                    stroke="#e4e4e7"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <span className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                            Tenang
                        </span>
                    </a>
                    <nav className="hidden items-center gap-6 md:flex">
                        <a
                            href="#"
                            className="text-[13px] text-zinc-800 transition-colors hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-white"
                        >
                            Konselor
                        </a>
                        <a
                            href="#"
                            className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200"
                        >
                            Reservasi Saya
                        </a>
                        <a
                            href="#"
                            className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200"
                        >
                            Tentang
                        </a>
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <button className="rounded-lg border border-zinc-300 px-3 py-1.5 text-[12px] text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200">
                        Masuk
                    </button>
                    <button className="rounded-lg bg-zinc-900 px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                        Daftar
                    </button>
                </div>
            </div>
        </header>
    );
};

// ─────────────────────────────────────────
// Footer (sudah ada, disertakan untuk kelengkapan layout)
// ─────────────────────────────────────────
const Footer = () => {
    return (
        <footer className="border-t border-zinc-800/60 bg-background dark:bg-zinc-950">
            <div className="mx-auto max-w-5xl px-6 py-10">
                <div className="flex flex-col justify-between gap-8 md:flex-row">
                    <div>
                        <div className="mb-3 flex items-center gap-2.5">
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-zinc-900">
                                <svg
                                    width={11}
                                    height={11}
                                    viewBox="0 0 14 14"
                                    fill="none"
                                >
                                    <circle
                                        cx={7}
                                        cy={7}
                                        r="5.5"
                                        stroke="#71717a"
                                        strokeWidth="1.2"
                                    />
                                    <path
                                        d="M7 4.5v3l1.5 1.5"
                                        stroke="#a1a1aa"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-zinc-400">
                                Tenang
                            </span>
                        </div>
                        <p className="max-w-xs text-xs leading-relaxed text-zinc-600">
                            Platform reservasi konseling yang menghubungkan kamu
                            dengan konselor profesional tersertifikasi.
                        </p>
                    </div>
                    <div className="flex gap-12 md:gap-16">
                        <div>
                            <p className="mb-3 text-xs font-medium tracking-[0.08em] text-zinc-500 uppercase">
                                Platform
                            </p>
                            <div className="flex flex-col gap-2">
                                <a
                                    href="#"
                                    className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                >
                                    Cari Konselor
                                </a>
                                <a
                                    href="#"
                                    className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                >
                                    Cara Kerja
                                </a>
                                <a
                                    href="#"
                                    className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                >
                                    Harga
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className="mb-3 text-xs font-medium tracking-[0.08em] text-zinc-500 uppercase">
                                Bantuan
                            </p>
                            <div className="flex flex-col gap-2">
                                <a
                                    href="#"
                                    className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                >
                                    FAQ
                                </a>
                                <a
                                    href="#"
                                    className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                >
                                    Kontak
                                </a>
                                <a
                                    href="#"
                                    className="text-[13px] text-zinc-600 transition-colors hover:text-zinc-400"
                                >
                                    Privasi
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 mb-6 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />
                <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="text-xs text-zinc-700">
                        © 2025 Tenang. Semua hak dilindungi.
                    </p>
                    <p className="text-xs text-zinc-700">
                        Dibuat dengan niat baik · Indonesia
                    </p>
                </div>
            </div>
        </footer>
    );
};

// ─────────────────────────────────────────
// Google Icon (untuk tombol OAuth)
// ─────────────────────────────────────────
const GoogleIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" className="flex-shrink-0">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);

// ─────────────────────────────────────────
// LoginForm
// ─────────────────────────────────────────
const LoginForm = ({
    onSwitchToRegister,
}: {
    onSwitchToRegister: () => void;
}) => {
    return (
        <div className="flex flex-col gap-5">
            {/* Contoh alert error — tampilkan kondisional */}
            <Alert variant="error">
                Email atau kata sandi tidak sesuai. Silakan coba lagi.
            </Alert>

            {/* Contoh alert success — tampilkan kondisional */}
            {/* <Alert variant="success">Berhasil masuk! Mengarahkan kamu...</Alert> */}

            <Input
                label="Email"
                type="email"
                placeholder="nama@email.com"
                error="Format email tidak valid."
            />

            <div className="flex flex-col gap-1.5">
                <Input
                    label="Kata Sandi"
                    type="password"
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

            <button className="w-full rounded-lg bg-zinc-900 py-2.5 text-[13px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                Masuk
            </button>

            <Divider label="atau" />

            <button className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-200 px-4 py-2.5 text-[12px] text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-800 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200">
                <GoogleIcon />
                Lanjutkan dengan Google
            </button>

            <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-600">
                Belum punya akun?{' '}
                <button
                    onClick={onSwitchToRegister}
                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                    Daftar gratis
                </button>
            </p>
        </div>
    );
};

// ─────────────────────────────────────────
// RegisterForm
// ─────────────────────────────────────────
const RegisterForm = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
    return (
        <div className="flex flex-col gap-5">
            {/* Contoh alert — tampilkan kondisional */}
            {/* <Alert variant="error">Email sudah terdaftar. Coba masuk atau gunakan email lain.</Alert> */}

            <div className="grid grid-cols-2 gap-3">
                <Input label="Nama Depan" type="text" placeholder="Budi" />
                <Input
                    label="Nama Belakang"
                    type="text"
                    placeholder="Santoso"
                />
            </div>

            <Input
                label="Email"
                type="email"
                placeholder="nama@email.com"
                hint="Kami tidak akan mengirim spam."
            />

            <Input
                label="Nomor HP"
                type="tel"
                placeholder="+62 812 3456 7890"
                hint="Digunakan untuk konfirmasi reservasi."
            />

            <Input
                label="Kata Sandi"
                type="password"
                placeholder="Minimal 8 karakter"
                hint="Gunakan kombinasi huruf, angka, dan simbol."
            />

            <Input
                label="Konfirmasi Kata Sandi"
                type="password"
                placeholder="Ulangi kata sandi"
                error="Kata sandi tidak cocok."
            />

            {/* Syarat & Ketentuan */}
            <label className="flex cursor-pointer items-start gap-2.5">
                <input
                    type="checkbox"
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded border-zinc-300 accent-zinc-900 dark:accent-zinc-100"
                />
                <span className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                    Saya menyetujui{' '}
                    <a
                        href="#"
                        className="text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    >
                        Syarat & Ketentuan
                    </a>{' '}
                    serta{' '}
                    <a
                        href="#"
                        className="text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                    >
                        Kebijakan Privasi
                    </a>{' '}
                    Tenang.
                </span>
            </label>

            <button className="w-full rounded-lg bg-zinc-900 py-2.5 text-[13px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                Buat Akun
            </button>

            <Divider label="atau" />

            <button className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-200 px-4 py-2.5 text-[12px] text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-800 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200">
                <GoogleIcon />
                Daftar dengan Google
            </button>

            <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-600">
                Sudah punya akun?{' '}
                <button
                    onClick={onSwitchToLogin}
                    className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                    Masuk di sini
                </button>
            </p>
        </div>
    );
};

// ─────────────────────────────────────────
// SideInfo — panel kiri dekoratif
// ─────────────────────────────────────────
const SideInfo = () => (
    <div className="hidden max-w-[240px] lg:flex lg:flex-col">
        <span className="mb-4 text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase">
            Platform Konseling
        </span>
        <h2 className="mb-3 font-serif text-3xl leading-tight font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
            Mulai perjalanan{' '}
            <em className="text-zinc-400 dark:text-zinc-500">pemulihanmu.</em>
        </h2>
        <p className="text-xs leading-relaxed font-light text-zinc-500 dark:text-zinc-500">
            Konselor tersertifikasi siap menemanimu. Reservasi mudah, aman, dan
            terpercaya.
        </p>

        <div className="mt-8 flex flex-col gap-3.5">
            {[
                'Konselor berpengalaman & tersertifikasi',
                'Sesi online & tatap muka tersedia',
                'Privasi terjaga sepenuhnya',
                'Jadwal fleksibel sesuai kebutuhanmu',
            ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                    <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <p className="text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                        {item}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

// ─────────────────────────────────────────
// Tab switcher
// ─────────────────────────────────────────
type Tab = 'login' | 'register';

const TabGroup = ({
    active,
    onChange,
}: {
    active: Tab;
    onChange: (tab: Tab) => void;
}) => (
    <div className="mb-8 flex border-b border-zinc-200 dark:border-zinc-800">
        {(['login', 'register'] as Tab[]).map((tab) => (
            <button
                key={tab}
                onClick={() => onChange(tab)}
                className={[
                    'mr-6 border-b-2 pb-3 text-[13px] tracking-[-0.01em] transition-colors',
                    active === tab
                        ? 'border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100'
                        : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400',
                ].join(' ')}
            >
                {tab === 'login' ? 'Masuk' : 'Daftar'}
            </button>
        ))}
    </div>
);

// ─────────────────────────────────────────
// AuthPage — halaman utama
// ─────────────────────────────────────────
const AuthPage = () => {
    const [tab, setTab] = useState<Tab>('login');

    return (
        <>
            <Header />

            {/* ── Main content antara header & footer ── */}
            <main className="mx-auto flex min-h-[calc(100dvh-112px)] max-w-5xl items-center justify-center gap-20 px-6 py-16">
                {/* Panel kiri */}
                <SideInfo />

                {/* Panel form */}
                <div className="w-full max-w-[360px]">
                    {/* Tab switcher */}
                    <TabGroup active={tab} onChange={setTab} />

                    {/* Heading */}
                    <div className="mb-6">
                        {tab === 'login' ? (
                            <>
                                <h1 className="font-serif text-2xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                                    Selamat datang kembali.
                                </h1>
                                <p className="mt-1.5 text-xs font-light text-zinc-500 dark:text-zinc-500">
                                    Masuk untuk melanjutkan sesi konselingmu.
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className="font-serif text-2xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                                    Buat akun baru.
                                </h1>
                                <p className="mt-1.5 text-xs font-light text-zinc-500 dark:text-zinc-500">
                                    Bergabung dan temukan konselor yang tepat
                                    untukmu.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Form */}
                    {tab === 'login' ? (
                        <LoginForm
                            onSwitchToRegister={() => setTab('register')}
                        />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setTab('login')} />
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default AuthPage;

// ─────────────────────────────────────────
// Ekspor komponen UI secara individual
// (Pindahkan ke components/ui/ sesuai kebutuhan)
// ─────────────────────────────────────────
export { Input, Alert, Divider };

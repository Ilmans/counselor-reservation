function InputField({
    label,
    type = 'text',
    placeholder,
    id,
}: {
    label: string;
    type?: string;
    placeholder?: string;
    id: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={id}
                className="text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-500"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className="rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-[13px] text-zinc-800 transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700/60 dark:bg-transparent dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
            />
        </div>
    );
}

function Divider({ label }: { label?: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            {label && (
                <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                    {label}
                </span>
            )}
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>
    );
}

// ── Login Form ────────────────────────────────

function LoginForm() {
    return (
        <div className="flex flex-col gap-5">
            <InputField
                id="email-login"
                label="Email"
                type="email"
                placeholder="nama@email.com"
            />
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="password-login"
                        className="text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-500"
                    >
                        Password
                    </label>
                    <a
                        href="#"
                        className="text-[12px] text-zinc-400 underline-offset-2 hover:underline dark:text-zinc-500"
                    >
                        Lupa password?
                    </a>
                </div>
                <input
                    id="password-login"
                    type="password"
                    placeholder="••••••••"
                    className="rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-[13px] text-zinc-800 transition-colors placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700/60 dark:bg-transparent dark:text-zinc-200 dark:placeholder:text-zinc-600 dark:focus:border-zinc-500"
                />
            </div>

            <button className="mt-1 w-full rounded-lg bg-zinc-900 py-2.5 text-[13px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                Masuk
            </button>

            <Divider label="atau" />

            {/* Google OAuth */}
            <button className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-200 bg-white py-2.5 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700/60 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-800/50">
                <svg width="15" height="15" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                Lanjutkan dengan Google
            </button>
        </div>
    );
}

// ── Register Form ─────────────────────────────

function RegisterForm() {
    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
                <InputField
                    id="firstname"
                    label="Nama Depan"
                    placeholder="Budi"
                />
                <InputField
                    id="lastname"
                    label="Nama Belakang"
                    placeholder="Santoso"
                />
            </div>
            <InputField
                id="email-register"
                label="Email"
                type="email"
                placeholder="nama@email.com"
            />
            <InputField
                id="password-register"
                label="Password"
                type="password"
                placeholder="Min. 8 karakter"
            />
            <InputField
                id="password-confirm"
                label="Konfirmasi Password"
                type="password"
                placeholder="Ulangi password"
            />

            {/* Role selector */}
            <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-500">
                    Daftar sebagai
                </span>
                <div className="grid grid-cols-2 gap-2">
                    <button className="flex flex-col items-start gap-0.5 rounded-lg border border-zinc-900 bg-zinc-900 px-3.5 py-3 text-left transition-colors dark:border-zinc-200 dark:bg-zinc-200">
                        <span className="text-[12px] font-medium text-zinc-100 dark:text-zinc-900">
                            Klien
                        </span>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                            Cari & reservasi konselor
                        </span>
                    </button>
                    <button className="flex flex-col items-start gap-0.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-3 text-left transition-colors hover:border-zinc-400 dark:border-zinc-700/60 dark:bg-transparent dark:hover:border-zinc-500">
                        <span className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200">
                            Konselor
                        </span>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                            Tawarkan layanan kamu
                        </span>
                    </button>
                </div>
            </div>

            <button className="mt-1 w-full rounded-lg bg-zinc-900 py-2.5 text-[13px] font-medium text-zinc-100 transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
                Buat Akun
            </button>

            <p className="text-center text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-600">
                Dengan mendaftar, kamu menyetujui{' '}
                <a
                    href="#"
                    className="text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
                >
                    Syarat & Ketentuan
                </a>{' '}
                dan{' '}
                <a
                    href="#"
                    className="text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
                >
                    Kebijakan Privasi
                </a>{' '}
                kami.
            </p>
        </div>
    );
}

// ── Main Auth Page ────────────────────────────

export default function AuthPage() {
    // hardcoded: 'login' | 'register'
    const activeTab = 'login';

    return (
        <div className="flex min-h-screen bg-background font-sans antialiased">
            {/* ── Left Panel — branding ── */}
            <div className="hidden w-[420px] flex-shrink-0 flex-col justify-between bg-zinc-50 p-10 lg:flex dark:bg-zinc-900/50">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-zinc-100" />
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        konseling.id
                    </span>
                </div>

                {/* Quote / tagline */}
                <div>
                    <p className="mb-6 font-serif text-2xl leading-snug font-normal tracking-[-0.02em] text-zinc-800 dark:text-zinc-200">
                        "Langkah pertama menuju
                        <br />
                        <span className="text-zinc-400 italic dark:text-zinc-500">
                            kesehatan mental yang lebih baik."
                        </span>
                    </p>

                    {/* Testimonial card */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-[13px] font-semibold text-indigo-500 dark:bg-[#1c1c2e] dark:text-indigo-400">
                                RA
                            </div>
                            <div>
                                <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200">
                                    Rina Aprilia
                                </p>
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
                                    Klien sejak Januari 2024
                                </p>
                            </div>
                        </div>
                        <p className="text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-500">
                            Platform ini membantu saya menemukan konselor yang
                            benar-benar memahami kebutuhan saya. Prosesnya mudah
                            dan nyaman.
                        </p>
                        <div className="mt-2 text-xs text-amber-400">★★★★★</div>
                    </div>
                </div>

                <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
                    © 2024 konseling.id — Semua hak dilindungi
                </p>
            </div>

            {/* ── Right Panel — form ── */}
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <div className="mb-8 flex items-center gap-2 lg:hidden">
                        <div className="h-6 w-6 rounded-md bg-zinc-900 dark:bg-zinc-100" />
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            konseling.id
                        </span>
                    </div>

                    {/* Heading */}
                    <div className="mb-6">
                        <h1 className="font-serif text-2xl font-normal tracking-[-0.02em] text-zinc-900 dark:text-zinc-100">
                            {activeTab === 'login'
                                ? 'Selamat datang kembali'
                                : 'Buat akun baru'}
                        </h1>
                        <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-500">
                            {activeTab === 'login'
                                ? 'Masuk untuk melanjutkan sesi kamu.'
                                : 'Bergabung dan mulai perjalananmu.'}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 flex rounded-lg border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
                        <button
                            className={`flex-1 rounded-md py-1.5 text-[12px] font-medium transition-all ${
                                activeTab === 'login'
                                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
                            }`}
                        >
                            Masuk
                        </button>
                        <button
                            className={`flex-1 rounded-md py-1.5 text-[12px] font-medium transition-all ${
                                activeTab === 'register'
                                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
                            }`}
                        >
                            Daftar
                        </button>
                    </div>

                    {/* Form — switch between LoginForm and RegisterForm based on activeTab */}
                    {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}

                    {/* Switch tab link */}
                    <p className="mt-6 text-center text-[12px] text-zinc-400 dark:text-zinc-600">
                        {activeTab === 'login' ? (
                            <>
                                Belum punya akun?{' '}
                                <a
                                    href="#"
                                    className="text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
                                >
                                    Daftar gratis
                                </a>
                            </>
                        ) : (
                            <>
                                Sudah punya akun?{' '}
                                <a
                                    href="#"
                                    className="text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
                                >
                                    Masuk
                                </a>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

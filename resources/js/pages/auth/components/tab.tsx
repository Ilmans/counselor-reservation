import React from 'react';

interface TabProps {
    active: 'login' | 'register';
}

function Tab({ active }: TabProps) {
    return (
        <div className="mb-8 flex border-b border-zinc-200 dark:border-zinc-800">
            <a
                href="/login"
                className={[
                    'mr-6 border-b-2 pb-3 text-[13px] tracking-[-0.01em]',
                    active === 'login'
                        ? 'border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100'
                        : 'border-transparent text-zinc-400 dark:text-zinc-600',
                ].join(' ')}
            >
                Masuk
            </a>

            <a
                href="/register"
                className={[
                    'border-b-2 pb-3 text-[13px] tracking-[-0.01em]',
                    active === 'register'
                        ? 'border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100'
                        : 'border-transparent text-zinc-400 dark:text-zinc-600',
                ].join(' ')}
            >
                Daftar
            </a>
        </div>
    );
}

export default Tab;

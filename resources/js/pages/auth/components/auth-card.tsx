import type { ReactNode } from 'react';

function AuthCard({ children }: { children: ReactNode }) {
    return (
        <div className="relative w-full max-w-[400px]">
            {/* soft glow di belakang card biar keangkat dari background */}
            <div className="pointer-events-none absolute -inset-x-6 -top-10 -bottom-10 -z-10 rounded-[32px] bg-gradient-to-b from-zinc-100/80 to-transparent blur-2xl dark:from-zinc-800/40" />
            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/90">
                {children}
            </div>
        </div>
    );
}

export default AuthCard;

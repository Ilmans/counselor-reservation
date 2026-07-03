import { useEffect, useState } from 'react';

function getRemaining(expiredAt: string) {
    const diff = new Date(expiredAt).getTime() - Date.now();

    return Math.max(0, Math.floor(diff / 1000));
}

function formatDuration(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

export default function CountdownTimer({
    expiredAt,
    onExpire,
}: {
    expiredAt: string;
    onExpire: () => void;
}) {
    const [remaining, setRemaining] = useState(() => getRemaining(expiredAt));

    useEffect(() => {
        if (remaining <= 0) {
            onExpire();

            return;
        }

        const interval = setInterval(() => {
            setRemaining((prev) => {
                const next = prev - 1;

                if (next <= 0) {
                    clearInterval(interval);
                    onExpire();

                    return 0;
                }
                
                return next;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [expiredAt]);

    const isUrgent = remaining < 60 * 30; // < 30 menit

    return (
        <div
            className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                isUrgent
                    ? 'bg-rose-50 dark:bg-rose-500/10'
                    : 'bg-amber-50 dark:bg-amber-500/10'
            }`}
        >
            <span
                className={`text-sm font-medium ${
                    isUrgent
                        ? 'text-rose-700 dark:text-rose-400'
                        : 'text-amber-700 dark:text-amber-400'
                }`}
            >
                Selesaikan pembayaran dalam
            </span>
            <span
                className={`font-mono text-lg font-bold tabular-nums ${
                    isUrgent
                        ? 'text-rose-700 dark:text-rose-400'
                        : 'text-amber-700 dark:text-amber-400'
                }`}
            >
                {formatDuration(remaining)}
            </span>
        </div>
    );
}

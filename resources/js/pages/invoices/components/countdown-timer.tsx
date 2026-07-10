import { useEffect, useMemo, useState } from 'react';

function getRemainingSeconds(expiredAt: string) {
    const diff = new Date(expiredAt).getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
}

function getTotalSeconds(createdAt: string, expiredAt: string) {
    const diff = new Date(expiredAt).getTime() - new Date(createdAt).getTime();
    return Math.max(1, Math.floor(diff / 1000));
}

function formatDuration(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

export default function CountdownTimer({
    expiredAt,
    createdAt,
    onExpire,
}: {
    expiredAt: string;
    createdAt: string;
    onExpire: () => void;
}) {
    const totalSeconds = useMemo(
        () => getTotalSeconds(createdAt, expiredAt),
        [createdAt, expiredAt],
    );
    const [remaining, setRemaining] = useState(() =>
        getRemainingSeconds(expiredAt),
    );

    useEffect(() => {
        if (getRemainingSeconds(expiredAt) <= 0) {
            onExpire();
            return;
        }

        const interval = setInterval(() => {
            const secondsLeft = getRemainingSeconds(expiredAt);
            setRemaining(secondsLeft);

            if (secondsLeft <= 0) {
                clearInterval(interval);
                onExpire();
            }
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expiredAt]);

    const progress = Math.min(
        100,
        Math.max(0, (remaining / totalSeconds) * 100),
    );
    const isUrgent = remaining <= 300; // 5 menit terakhir

    return (
        <div
            className={`rounded-2xl border px-4 py-4 transition-colors ${
                isUrgent
                    ? 'border-red-200 bg-red-50 dark:border-red-800/60 dark:bg-red-950/30'
                    : 'border-amber-200 bg-amber-50 dark:border-amber-800/60 dark:bg-amber-950/30'
            }`}
        >
            <div className="flex items-center justify-between">
                <span
                    className={`text-xs font-medium ${
                        isUrgent
                            ? 'text-red-700 dark:text-red-400'
                            : 'text-amber-700 dark:text-amber-400'
                    }`}
                >
                    {isUrgent
                        ? 'Segera selesaikan pembayaran!'
                        : 'Selesaikan sebelum'}
                </span>
                <span
                    className={`font-mono text-base font-bold tabular-nums ${
                        isUrgent
                            ? 'animate-pulse text-red-800 dark:text-red-300'
                            : 'text-amber-800 dark:text-amber-300'
                    }`}
                >
                    {formatDuration(remaining)}
                </span>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/70 dark:bg-black/30">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                        isUrgent ? 'bg-red-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

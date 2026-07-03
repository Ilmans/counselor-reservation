import { useEffect, useState } from 'react';

function getRemainingSeconds(expiredAt: string) {
    const diff = new Date(expiredAt).getTime() - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
}

function formatDuration(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

export default function CountdownTimer({
    expiredAt,
    onExpire,
}: {
    expiredAt: string;
    onExpire: () => void;
}) {
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

    return (
        <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/60 dark:bg-amber-950/30">
            <span className="text-xs text-amber-700 dark:text-amber-400">
                Selesaikan sebelum
            </span>
            <span className="font-mono text-sm font-semibold text-amber-800 dark:text-amber-300">
                {formatDuration(remaining)}
            </span>
        </div>
    );
}

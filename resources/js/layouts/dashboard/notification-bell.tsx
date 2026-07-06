import { Bell, Clock, Star } from 'lucide-react';

// NotificationBell.jsx
// Daftar notifikasi di-hardcode di sini, styling pakai kelas dari app.css.

const ALERTS = [
    {
        icon: Clock,
        text: '2 klien menunggu konfirmasi hari ini. Sesi lainnya berjalan sesuai jadwal.',
        when: 'Baru saja',
    },
    {
        icon: Star,
        text: 'Ulasan baru dari Ratna — 5 bintang',
        when: '2 jam lalu',
    },
];

export default function NotificationBell({ open, onToggle }: any) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground"
                aria-label="Notifikasi"
            >
                <Bell size={16} />
                {ALERTS.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-muted" />
                )}
            </button>

            {open && (
                <div className="absolute right-0 z-40 mt-3 w-80 max-w-[85vw] overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                        <p className="text-sm font-semibold">Notifikasi</p>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                            {ALERTS.length} baru
                        </span>
                    </div>
                    <div>
                        {ALERTS.map((a, i) => {
                            const Icon = a.icon;

                            return (
                                <div
                                    key={i}
                                    className={`flex items-start gap-3 px-4 py-3.5 ${i < ALERTS.length - 1 ? 'border-b border-border' : ''}`}
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                                        <Icon size={14} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm leading-snug">
                                            {a.text}
                                        </p>
                                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                                            {a.when}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

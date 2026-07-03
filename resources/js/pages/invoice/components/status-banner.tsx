import type { InvoiceData } from '@/types/invoice';

const CONFIG: Record<
    InvoiceData['status'],
    { title: string; desc: string; className: string; icon: string }>

    = {
    pending: {
        title: 'Menunggu Pembayaran',
        desc: 'Selesaikan pembayaran sebelum waktu habis.',
        className: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
        icon: '⏳',
    },
    paid: {
        title: 'Pembayaran Berhasil',
        desc: 'Terima kasih, pembayaran Anda telah kami terima.',
        className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
        icon: '✅',
    },
    expired: {
        title: 'Invoice Kedaluwarsa',
        desc: 'Batas waktu pembayaran telah lewat. Silakan buat reservasi ulang.',
        className: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700/40 dark:text-zinc-300',
        icon: '⏱️',
    },
    failed: {
        title: 'Pembayaran Gagal',
        desc: 'Terjadi kendala saat memproses pembayaran Anda.',
        className: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
        icon: '✕',
    },
    cancelled: {
        title: 'Invoice Dibatalkan',
        desc: 'Invoice ini telah dibatalkan.',
        className: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
        icon: '✕',
    },
    refunded: {
        title: 'Dana Dikembalikan',
        desc: 'Pembayaran untuk invoice ini telah dikembalikan.',
        className: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
        icon: '↩️',
    },
};

export default function StatusBanner({ status }: { status: InvoiceData['status'] }) {
    const cfg = CONFIG[status];

    return (
        <div className={`flex items-center gap-3 rounded-2xl p-4 ${cfg.className}`}>
            <span className="text-2xl">{cfg.icon}</span>
            <div>
                <p className="font-semibold">{cfg.title}</p>
                <p className="text-sm opacity-90">{cfg.desc}</p>
            </div>
        </div>
    );
}

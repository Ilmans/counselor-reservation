import type { ReactNode } from 'react';
import {
    Users,
    UserCheck,
    CalendarClock,
    Wallet,
    Star,
    ArrowUpRight,
} from 'lucide-react';

import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import PageHead from '@/components/page-head';

interface Stats {
    activeCounselors: number;
    pendingCounselors: number;
    todayConsultations: number;
    monthRevenue: number;
}

interface ActionItems {
    pendingCounselors: number;
    pendingConfirmation: number;
    pendingInvoices: number;
}

interface PendingCounselor {
    id: number;
    name: string;
    photo_path: string | null;
    created_at: string;
}

interface RecentConsultation {
    id: number;
    reference: string;
    user_name: string;
    counselor_name: string;
    consultation_date: string;
    method: 'online' | 'offline';
    status: string;
    created_at: string;
}

interface RecentInvoice {
    id: number;
    reference: string;
    user_name: string;
    amount: number;
    status: string;
    created_at: string;
}

interface TrendPoint {
    date: string;
    label: string;
    total: number;
}

interface StatusCount {
    status: string;
    total: number;
}

interface Feedback {
    average: number;
    total: number;
}

interface Props {
    stats: Stats;
    actionItems: ActionItems;
    pendingCounselorsList: PendingCounselor[];
    recentConsultations: RecentConsultation[];
    recentInvoices: RecentInvoice[];
    dailyTrend: TrendPoint[];
    statusDistribution: StatusCount[];
    feedback: Feedback;
}

const STATUS_TONE: Record<
    string,
    'success' | 'warning' | 'destructive' | 'muted'
> = {
    completed: 'success',
    confirmed: 'success',
    paid: 'success',
    active: 'success',
    pending_payment: 'warning',
    pending_confirmation: 'warning',
    in_queue: 'warning',
    in_progress: 'warning',
    pending: 'warning',
    cancelled: 'destructive',
    rejected: 'destructive',
    failed: 'destructive',
    expired: 'destructive',
    refunded: 'muted',
};

function StatusBadge({ status }: { status: string }) {
    const tone = STATUS_TONE[status] ?? 'muted';
    const toneVar = `var(--${tone === 'muted' ? 'muted-foreground' : tone})`;

    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize"
            style={{
                color: toneVar,
                backgroundColor: `color-mix(in oklch, ${toneVar} 14%, transparent)`,
            }}
        >
            <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: toneVar }}
            />
            {status.replaceAll('_', ' ')}
        </span>
    );
}

function formatRupiah(value: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);
}

function StatCard({
    icon: Icon,
    label,
    value,
    hint,
}: {
    icon: typeof Users;
    label: string;
    value: string;
    hint?: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                    {label}
                </span>
                <span className="rounded-lg bg-secondary p-2 text-secondary-foreground">
                    <Icon className="h-4 w-4" />
                </span>
            </div>
            <div className="mt-3 font-serif text-3xl font-medium text-foreground">
                {value}
            </div>
            {hint && (
                <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
            )}
        </div>
    );
}

function TrendChart({ data }: { data: TrendPoint[] }) {
    const max = Math.max(...data.map((d) => d.total), 1);

    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-medium text-foreground">
                    Tren konsultasi
                </h3>
                <span className="text-xs text-muted-foreground">
                    14 hari terakhir
                </span>
            </div>
            <div className="mt-6 flex h-32 items-end gap-1.5">
                {data.map((point) => (
                    <div
                        key={point.date}
                        className="group relative flex-1"
                        title={`${point.label}: ${point.total} konsultasi`}
                    >
                        <div
                            className="w-full rounded-t-md bg-primary/70 transition-all group-hover:bg-primary"
                            style={{
                                height: `${Math.max((point.total / max) * 100, point.total > 0 ? 6 : 2)}%`,
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                <span>{data[0]?.label}</span>
                <span>{data[data.length - 1]?.label}</span>
            </div>
        </div>
    );
}

function StatusDistribution({ data }: { data: StatusCount[] }) {
    const total = data.reduce((sum, d) => sum + d.total, 0) || 1;

    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-serif text-lg font-medium text-foreground">
                Distribusi status
            </h3>
            <div className="mt-4 space-y-3">
                {data.map((item) => {
                    const tone = STATUS_TONE[item.status] ?? 'muted';
                    const toneVar = `var(--${tone === 'muted' ? 'muted-foreground' : tone})`;
                    const pct = Math.round((item.total / total) * 100);

                    return (
                        <div key={item.status}>
                            <div className="flex justify-between text-xs">
                                <span className="text-foreground capitalize">
                                    {item.status.replaceAll('_', ' ')}
                                </span>
                                <span className="text-muted-foreground">
                                    {item.total} ({pct}%)
                                </span>
                            </div>
                            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${pct}%`,
                                        backgroundColor: toneVar,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ActionItemsPanel({ items }: { items: ActionItems }) {
    const rows = [
        {
            label: 'Konselor menunggu approval',
            value: items.pendingCounselors,
            href: '/admin/counselors?status=pending',
        },
        {
            label: 'Konsultasi menunggu konfirmasi',
            value: items.pendingConfirmation,
            href: '/admin/consultations?status=pending_confirmation',
        },
        {
            label: 'Invoice pending / expired',
            value: items.pendingInvoices,
            href: '/admin/invoices?status=pending,expired',
        },
    ];

    return (
        <>
            <PageHead title="Dashboard admin" />
            <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-serif text-lg font-medium text-foreground">
                    Perlu tindakan
                </h3>
                <div className="mt-3 divide-y divide-border">
                    {rows.map((row) => (
                        <a
                            key={row.label}
                            href={row.href}
                            className="flex items-center justify-between py-3 text-sm transition-colors hover:text-primary"
                        >
                            <span className="text-foreground">{row.label}</span>
                            <span className="flex items-center gap-1 font-medium">
                                <span
                                    className="rounded-full px-2 py-0.5 text-xs"
                                    style={{
                                        color:
                                            row.value > 0
                                                ? 'var(--warning)'
                                                : 'var(--muted-foreground)',
                                        backgroundColor:
                                            row.value > 0
                                                ? 'color-mix(in oklch, var(--warning) 16%, transparent)'
                                                : 'var(--muted)',
                                    }}
                                >
                                    {row.value}
                                </span>
                                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}

function Index({
    stats,
    actionItems,
    pendingCounselorsList,
    recentConsultations,
    recentInvoices,
    dailyTrend,
    statusDistribution,
    feedback,
}: Props) {
    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="font-serif text-2xl font-medium text-foreground">
                    Ringkasan
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Pantauan operasional konsultasi hari ini.
                </p>
            </div>

            {/* Kartu statistik */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={UserCheck}
                    label="Konselor aktif"
                    value={stats.activeCounselors.toString()}
                    hint={`${stats.pendingCounselors} menunggu approval`}
                />
                <StatCard
                    icon={CalendarClock}
                    label="Konsultasi hari ini"
                    value={stats.todayConsultations.toString()}
                />
                <StatCard
                    icon={Wallet}
                    label="Pendapatan bulan ini"
                    value={formatRupiah(stats.monthRevenue)}
                />
                <StatCard
                    icon={Star}
                    label="Rating rata-rata"
                    value={
                        feedback.total > 0 ? feedback.average.toFixed(1) : '–'
                    }
                    hint={`${feedback.total} ulasan`}
                />
            </div>

            {/* Perlu tindakan + tren */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <ActionItemsPanel items={actionItems} />
                </div>
                <div className="lg:col-span-2">
                    <TrendChart data={dailyTrend} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Konselor pending */}
                <div className="rounded-xl border border-border bg-card p-5 lg:col-span-1">
                    <h3 className="font-serif text-lg font-medium text-foreground">
                        Pendaftaran konselor baru
                    </h3>
                    <div className="mt-3 space-y-3">
                        {pendingCounselorsList.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                Tidak ada pendaftaran menunggu.
                            </p>
                        )}
                        {pendingCounselorsList.map((c) => (
                            <div key={c.id} className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                                    {c.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-foreground">
                                        {c.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(
                                            c.created_at,
                                        ).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <StatusDistribution data={statusDistribution} />
                </div>
            </div>

            {/* Konsultasi terbaru */}
            <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-serif text-lg font-medium text-foreground">
                    Konsultasi terbaru
                </h3>
                <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                                <th className="pr-4 pb-2 font-medium">
                                    Referensi
                                </th>
                                <th className="pr-4 pb-2 font-medium">User</th>
                                <th className="pr-4 pb-2 font-medium">
                                    Konselor
                                </th>
                                <th className="pr-4 pb-2 font-medium">
                                    Tanggal
                                </th>
                                <th className="pr-4 pb-2 font-medium">
                                    Metode
                                </th>
                                <th className="pb-2 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentConsultations.map((c) => (
                                <tr key={c.id}>
                                    <td className="py-2.5 pr-4 font-medium text-foreground">
                                        {c.reference}
                                    </td>
                                    <td className="py-2.5 pr-4 text-foreground">
                                        {c.user_name}
                                    </td>
                                    <td className="py-2.5 pr-4 text-foreground">
                                        {c.counselor_name}
                                    </td>
                                    <td className="py-2.5 pr-4 text-muted-foreground">
                                        {new Date(
                                            c.consultation_date,
                                        ).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="py-2.5 pr-4 text-muted-foreground capitalize">
                                        {c.method}
                                    </td>
                                    <td className="py-2.5">
                                        <StatusBadge status={c.status} />
                                    </td>
                                </tr>
                            ))}
                            {recentConsultations.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-6 text-center text-muted-foreground"
                                    >
                                        Belum ada konsultasi.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invoice terbaru */}
            <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-serif text-lg font-medium text-foreground">
                    Invoice terbaru
                </h3>
                <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                                <th className="pr-4 pb-2 font-medium">
                                    Referensi
                                </th>
                                <th className="pr-4 pb-2 font-medium">User</th>
                                <th className="pr-4 pb-2 font-medium">
                                    Jumlah
                                </th>
                                <th className="pb-2 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentInvoices.map((inv) => (
                                <tr key={inv.id}>
                                    <td className="py-2.5 pr-4 font-medium text-foreground">
                                        {inv.reference}
                                    </td>
                                    <td className="py-2.5 pr-4 text-foreground">
                                        {inv.user_name}
                                    </td>
                                    <td className="py-2.5 pr-4 text-foreground">
                                        {formatRupiah(inv.amount)}
                                    </td>
                                    <td className="py-2.5">
                                        <StatusBadge status={inv.status} />
                                    </td>
                                </tr>
                            ))}
                            {recentInvoices.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="py-6 text-center text-muted-foreground"
                                    >
                                        Belum ada invoice.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Index;

Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="dashboard" />
);

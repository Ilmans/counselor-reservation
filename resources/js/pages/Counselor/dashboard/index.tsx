import { CheckCircle2, ClipboardList, Clock, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import Greeting from './components/greeting';
import StatCard from './components/stat-card';

function Index() {
    return (
        <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-5 md:space-y-7 md:px-7 md:py-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Greeting />
                <button
                    className="shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold"
                    style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                    }}
                >
                    Tinjau konfirmasi
                </button>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
                <StatCard
                    icon={ClipboardList}
                    label="Sesi Hari Ini"
                    value="4"
                    hint="2 online · 2 tatap muka"
                />
                <StatCard
                    icon={Clock}
                    label="Menunggu Konfirmasi"
                    value="3"
                    hint="Perlu tindakan Anda"
                />
                <StatCard
                    icon={CheckCircle2}
                    label="Sesi Selesai Bulan Ini"
                    value="42"
                    hint="dari 50 sesi terjadwal"
                />
                <StatCard
                    icon={Star}
                    label="Rating Rata-rata"
                    value="4.9"
                    hint="dari 96 ulasan"
                />
            </div>
        </main>
    );
}

export default Index;
Index.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="dashboard" />
);

import { CheckCircle2, ClipboardList, Clock, Star } from 'lucide-react';
import type { ReactNode } from 'react';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import Greeting from './components/greeting';
import StatCard from './components/stat-card';
import QueueList from './components/queue-list';
import ScheduleList from './components/schedule-list';
import ReviewList from './components/review-list';
import type { CounselorDashboardProps } from './type';

function Index({ statistics, rating, todayQueue, pendingConfirmations, schedules, reviews }: CounselorDashboardProps) {
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
                    value={statistics.today_sessions}
                    hint={`${statistics.today_online_sessions} online · ${statistics.today_offline_sessions} tatap muka`}
                />

                <StatCard
                    icon={Clock}
                    label="Menunggu Konfirmasi"
                    value={statistics.pending_confirmation_sessions}
                    hint="Perlu tindakan Anda"
                />

                <StatCard
                    icon={CheckCircle2}
                    label="Sesi Selesai Bulan Ini"
                    value={statistics.completed_this_month}
                    hint={`dari ${statistics.scheduled_this_month} sesi terjadwal`}
                />

                <StatCard
                    icon={Star}
                    label="Rating Rata-rata"
                    value={rating.average_rating}
                    hint={`dari ${rating.total_reviews} ulasan`}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <QueueList
                        title="Antrean Konsultasi"
                        eyebrow="Aktivitas Hari Ini"
                        items={todayQueue}
                        emptyText="Belum ada konsultasi hari ini"
                    />
                </div>
                <ScheduleList schedules={schedules} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2">
                <QueueList
                    title="Menunggu Konfirmasi"
                    eyebrow="Perlu Tindakan"
                    items={pendingConfirmations}
                    emptyText="Tidak ada konsultasi yang menunggu konfirmasi"
                    showViewAll={false}
                />
                <ReviewList
                    reviews={reviews}
                    averageRating={rating.average_rating}
                    totalReviews={rating.total_reviews}
                />
            </div>
        </main>
    );
}

export default Index;

Index.layout = (page: ReactNode) => <DashboardWrapper children={page} activeKey="dashboard" />;
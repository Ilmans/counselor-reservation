import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { AlertCard } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminWrapper from '@/layouts/dashboard/admin-wrapper';
import DashboardTitle from '@/layouts/dashboard/dashboard-title';
import type { buildWeeklySchedule } from '@/pages/Counselor/schedule/schedule-type';
import type { CounselorRow } from '@/types/row';
import AddressForm from './edit/address-form';
import ProfileForm from './edit/profile-form';
import AdminScheduleSettingsCard from './edit/schedule-form';
import ServiceForm from './edit/service-form';

type RawSchedules = Parameters<typeof buildWeeklySchedule>[0];
interface Props {
    counselor: CounselorRow;
    schedules: RawSchedules;
}
function Edit({ counselor, schedules }: Props) {
    const { alert } = usePage().props;

    return (
        <>
            <div className="mb-4">
                <DashboardTitle
                    title={'Edit Konselor ' + counselor.name}
                    desc={
                        'Anda berada di halaman edit konselor ' + counselor.name
                    }
                />
            </div>

            <Tabs defaultValue="profil">
                <TabsList>
                    <TabsTrigger value="profil">Profil</TabsTrigger>
                    <TabsTrigger value="lokasi">Lokasi Praktik</TabsTrigger>
                    <TabsTrigger value="layanan">Layanan & Harga</TabsTrigger>
                    <TabsTrigger value="schedule">Jadwal</TabsTrigger>
                </TabsList>

                {alert && (
                    <div className="my-2">
                        <AlertCard variant={alert.type}>
                            {alert.message}
                        </AlertCard>
                    </div>
                )}

                <TabsContent value="profil">
                    <ProfileForm counselor={counselor} />
                </TabsContent>

                <TabsContent value="lokasi">
                    <AddressForm
                        address={counselor.address}
                        counselorId={counselor.id}
                    />
                </TabsContent>

                <TabsContent value="layanan">
                    <ServiceForm counselor={counselor} />
                </TabsContent>

                <TabsContent value="schedule">
                    <AdminScheduleSettingsCard
                        schedules={schedules}
                        counselorId={counselor.id}
                    />
                </TabsContent>
            </Tabs>
        </>
    );
}

export default Edit;
Edit.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="manage-counselors" />
);

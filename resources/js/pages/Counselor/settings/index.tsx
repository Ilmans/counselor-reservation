import { ReactNode, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import ProfileForm from './components/profile-form';
import { CounselorRow } from '@/types/row';
import { usePage } from '@inertiajs/react';
import { AlertCard } from '@/components/ui/alert';
import AddressForm from './components/address-form';
import ServiceForm from './components/service-form';

interface Props {
    counselor: CounselorRow;
}
export default function Index({ counselor }: Props) {
    // --- state tab "Profil" ---
    const { alert } = usePage().props;

    return (
        <Tabs defaultValue="profil">
            <TabsList>
                <TabsTrigger value="profil">Profil</TabsTrigger>
                <TabsTrigger value="lokasi">Lokasi Praktik</TabsTrigger>
                <TabsTrigger value="layanan">Layanan & Harga</TabsTrigger>
            </TabsList>

            {alert && (
                <div className="my-2">
                    <AlertCard variant={alert.type}>{alert.message}</AlertCard>
                </div>
            )}
            {/* ------------------------------------------------------------ */}
            {/* TAB: PROFIL                                                    */}
            {/* ------------------------------------------------------------ */}
            <TabsContent value="profil">
                <ProfileForm counselor={counselor} />
            </TabsContent>

            {/* ------------------------------------------------------------ */}
            {/* TAB: LOKASI PRAKTIK                                            */}
            {/* ------------------------------------------------------------ */}
            <TabsContent value="lokasi">
                <AddressForm
                    address={counselor.address}
                    counselorId={counselor.id}
                />
            </TabsContent>

            {/* ------------------------------------------------------------ */}
            {/* TAB: LAYANAN & HARGA                                           */}
            {/* ------------------------------------------------------------ */}
            <TabsContent value="layanan">
                <ServiceForm counselor={counselor} />
            </TabsContent>
        </Tabs>
    );
}

Index.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="settings" />
);

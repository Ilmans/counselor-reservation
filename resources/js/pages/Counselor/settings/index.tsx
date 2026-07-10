import { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import ProfileForm from './components/profile-form';
import { CounselorRow } from '@/types/row';
import { usePage } from '@inertiajs/react';
import { AlertCard } from '@/components/ui/alert';
import AddressForm from './components/address-form';
import ServiceForm from './components/service-form';
import BankForm from './components/bank-form';

interface Wallet {
    balance: number;
    bank_name: string | null;
    account_number: string | null;
    account_holder_name: string | null;
}

interface Props {
    counselor: CounselorRow;
    wallet: Wallet;
}
export default function Index({ counselor, wallet }: Props) {
    const { alert } = usePage().props;

    return (
        <Tabs defaultValue="profil">
            <TabsList>
                <TabsTrigger value="profil">Profil</TabsTrigger>
                <TabsTrigger value="lokasi">Lokasi Praktik</TabsTrigger>
                <TabsTrigger value="layanan">Layanan & Harga</TabsTrigger>
                <TabsTrigger value="keuangan">Metode Penarikan</TabsTrigger>
            </TabsList>

            {alert && (
                <div className="my-2">
                    <AlertCard variant={alert.type}>{alert.message}</AlertCard>
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

            {/* ------------------------------------------------------------ */}
            {/* TAB: KEUANGAN                                                   */}
            {/* ------------------------------------------------------------ */}
            <TabsContent value="keuangan">
                <BankForm wallet={wallet} counselorId={counselor.id} />
            </TabsContent>
        </Tabs>
    );
}

Index.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="settings" />
);

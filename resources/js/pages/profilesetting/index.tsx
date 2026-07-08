import { Head, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import Wrapper from '@/layouts/wrapper';
import { UserSidebar } from '@/layouts/user-sidebar';
import { AccountSettingsForm } from './components/setting-form';
import { AlertCard } from '@/components/ui/alert';

export default function Index() {
    const { user } = usePage().props.auth;
    const { alert } = usePage().props;

    return (
        <>
            <Head title="Pengaturan" />
            <div className="min-h-screen bg-background font-sans text-foreground antialiased">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    <div className="flex flex-col gap-8 md:flex-row md:gap-10">
                        <UserSidebar active="setting" />

                        <div className="min-w-0 flex-1">
                            <div className="mb-8">
                                <h1 className="font-serif text-3xl font-normal tracking-[-0.02em] text-foreground">
                                    Pengaturan
                                </h1>
                                <p className="mt-1 text-[13px] text-muted-foreground">
                                    Kelola informasi akun dan preferensi kamu.
                                </p>
                            </div>
                            {alert && (
                                <div className="my-2">
                                    <AlertCard variant={alert.type}>
                                        {alert.message}
                                    </AlertCard>
                                </div>
                            )}
                            <AccountSettingsForm user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: ReactNode) => <Wrapper main={page} />;

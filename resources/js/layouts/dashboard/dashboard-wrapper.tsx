import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import DashboardHeader from './dashboard-header';
import DashboardSidebar from './dashboard-sidebar';

export default function DashboardWrapper({ children ,activeKey}: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
    );

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener('resize', check);

        return () => window.removeEventListener('resize', check);
    }, []);

    const sidebarVisible = isDesktop || sidebarOpen;

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="flex min-h-screen w-full bg-background font-sans text-foreground">
                {!isDesktop && sidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/40"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                {notifOpen && (
                    <div
                        className="fixed inset-0 z-30"
                        onClick={() => setNotifOpen(false)}
                    />
                )}

                <DashboardSidebar
                    isDesktop={isDesktop}
                    visible={sidebarVisible}
                    onClose={() => setSidebarOpen(false)}
                    activeKey = {activeKey}

                />

                <div className="flex min-w-0 flex-1 flex-col">
                    <DashboardHeader
                        isDesktop={isDesktop}
                        onMenuClick={() => setSidebarOpen(true)}
                        notifOpen={notifOpen}
                        onToggleNotif={() => setNotifOpen((v) => !v)}
                    />

                    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 md:px-7 md:py-7">
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}

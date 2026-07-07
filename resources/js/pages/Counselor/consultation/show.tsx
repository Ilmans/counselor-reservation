import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';
import React, { ReactNode } from 'react';
import KonselorDetailKonsultasi from './components/detail/tes';

function Show() {
    return <KonselorDetailKonsultasi />;
}

export default Show;
Show.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="consultations" />
);

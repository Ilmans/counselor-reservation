import type { ReactNode } from 'react';
import DashboardWrapper from '@/layouts/dashboard/dashboard-wrapper';

function Index() {
    return <div>index</div>;
}

export default Index;
Index.layout = (page: ReactNode) => (
    <DashboardWrapper children={page} activeKey="dashboard" />
);

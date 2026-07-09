import type { ReactNode } from 'react';

import AdminWrapper from '@/layouts/dashboard/admin-wrapper';

function Index() {
    return <div>Index</div>;
}

export default Index;

Index.layout = (page: ReactNode) => (
    <AdminWrapper children={page} activeKey="dashboard" />
);

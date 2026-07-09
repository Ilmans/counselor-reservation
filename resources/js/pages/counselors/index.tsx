import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import Wrapper from '@/layouts/wrapper';
import type { CounselorList, Paginated } from '@/types/counselor';

import type { FILTERS } from '@/types/filter';
import CounselorGrid from './components/counselor-grid';
import Filter from './components/filter';
import PageHead from '@/components/page-head';

type Props = {
    counselors: Paginated<CounselorList>;
    filters: FILTERS;
};

export default function Index({ counselors, filters }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 900);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <PageHead
                title={filters.search ? filters.search : 'Cari Konselor'}
            />
            <Filter filters={filters} onLoadingChange={setIsLoading} />
            <CounselorGrid counselors={counselors} isLoading={isLoading} />
        </>
    );
}

Index.layout = (page: ReactNode) => <Wrapper main={page} />;

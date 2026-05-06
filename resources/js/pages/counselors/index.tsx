import type { ReactNode } from 'react';

import Wrapper from '@/layouts/wrapper';
import type { Counselor, Paginated } from '@/types/counselor';
import type { COUNSELOR_FILTER } from '@/types/filter';
import CounselorList from './components/counselor-list';
import Filter from './components/filter';
import Hero from './components/hero';

type Props = {
    counselors: Paginated<Counselor>;
    filters: COUNSELOR_FILTER;
};
export default function Index({ counselors, filters }: Props) {
    return (
        <>
            <Hero />
            <Filter filters={filters} />
            <CounselorList counselors={counselors} />
        </>
    );
}

Index.layout = (page: ReactNode) => <Wrapper main={page} />;

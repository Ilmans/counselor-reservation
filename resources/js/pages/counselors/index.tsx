import type { ReactNode } from 'react';

import Wrapper from '@/layouts/wrapper';
import type {  CounselorList, Paginated } from '@/types/counselor';

import type { FILTERS } from '@/types/filter';
import CounselorGrid from './components/counselor-grid';
import Filter from './components/filter';


type Props = {
    counselors: Paginated<CounselorList>;
    filters: FILTERS;
};
export default function Index({ counselors, filters }: Props) {

    return (
        <>

            <Filter filters={filters} />
            <CounselorGrid counselors={counselors} />
        </>
    );
}

Index.layout = (page: ReactNode) => <Wrapper main={page} />;

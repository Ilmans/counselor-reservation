import type { ReactNode } from 'react';
import Wrapper from '@/layouts/wrapper';
import type { Counselor, Paginated } from '@/types/counselor';
import CounselorList from './components/counselor-list';
import Filter from './components/filter';
import Hero from './components/hero';

type Props = {
    counselors: Paginated<Counselor>;
};
export default function Index({ counselors }: Props) {
    console.log(counselors);

    return (
        <>
            <Hero />
            <Filter />
            <CounselorList counselors={counselors} />
        </>
    );
}

Index.layout = (page: ReactNode) => <Wrapper main={page} />;

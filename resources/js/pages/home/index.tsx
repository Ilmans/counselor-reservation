import type { ReactNode } from 'react';
import PageHead from '@/components/page-head';
import Wrapper from '@/layouts/wrapper';
import Hero from './components/hero';
import HowItWorks from './components/how-it-works';
import TrustAndCta from './components/trust-and-cta';

function Index() {
    return (
        <>
            <PageHead title="Platform Konselor Terbaik" />
            <Hero />
            <HowItWorks />
            <TrustAndCta />
        </>
    );
}

export default Index;
Index.layout = (page: ReactNode) => <Wrapper main={page} />;

import type { ReactNode } from 'react';
import Wrapper from '@/layouts/wrapper';
import AboutHero from './components/about-hero';
import Curation from './components/curation';
import OurStory from './components/our-story';
import ValuesAndCta from './components/values-cta';
import PageHead from '@/components/page-head';

function AboutUs() {
    return (
        <>
            <PageHead title="Tentang Kami" />
            <AboutHero />
            <OurStory />
            <Curation />
            <ValuesAndCta />
        </>
    );
}

export default AboutUs;
AboutUs.layout = (page: ReactNode) => <Wrapper main={page} />;

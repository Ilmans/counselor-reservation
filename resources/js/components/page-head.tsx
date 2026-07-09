import { Head, usePage } from '@inertiajs/react';

type PageHeadProps = {
    title: string;
    description?: string;
    keywords?: string;
    img?: string;
    robots?: string;
    canonical?: string;
};

const APP_NAME = 'Counseling System';

export default function PageHead({
    title,
    description = 'Platform konsultasi profesional.',
    keywords = 'konseling, psikologi, konsultasi',
    robots = 'index,follow',
    img = '',
    canonical,
}: PageHeadProps) {
    const { app } = usePage().props;
    const image = img ? img : app.logo;
    const fullTitle = `${title}`

    return (
        <Head title={fullTitle}>
            {/* Basic */}
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={robots} />

            {/* Theme */}
            <meta name="theme-color" content="#0f172a" />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Favicon */}
        </Head>
    );
}

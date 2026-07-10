import type { CounselorDetail } from '@/types/counselor';

type Props = {
    counselor: CounselorDetail;
};

function CounselorAbout({ counselor }: Props) {
    const stats = [
        counselor.address?.full_address && {
            label: 'Lokasi',
            value: counselor.address.full_address,
        },
        {
            label: 'Sesi selesai',
            value: `${counselor.total_consultations} sesi`,
        },
        counselor.member_since && {
            label: 'Bergabung sejak',
            value: counselor.member_since,
        },
    ].filter(Boolean) as { label: string; value: string }[];

    return (
        <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-lg font-normal text-foreground">
                Tentang
            </h2>
            <div
                className="prose prose-sm mt-2 max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: counselor.bio }}
            />

            <dl className="mt-5 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-3">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            {stat.label}
                        </dt>
                        <dd className="mt-1 text-sm text-foreground">
                            {stat.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export default CounselorAbout;

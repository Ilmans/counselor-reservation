import type { CounselorDetail } from '@/types/counselor';

type Props = {
    counselor: CounselorDetail;
};

function CounselorAbout({ counselor }: Props) {
    return (
        <div className="rounded-[28px] border border-border/60 bg-card p-6 shadow-sm">
            <h2 className="font-serif text-lg font-normal text-foreground">
                Tentang
            </h2>
            <div
                className="prose prose-sm mt-2 max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: counselor.bio }}
            />

            <div className="mt-5 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-3">
                {counselor.address?.full_address && (
                    <div>
                        <p className="text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
                            Lokasi
                        </p>
                        <p className="mt-1 text-sm text-foreground">
                            {counselor.address.full_address}
                        </p>
                    </div>
                )}

                <div>
                    <p className="text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
                        Sesi Selesai
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                        {counselor.total_consultations} sesi
                    </p>
                </div>

                {counselor.member_since && (
                    <div>
                        <p className="text-[11px] font-medium tracking-wide text-muted-foreground/70 uppercase">
                            Bergabung Sejak
                        </p>
                        <p className="mt-1 text-sm text-foreground">
                            {counselor.member_since}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CounselorAbout;

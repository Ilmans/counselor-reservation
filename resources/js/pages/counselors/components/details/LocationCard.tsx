import type { CounselorAddress } from '@/types/counselor';

type Props = {
    address: CounselorAddress;
};

function LocationCard({ address }: Props) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800/80 dark:bg-[#111113]">
            <p className="mb-3 text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-600">
                Lokasi Praktik
            </p>
            <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200">
                {address.name}
            </p>
            <p className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-500">
                {address.address}, {address.city} , {address.province} ,
                {address.postal_code}
            </p>
            {/* Map placeholder */}
            <div className="mt-3 flex h-24 items-center justify-center rounded-lg bg-zinc-100 text-[11px] text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
                Peta lokasi
            </div>
        </div>
    );
}

export default LocationCard;

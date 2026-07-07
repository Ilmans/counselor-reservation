import ConsultationController from '@/actions/App/Http/Controllers/Counselor/ConsultationController';
import 'react-day-picker/dist/style.css';
import DateFilter from '@/components/interactive/date-filter';
import SelectFilter from '@/components/interactive/select-filter';

function Filters({ filters }: any) {
    return (
        
        <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-shrink-0">
            <SelectFilter
                name="status"
                filters={filters}
                only={['consultations']}
                url={ConsultationController.index.url()}
                options={[
                    { label: 'Semua', value: '' },
                    {
                        label: 'Menunggu Konfirmasi',
                        value: 'pending_confirmation',
                    },
                    { label: 'Terkonfirmasi', value: 'confirmed' },
                    { label: 'Dalam Antrian', value: 'in_queue' },
                    { label: 'Sedang Berlangsung', value: 'in_progress' },
                    { label: 'Selesai', value: 'completed' },
                    { label: 'Ditolak', value: 'rejected' },
                ]}
            />

            <DateFilter
                name="date"
                filters={filters}
                only={['consultations']}
                url={ConsultationController.index.url()}
            />
        </div>
    );
}

export default Filters;

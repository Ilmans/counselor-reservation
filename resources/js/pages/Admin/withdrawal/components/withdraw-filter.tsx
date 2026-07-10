import WithdrawController from '@/actions/App/Http/Controllers/Admin/WithdrawController';
import 'react-day-picker/dist/style.css';
import DateFilter from '@/components/interactive/date-filter';
import SelectFilter from '@/components/interactive/select-filter';

function Filters({ filters }: any) {
    return (
        <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-shrink-0">
            <SelectFilter
                name="status"
                filters={filters}
                only={['withdrawals']}
                url={WithdrawController.index.url()}
                options={[
                    { label: 'Semua', value: '' },
                    { label: 'Menunggu Diproses', value: 'pending' },
                    { label: 'Berhasil', value: 'completed' },
                    { label: 'Ditolak', value: 'rejected' },
                ]}
            />

            <DateFilter
                name="date"
                filters={filters}
                only={['withdrawals']}
                url={WithdrawController.index.url()}
            />
        </div>
    );
}

export default Filters;

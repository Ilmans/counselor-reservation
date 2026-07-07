import ReviewController from '@/actions/App/Http/Controllers/Counselor/ReviewController';
import 'react-day-picker/dist/style.css';
import DateFilter from '@/components/interactive/date-filter';
import SelectFilter from '@/components/interactive/select-filter';

function ReviewFilters({ filters }: any) {
    return (
        <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-shrink-0">
            <SelectFilter
                name="rating"
                filters={filters}
                only={['reviews']}
                url={ReviewController.index.url()}
                options={[
                    { label: 'Semua', value: '' },
                    { label: '5 Bintang', value: '5' },
                    { label: '4 Bintang', value: '4' },
                    { label: '3 Bintang', value: '3' },
                    { label: '2 Bintang', value: '2' },
                    { label: '1 Bintang', value: '1' },
                ]}
            />

            <DateFilter
                name="date"
                filters={filters}
                only={['reviews']}
                url={ReviewController.index.url()}
            />
        </div>
    );
}

export default ReviewFilters;

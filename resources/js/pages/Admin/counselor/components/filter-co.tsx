import AdminCounselorController from '@/actions/App/Http/Controllers/Admin/AdminCounselorController';
import 'react-day-picker/dist/style.css';
import SelectFilter from '@/components/interactive/select-filter';

function FilterCo({ filters }: any) {
    return (
        <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-shrink-0">
            <SelectFilter
                name="visibility"
                filters={filters}
                only={['counselors']}
                url={AdminCounselorController.index.url()}
                options={[
                    { label: 'Semua', value: '' },
                    { label: 'Aktif', value: 'active' },
                    { label: 'NonAktif', value: 'inactive' },
                ]}
            />
        </div>
    );
}

export default FilterCo;

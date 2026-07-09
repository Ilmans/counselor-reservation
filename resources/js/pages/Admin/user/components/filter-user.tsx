
import ManageUserController from '@/actions/App/Http/Controllers/Admin/ManageUserController';
import SelectFilter from '@/components/interactive/select-filter';

function FilterUser({ filters }: any) {
    return (
        <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-shrink-0">
            <SelectFilter
                name="role"
                filters={filters}
                only={['users']}
                url={ManageUserController.index.url()}
                options={[
                    { label: 'Semua Role', value: '' },
                    { label: 'User', value: 'user' },
                    { label: 'Counselor', value: 'counselor' },
                    { label: 'Admin', value: 'admin' },
                ]}
            />
        </div>
    );
}

export default FilterUser;

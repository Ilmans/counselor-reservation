import AdminInvoiceController from '@/actions/App/Http/Controllers/Admin/AdminInvoiceController';
import SelectFilter from '@/components/interactive/select-filter';

function Filters({ filters }: any) {
    return (
        <div className="flex w-full items-center gap-2 sm:w-auto sm:flex-shrink-0">
            <SelectFilter
                name="status"
                filters={filters}
                only={['invoices']}
                url={AdminInvoiceController.index.url()}
                options={[
                    { label: 'Semua Status', value: '' },
                    { label: 'Menunggu Pembayaran', value: 'pending' },
                    { label: 'Lunas', value: 'paid' },
                    { label: 'Kadaluarsa', value: 'expired' },
                    { label: 'Gagal', value: 'failed' },
                    { label: 'Dibatalkan', value: 'cancelled' },
                    { label: 'Dikembalikan', value: 'refunded' },
                ]}
            />
        </div>
    );
}

export default Filters;

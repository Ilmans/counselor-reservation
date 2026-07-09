import { useForm } from '@inertiajs/react';
import { useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import AdminMasterDataController from '@/actions/App/Http/Controllers/Admin/AdminMasterDataController';
import type { CategoryList } from '@/types/category';
import Modal from '@/components/ui/modal';

interface Props {
    open: boolean;
    onClose: () => void;
    category: CategoryList | null;
}

function CategoryModal({ open, onClose, category }: Props) {
    const isEdit = !!category;
    const form = useForm<{ name: string }>({ name: '' });

    useEffect(() => {
        if (!open) return;
        form.setData('name', category?.name ?? '');
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, category]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            form.put(
                AdminMasterDataController.updateCategory.url(category!.id),
                {
                    preserveScroll: true,
                    onSuccess: () => onClose(),
                },
            );
        } else {
            form.post(AdminMasterDataController.storeCategory.url(), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose} className="max-w-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
                {isEdit ? 'Edit Kategori' : 'Tambah Kategori'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Nama Kategori
                    </label>
                    <input
                        type="text"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    />
                    {form.errors.name && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.name}
                        </p>
                    )}
                </div>

                <div className="mt-2 flex justify-end gap-2">
                    <Button
                        type="button"
                        mode="outlined"
                        onClick={onClose}
                        disabled={form.processing}
                    >
                        Batal
                    </Button>
                    <Button type="submit" disabled={form.processing}>
                        {isEdit ? 'Simpan' : 'Tambah'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default CategoryModal;

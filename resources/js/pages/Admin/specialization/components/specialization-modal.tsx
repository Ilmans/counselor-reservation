import { useForm } from '@inertiajs/react';
import { useEffect, type FormEvent } from 'react';;
import { Button } from '@/components/ui/button';
import AdminMasterDataController from '@/actions/App/Http/Controllers/Admin/AdminMasterDataController';
import type { SpecializationList } from '@/types/specialization';
import Modal from '@/components/ui/modal';

interface Props {
    open: boolean;
    onClose: () => void;
    specialization: SpecializationList | null;
}

function SpecializationModal({ open, onClose, specialization }: Props) {
    const isEdit = !!specialization;
    const form = useForm<{ name: string; description: string }>({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (!open) return;
        form.setData({
            name: specialization?.name ?? '',
            description: specialization?.description ?? '',
        });
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, specialization]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            form.post(
                AdminMasterDataController.updateSpecialization.url(
                    specialization!.id,
                ),
                {
                    preserveScroll: true,
                    onSuccess: () => onClose(),
                },
            );
        } else {
            form.post(AdminMasterDataController.storeSpecialization.url(), {
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose} className="max-w-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
                {isEdit ? 'Edit Spesialisasi' : 'Tambah Spesialisasi'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Nama
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

                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Deskripsi
                    </label>
                    <textarea
                        value={form.data.description}
                        onChange={(e) =>
                            form.setData('description', e.target.value)
                        }
                        rows={3}
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    />
                    {form.errors.description && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.description}
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

export default SpecializationModal;

import { useForm } from '@inertiajs/react';
import { useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { UserList } from '@/types/row';
import ManageUserController from '@/actions/App/Http/Controllers/Admin/ManageUserController';
import Modal from '@/components/ui/modal';

interface Props {
    open: boolean;
    onClose: () => void;
    user: UserList | null;
}

interface UserForm {
    name: string;
    email: string;
    whatsapp: string;
    age: number;
    gender: 'L' | 'P';
    role: 'user' | 'counselor' | 'admin';
    password: string;
    avatar: File | null;
}

function UserModal({ open, onClose, user }: Props) {
    const isEdit = !!user;

    const form = useForm<UserForm>({
        name: '',
        email: '',
        whatsapp: '',
        age: 20,
        gender: 'L',
        role: 'user',
        password: '',
        avatar: null,
    });

    useEffect(() => {
        if (!open) return;

        if (user) {
            form.setData({
                name: user.name,
                email: user.email,
                whatsapp: user.whatsapp ?? '',
                age: user.age,
                gender: user.gender,
                role: user.role,
                password: '',
                avatar: null,
            });
        } else {
            form.reset();
        }
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, user]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(ManageUserController.update.url(user!.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        } else {
            form.post(ManageUserController.store.url(), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose} className="max-w-md">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
                {isEdit ? 'Edit User' : 'Tambah User'}
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
                        Email
                    </label>
                    <input
                        type="email"
                        value={form.data.email}
                        onChange={(e) => form.setData('email', e.target.value)}
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    />
                    {form.errors.email && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        WhatsApp
                    </label>
                    <input
                        type="text"
                        value={form.data.whatsapp}
                        onChange={(e) =>
                            form.setData('whatsapp', e.target.value)
                        }
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    />
                    {form.errors.whatsapp && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.whatsapp}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                            Usia
                        </label>
                        <input
                            type="number"
                            value={form.data.age}
                            onChange={(e) =>
                                form.setData('age', Number(e.target.value))
                            }
                            className="w-full rounded-md border border-border px-3 py-2 text-sm"
                        />
                        {form.errors.age && (
                            <p className="mt-1 text-xs text-red-600">
                                {form.errors.age}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                            Gender
                        </label>
                        <select
                            value={form.data.gender}
                            onChange={(e) =>
                                form.setData(
                                    'gender',
                                    e.target.value as 'L' | 'P',
                                )
                            }
                            className="w-full rounded-md border border-border px-3 py-2 text-sm"
                        >
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        {form.errors.gender && (
                            <p className="mt-1 text-xs text-red-600">
                                {form.errors.gender}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Role
                    </label>
                    <select
                        value={form.data.role}
                        onChange={(e) =>
                            form.setData(
                                'role',
                                e.target.value as UserForm['role'],
                            )
                        }
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    >
                        <option value="user">User</option>
                        <option value="counselor">Counselor</option>
                        <option value="admin">Admin</option>
                    </select>
                    {form.errors.role && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.role}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Password{' '}
                        {isEdit && (
                            <span className="text-xs font-normal text-muted-foreground">
                                (kosongkan jika tidak diubah)
                            </span>
                        )}
                    </label>
                    <input
                        type="password"
                        value={form.data.password}
                        onChange={(e) =>
                            form.setData('password', e.target.value)
                        }
                        className="w-full rounded-md border border-border px-3 py-2 text-sm"
                    />
                    {form.errors.password && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.password}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                        Foto (opsional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            form.setData('avatar', e.target.files?.[0] ?? null)
                        }
                        className="w-full text-sm"
                    />
                    {form.errors.avatar && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.avatar}
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

export default UserModal;

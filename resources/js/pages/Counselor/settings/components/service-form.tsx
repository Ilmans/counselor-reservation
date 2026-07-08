import CounselorSettingController from '@/actions/App/Http/Controllers/Counselor/CounselorSettingController';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CounselorRow } from '@/types/row';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react';

interface Category {
    id: number;
    name: string;
}

interface Props {
    counselor: CounselorRow;
}

function ServiceForm({ counselor }: Props) {
    const { categories } = usePage().props as { categories: Category[] };

    const { data, setData, post, processing, errors } = useForm({
        pricing_type: counselor.pricing_type,
        session_duration_minutes: counselor.session_duration_minutes,
        price_per_hour: counselor.price_per_hour,
        specialization_id: counselor.specialization_id,
        category_ids: counselor.categories?.map((c) => c.id) ?? [],
    });
    console.log(errors);

    const toggleCategory = (categoryId: number, checked: boolean) => {
        setData(
            'category_ids',
            checked
                ? [...data.category_ids, categoryId]
                : data.category_ids.filter((id) => id !== categoryId),
        );
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(CounselorSettingController.updateServices.url(counselor.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-medium text-foreground">
                Layanan & Harga
            </p>
            <p className="mt-1 text-[12px] text-muted-foreground">
                Atur kategori konsultasi yang kamu layani, durasi sesi, dan
                tarif.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select
                        error={errors.pricing_type}
                        label="Tipe Harga"
                        value={data.pricing_type}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                pricing_type: e.target.value as 'paid' | 'free',
                            }))
                        }
                        options={[
                            { label: 'Gratis', value: 'free' },
                            { label: 'Berbayar', value: 'paid' },
                        ]}
                    />
                    {data.pricing_type === 'paid' && (
                        <Input
                            label="Tarif per Sesi (Rp)"
                            type="number"
                            min={0}
                            step={5000}
                            error={errors.price_per_hour}
                            value={data.price_per_hour}
                            onChange={(e) =>
                                setData((prev) => ({
                                    ...prev,
                                    price_per_hour: e.target.value,
                                }))
                            }
                            error={errors.price_per_hour}
                        />
                    )}
                    <Input
                        label="Durasi Sesi (menit)"
                        type="number"
                        min={15}
                        step={5}
                        error={errors.session_duration_minutes}
                        value={data.session_duration_minutes}
                        onChange={(e) =>
                            setData((prev) => ({
                                ...prev,
                                session_duration_minutes: e.target.value,
                            }))
                        }
                        error={errors.session_duration_minutes}
                    />
                </div>

                <div className="mt-5">
                    <span className="text-[11px] font-medium text-muted-foreground">
                        Kategori Konsultasi
                    </span>
                    {errors.category_ids && (
                        <p className="text-destructive text-red-500 mt-1 text-[11px]">
                            {errors.category_ids}
                        </p>
                    )}
                    <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {categories.map((category) => (
                            <Checkbox
                                key={category.id}
                                label={category.name}
                                checked={data.category_ids.includes(
                                    category.id,
                                )}
                                onChange={(e) =>
                                    toggleCategory(
                                        category.id,
                                        e.target.checked,
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-5 flex justify-end">
                    <Button
                        type="submit"
                        variant="default"
                        mode="filled"
                        disabled={processing}
                        loading={processing}
                    >
                        {processing ? 'Menyimpan' : 'Simpan Layanan'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ServiceForm;

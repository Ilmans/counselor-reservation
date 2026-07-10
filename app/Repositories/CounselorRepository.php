<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\Counselor;
use App\Models\Specialization;

class CounselorRepository
{

    // SCALABLE,FOR RESERVATION
    public function getCounselorPrice(int $id): int
    {
        return Counselor::where('id', $id)
            ->value('price_per_hour') ?? 0;
    }


    public function getAllCounselors(array $visibilities, $perPage = 12, ?string $category, ?string $search = null)
    {
        return Counselor::select('id', 'slug', 'specialization_id', 'name', 'email', 'whatsapp', 'photo_path', 'pricing_type', 'price_per_hour', 'visibility', 'created_at')
            ->with([
                'categories',
                'specialization',
                'schedules' => fn($q) => $q->where('is_active', true)

            ])
            ->withCount('consultations')
            ->withAvg('feedbacks', 'rating')
            ->when($category, function ($query, $slug) {
                $query->whereHas('categories', function ($q) use ($slug) {
                    $q->where('slug', $slug);
                });
            })
            ->whereIn('visibility', $visibilities)
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhereHas('specialization', function ($sq) use ($search) {
                            $sq->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->orderByDesc('created_at') // terbaru
            ->paginate($perPage)

            ->withQueryString();
    }


    public function getCounselorBySlug(string $slug)
    {
        return Counselor::with(['categories', 'specialization', 'address',  'schedules' => fn($q) => $q->where('is_active', true)])
            ->withAvg('feedbacks', 'rating')
            ->withCount('consultations','feedbacks')
            ->whereSlug($slug)->first();
    }

    public function findCounselor(int $id)
    {
        return Counselor::with(['address', 'categories'])->find($id);
    }


    public function getAllCategories()
    {
        return Category::select('id', 'name', 'slug')
            ->orderBy('name')
            ->get();
    }

    public function getAllSpecialization()
    {
        return Specialization::select('id', 'name', 'description')->orderBy('name')
            ->get();
    }

    public function updateProfile(Counselor $counselor, array $data): Counselor
    {
        $counselor->update($data);
        return $counselor->fresh();
    }

    public function updateAddress(Counselor $counselor, array $data): Counselor
    {
        $counselor->address()->update($data);
        return $counselor->fresh('address');
    }

    public function updateService(Counselor $counselor, array $data): Counselor
    {
        $categoryIds = $data['category_ids'];
        unset($data['category_ids']);
        $counselor->update($data);
        $counselor->categories()->sync($categoryIds);

        return $counselor->fresh('categories');
    }
}

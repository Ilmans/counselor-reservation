<?php

namespace App\Repositories;
use App\Models\Category;
use App\Models\Counselor;

class CounselorRepository
{

// SCALABLE,FOR RESERVATION
    public function getCounselorPrice(int $id): int
    {
        return Counselor::where('id', $id)
            ->value('price_per_hour') ?? 0;
    }

    public function getAllCategories()
    {
        return Category::select('id', 'name', 'slug')
            ->orderBy('name')
            ->get();
    }

    public function getAllCounselors(?string $category, ?string $search = null)
    {
        return Counselor::select('id', 'slug', 'specialization_id', 'name', 'email', 'whatsapp', 'photo_url', 'pricing_type', 'price_per_hour', 'status')
            ->with(['categories', 'specialization'])
            ->withCount('consultations')
            ->withAvg('feedbacks', 'rating')
            ->when($category, function ($query, $slug) {
                $query->whereHas('categories', function ($q) use ($slug) {
                    $q->where('slug', $slug);
                });
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhereHas('specialization', function ($sq) use ($search) {
                            $sq->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->paginate(6)
            ->withQueryString();
    }


    public function getCounselorBySlug(string $slug)
    {
        return Counselor::with(['categories', 'specialization', 'address', 'schedules'])
            ->withCount('consultations')
            ->whereSlug($slug)->first();
    }




}

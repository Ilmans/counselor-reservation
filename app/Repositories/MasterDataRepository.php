<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\Specialization;
use Illuminate\Support\Str;

class MasterDataRepository
{

    public function getAllCategories(?string $search = null, int $perPage = 10)
    {
        return Category::select('id', 'name', 'slug')
            ->withCount('counselors')
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function createCategory(array $data): Category
    {
        return Category::create([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
        ]);
    }

    public function updateCategory(Category $category, array $data): Category
    {
        $category->update([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
        ]);
        return $category->fresh();
    }

    public function categoryInUse(Category $category): bool
    {
        return $category->counselors()->exists();
    }

    public function deleteCategory(Category $category): void
    {
        $category->delete();
    }

    public function getAllSpecializations(?string $search = null, int $perPage = 10)
    {
        return Specialization::select('id', 'name', 'description')
            ->withCount('counselors')
            ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
    }
    public function createSpecialization(array $data): Specialization
    {
        return Specialization::create($data);
    }

    public function updateSpecialization(Specialization $specialization, array $data): Specialization
    {
        $specialization->update($data);
        return $specialization->fresh();
    }

    public function specializationInUse(Specialization $specialization): bool
    {
        return $specialization->counselors()->exists();
    }

    public function deleteSpecialization(Specialization $specialization): void
    {
        $specialization->delete();
    }

}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryListResource;
use App\Http\Resources\SpecializationListResource;
use App\Models\Category;
use App\Models\Specialization;
use App\Repositories\MasterDataRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AdminMasterDataController extends Controller
{
    public function __construct(protected MasterDataRepository $repo) {}

    // ==================== CATEGORY ====================

    public function indexCategory(Request $request)
    {
        $filters = $request->only('search');
        $categories = CategoryListResource::collection($this->repo->getAllCategories($request->search));


        return inertia('Admin/category/index', compact('categories', 'filters'));
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('categories', 'name')],
        ]);

        $this->repo->createCategory($validated);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Kategori berhasil ditambahkan.',
        ]);
    }

    public function updateCategory(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('categories', 'name')->ignore($category->id)],
        ]);

        $this->repo->updateCategory($category, $validated);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Kategori berhasil diperbarui.',
        ]);
    }

    public function deleteCategory(Category $category)
    {
        if ($this->repo->categoryInUse($category)) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Kategori tidak dapat dihapus karena masih digunakan oleh konselor.',
            ]);
        }

        $this->repo->deleteCategory($category);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Kategori berhasil dihapus.',
        ]);
    }

    // ==================== SPECIALIZATION ====================

    public function indexSpecialization(Request $request)
    {
        $filters = $request->only('search');
        $specializations = SpecializationListResource::collection($this->repo->getAllSpecializations($request->search));
        return inertia('Admin/specialization/index', compact('specializations', 'filters'));
    }

    public function storeSpecialization(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('specializations', 'name')],
            'description' => ['required', 'string', 'max:1000'],
        ]);

        $this->repo->createSpecialization($validated);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Spesialisasi berhasil ditambahkan.',
        ]);
    }

    public function updateSpecialization(Request $request, Specialization $specialization)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('specializations', 'name')->ignore($specialization->id)],
            'description' => ['required', 'string', 'max:1000'],
        ]);

        $this->repo->updateSpecialization($specialization, $validated);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Spesialisasi berhasil diperbarui.',
        ]);
    }

    public function deleteSpecialization(Specialization $specialization)
    {
        if ($this->repo->specializationInUse($specialization)) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Spesialisasi tidak dapat dihapus karena masih digunakan oleh konselor.',
            ]);
        }

        $this->repo->deleteSpecialization($specialization);

        return redirect()->back()->with('toast', [
            'type' => 'success',
            'message' => 'Spesialisasi berhasil dihapus.',
        ]);
    }
}

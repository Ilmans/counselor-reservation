<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Http\Resources\CounselorResource;
use App\Models\Counselor;
use App\Repositories\CounselorRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class CounselorSettingController extends Controller
{
    public function __construct(protected CounselorRepository $counselorRepo) {}

    public function index()
    {
        $counselorId = Auth::user()->counselor->id;
        $counselor = new CounselorResource($this->counselorRepo->findCounselor($counselorId));

        return inertia('Counselor/settings/index', compact('counselor'));
    }



    public function updateProfile(Request $request, Counselor $counselor)
    {
        $validated = $request->validate([
            'name'              => ['required', 'string', 'max:255'],
            'specialization_id' => ['required', 'exists:specializations,id'],
            'experience_years'  => ['required', 'integer', 'min:0', 'max:60'],
            'email'             => ['required', 'email', 'max:255'],
            'whatsapp'          => ['required', 'string', 'max:20'],
            'bio'               => ['required', 'string'],
            'status'            => ['required', Rule::in(['active', 'inactive'])],
            'photo'             => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        if ($request->hasFile('photo')) {
            if ($counselor->photo_url) {
                Storage::disk('public')->delete($counselor->photo_url);
            }
            $validated['photo_url'] = $request->file('photo')->store('counselors', 'public');
        }
        unset($validated['photo']);
        $this->counselorRepo->updateProfile($counselor, $validated);

        return back()->with('toast', [
            'type' => 'success',
            'message' => "Profile konselor berhasil di perbarui.",
            'code' => rand(1, 5)
        ]);
    }

    public function updateAddress(Request $request, Counselor $counselor)
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'address'     => ['required', 'string'],
            'city'        => ['required', 'string', 'max:255'],
            'province'    => ['nullable', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:10'],
            'maps_url'    => ['nullable', 'url', 'max:2048'],
        ]);

        $this->counselorRepo->updateAddress($counselor, $validated);

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Alamat praktik berhasil diperbarui.',
            'code' => rand(1, 5),
        ]);
    }

    public function updateServices(Request $request, Counselor $counselor)
    {
        
        $validated = $request->validate([
            'pricing_type'                => ['required', Rule::in(['free', 'paid'])],
            'price_per_hour'               => ['required_if:pricing_type,paid', 'nullable', 'min:0'],
            'session_duration_minutes'     => ['required', 'integer', 'min:15', 'max:180'],
            'specialization_id'            => ['required', 'exists:specializations,id'],
            'category_ids'                 => ['required', 'array', 'min:1', 'max:4'],
            'category_ids.*'               => ['integer', 'exists:categories,id'],
        ]);

        if ($validated['pricing_type'] === 'free') {
            $validated['price_per_hour'] = 0;
        }

        $this->counselorRepo->updateService($counselor, $validated);

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Layanan & harga berhasil diperbarui.',
            'code' => rand(1, 5),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Concerns;

use App\Http\Requests\ProfileCounselorRequest;
use App\Http\Requests\UpdateAddressCounselorRequest;
use App\Http\Requests\UpdateServicesCounselorRequest;
use App\Models\Counselor;
use Illuminate\Support\Facades\Storage;

trait ManagesCounselorProfile
{
    public function updateProfile(ProfileCounselorRequest $request, Counselor $counselor)
    {
        $validated = $request->validated();

        if ($request->hasFile('photo')) {
            if ($counselor->photo_path) {
                Storage::disk('public')->delete($counselor->photo_path);
            }
            $validated['photo_path'] = $request->file('photo')->store('counselors', 'public');
        }
        unset($validated['photo']);

        $this->counselorRepo->updateProfile($counselor, $validated);

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Profile konselor berhasil di perbarui.',
            'code' => rand(1, 5),
        ]);
    }

    public function updateAddress(UpdateAddressCounselorRequest $request, Counselor $counselor)
    {
        $validated = $request->validated();
        $this->counselorRepo->updateAddress($counselor, $validated);

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Alamat praktik berhasil diperbarui.',
            'code' => rand(1, 5),
        ]);
    }

    public function updateServices(UpdateServicesCounselorRequest $request, Counselor $counselor)
    {
        $validated = $request->validated();

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

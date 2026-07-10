<?php

namespace App\Http\Controllers\Counselor;

use App\Constants\CacheKey;
use App\Http\Controllers\Concerns\ManagesCounselorProfile;
use App\Http\Controllers\Controller;
use App\Http\Resources\CounselorResource;
use App\Http\Resources\WalletResource;
use App\Models\Counselor;
use App\Models\CounselorWallet;
use App\Repositories\CounselorRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class CounselorSettingController extends Controller
{
    use ManagesCounselorProfile;

    public function __construct(protected CounselorRepository $counselorRepo) {}

    public function index()
    {
        $counselorId = Auth::user()->counselor->id;
        $counselor = new CounselorResource($this->counselorRepo->findCounselor($counselorId));
        $wallet = CounselorWallet::firstOrNew(['counselor_id' => $counselorId]);

        Cache::forget(CacheKey::counselorBySlug($counselor->slug));
        return inertia('Counselor/settings/index', [
            'counselor' => $counselor,
            'wallet' => new WalletResource($wallet),
        ]);
    }


    public function updateBank(Request $request, Counselor $counselor)
    {
        $validated = $request->validate([
            'bank_name' => ['required', 'string', 'max:100'],
            'account_number' => ['required', 'string', 'max:50'],
            'account_holder_name' => ['required', 'string', 'max:255'],
        ]);

        CounselorWallet::updateOrCreate(
            ['counselor_id' => $counselor->id],
            $validated
        );

        return redirect()->back()->with('alert', [
            'type' => 'success',
            'message' => 'Informasi rekening bank berhasil diperbarui.',
        ]);
    }
}

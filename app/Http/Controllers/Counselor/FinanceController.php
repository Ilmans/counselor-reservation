<?php

namespace App\Http\Controllers\Counselor;

use App\Http\Controllers\Controller;
use App\Http\Resources\WalletResource;
use App\Http\Resources\WithdrawalResource;
use App\Repositories\FinanceRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FinanceController extends Controller
{
    public function __construct(protected FinanceRepository $repo) {}

    public function index(Request $request)
    {
        $filters = $request->only('status', 'search', 'date');
        $counselorId = Auth::user()->counselor->id;
        $statuses = $request->filled('status') ? [$request->status] : null;

        $wallet = new WalletResource($this->repo->getWallet($counselorId));
        $upcomingBalance = $this->repo->getUpcomingBalance($counselorId);

        $withdrawals = WithdrawalResource::collection(
            $this->repo->getCounselorWithdrawals(
                $counselorId,
                $statuses,
                $request->search,
                $request->date,
            )
        );

        return inertia('Counselor/finance/index', compact(
            'wallet',
            'upcomingBalance',
            'withdrawals',
            'filters',
        ));
    }

    public function store(Request $request)
    {
        $counselorId = Auth::user()->counselor->id;
        $wallet = $this->repo->findWalletByCounselorId($counselorId);

        if (!$wallet || !$wallet->bank_name || !$wallet->account_number) {
            return redirect()->back()->with('alert', [
                'type' => 'error',
                'message' => 'Lengkapi informasi rekening bank terlebih dahulu di menu Pengaturan.',
            ]);
        }

        $validated = $request->validate([
            'amount' => [
                'required',
                'numeric',
                'min:50000',
                function ($attribute, $value, $fail) use ($wallet) {
                    if ($value > $wallet->balance) {
                        $fail('Jumlah penarikan melebihi saldo yang tersedia.');
                    }
                },
            ],
        ]);

        $this->repo->createWithdrawal([
            'reference' => 'WD-' . strtoupper(Str::random(10)),
            'counselor_id' => $wallet->counselor_id,
            'amount' => $validated['amount'],
            'bank_name' => $wallet->bank_name,
            'account_number' => $wallet->account_number,
            'account_holder_name' => $wallet->account_holder_name,
            'status' => 'pending',
        ]);

        $this->repo->decrementWalletBalance($wallet, $validated['amount']);

        return redirect()->back()->with('alert', [
            'type' => 'success',
            'message' => 'Permintaan penarikan dana berhasil dikirim.',
        ]);
    }
}

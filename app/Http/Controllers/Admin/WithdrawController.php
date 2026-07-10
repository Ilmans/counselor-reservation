<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\WithdrawalAdminResource;
use App\Models\Withdrawal;
use App\Repositories\FinanceRepository;
use Illuminate\Http\Request;

class WithdrawController extends Controller
{
    public function __construct(protected FinanceRepository $repo) {}

    public function index(Request $request)
    {
        $filters = $request->only('status', 'search', 'date');
        $statuses = $request->filled('status') ? [$request->status] : null;

        $withdrawals = WithdrawalAdminResource::collection(
            $this->repo->getAllWithdrawals($statuses, $request->search, $request->date)
        );

        return inertia('Admin/withdrawal/index', compact('withdrawals', 'filters'));
    }

    public function approve(Withdrawal $withdrawal)
    {
        if ($withdrawal->status !== 'pending') {
            return redirect()->back()->with('alert', [
                'type' => 'error',
                'message' => 'Penarikan ini sudah pernah diproses sebelumnya.',
            ]);
        }

        $this->repo->markWithdrawalAsCompleted($withdrawal);

        return redirect()->back()->with('alert', [
            'type' => 'success',
            'message' => 'Penarikan dana berhasil disetujui.',
        ]);
    }

    public function reject(Request $request, Withdrawal $withdrawal)
    {
        if ($withdrawal->status !== 'pending') {
            return redirect()->back()->with('alert', [
                'type' => 'error',
                'message' => 'Penarikan ini sudah pernah diproses sebelumnya.',
            ]);
        }

        $validated = $request->validate([
            'notes' => ['required', 'string', 'max:255'],
        ]);

        $this->repo->markWithdrawalAsRejected($withdrawal, $validated['notes']);

        return redirect()->back()->with('alert', [
            'type' => 'success',
            'message' => 'Penarikan dana ditolak, saldo dikembalikan ke counselor.',
        ]);
    }
}

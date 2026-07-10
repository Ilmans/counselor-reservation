<?php

namespace App\Repositories;

use App\Models\CounselorWallet;
use App\Models\Invoice;
use App\Models\Withdrawal;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FinanceRepository
{
   
    public function getWallet(int $counselorId): CounselorWallet
    {
        return CounselorWallet::firstOrNew(['counselor_id' => $counselorId]);
    }

    /**
     * Saldo mendatang: total invoice yang sudah dibayar (paid),
     * tapi konsultasinya belum selesai (completed) dan tidak batal/ditolak.
     * Artinya konsultasi sudah dikonfirmasi (confirmed/in_queue/in_progress).
     */
    public function getUpcomingBalance(int $counselorId): float
    {
        return (float) Invoice::query()
            ->join('consultations', 'consultations.id', '=', 'invoices.consultation_id')
            ->where('consultations.counselor_id', $counselorId)
            ->where('invoices.status', 'paid')
            ->whereIn('consultations.status', ['confirmed', 'in_queue', 'in_progress'])
            ->sum('invoices.amount');
    }

    /**
     * Riwayat penarikan dana counselor, dengan filter status, search reference, dan tanggal.
     */
    public function getCounselorWithdrawals(
        int $counselorId,
        ?array $statuses = null,
        ?string $search = null,
        ?string $date = null,
    ): LengthAwarePaginator {
        return Withdrawal::query()
            ->where('counselor_id', $counselorId)
            ->when($statuses, fn($q) => $q->whereIn('status', $statuses))
            ->when($search, fn($q) => $q->where('reference', 'like', "%{$search}%"))
            ->when($date, fn($q) => $q->whereDate('created_at', $date))
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

    /**
     * Cari wallet berdasarkan counselor_id. Null kalau belum pernah dibuat.
     * Beda dengan getWallet() yang selalu kasih instance (firstOrNew) —
     * ini dipakai saat kita perlu tahu pasti apakah wallet-nya sudah ada.
     */
    public function findWalletByCounselorId(int $counselorId): ?CounselorWallet
    {
        return CounselorWallet::where('counselor_id', $counselorId)->first();
    }

    /**
     * Simpan record penarikan dana baru.
     */
    public function createWithdrawal(array $data): Withdrawal
    {
        return Withdrawal::create($data);
    }

    /**
     * Kurangi saldo wallet counselor.
     */
    public function decrementWalletBalance(CounselorWallet $wallet, float $amount): void
    {
        $wallet->decrement('balance', $amount);
    }

    /**
     * Tambah kembali saldo wallet counselor (dipakai saat penarikan ditolak).
     */
    public function incrementWalletBalance(CounselorWallet $wallet, float $amount): void
    {
        $wallet->increment('balance', $amount);
    }

    /**
     * [ADMIN] Semua penarikan dana dari seluruh counselor, sertakan data counselor & user-nya
     * supaya admin bisa lihat siapa yang mengajukan tanpa query terpisah.
     */
    public function getAllWithdrawals(
        ?array $statuses = null,
        ?string $search = null,
        ?string $date = null,
    ): LengthAwarePaginator {
        return Withdrawal::query()
            ->with('counselor.user')
            ->when($statuses, fn($q) => $q->whereIn('status', $statuses))
            ->when($search, fn($q) => $q->where('reference', 'like', "%{$search}%"))
            ->when($date, fn($q) => $q->whereDate('created_at', $date))
            ->latest()
            ->paginate(10)
            ->withQueryString();
    }

    /**
     * [ADMIN] Setujui penarikan dana. Saldo tidak berubah lagi di sini
     * karena sudah dipotong saat counselor mengajukan penarikan.
     */
    public function markWithdrawalAsCompleted(Withdrawal $withdrawal): void
    {
        $withdrawal->update([
            'status' => 'completed',
            'processed_at' => now(),
        ]);
    }

    /**
     * [ADMIN] Tolak penarikan dana + kembalikan saldo ke wallet counselor.
     */
    public function markWithdrawalAsRejected(Withdrawal $withdrawal, string $notes): void
    {
        $withdrawal->update([
            'status' => 'rejected',
            'notes' => $notes,
            'processed_at' => now(),
        ]);

        $wallet = $this->findWalletByCounselorId($withdrawal->counselor_id);

        if ($wallet) {
            $this->incrementWalletBalance($wallet, (float) $withdrawal->amount);
        }
    }
}

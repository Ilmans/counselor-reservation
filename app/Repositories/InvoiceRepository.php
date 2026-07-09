<?php

namespace App\Repositories;

use App\Models\Invoice;
use App\Models\PaymentMethod;
use Illuminate\Support\Str;

class InvoiceRepository
{

    public function getUserInvoices(
        int $userId,
        ?string $search = null,
        int $perPage = 10
    ) {
        return Invoice::query()
            ->where('user_id', $userId)
            ->when($search, fn($query) => $query->where('reference', 'like', "%{$search}%"))
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data)
    {
        return Invoice::create([
            'reference'       => $this->generateReference(),
            'user_id'         => $data['user_id'],
            'consultation_id' => $data['consultation_id'],
            'amount'          => $data['amount'],
            'status'          => $this->resolveStatus($data['amount']),
        ]);
    }

    private function generateReference(): string
    {
        return 'INV-' . strtoupper(Str::random(10));
    }

    private function resolveStatus(int $amount): string
    {
        return $amount <= 0 ? 'paid' : 'pending';
    }


    public function findForUser($ref, int $userId): ?Invoice
    {
        return Invoice::with(['consultation.counselor.specialization'])
            ->where('reference', $ref)
            ->where('user_id', $userId)
            ->first();
    }

    public function updatePaymentMethod(Invoice $invoice, array $snapshot): Invoice
    {
        $invoice->update(['payment_method' => $snapshot]);

        return $invoice->fresh();
    }

    public function getActivePaymentMethods()
    {
        return PaymentMethod::where('is_active', true)
            ->get(['id', 'code', 'name', 'type', 'metadata']);
    }

    public function findActivePaymentMethodByCode(string $code): ?PaymentMethod
    {
        return PaymentMethod::where('code', $code)
            ->where('is_active', true)
            ->first();
    }


    public function getAllInvoicesForAdmin(
        ?string $status = null,
        ?string $search = null,
        int $perPage = 10
    ) {
        return Invoice::query()
            ->with(['user', 'consultation.counselor'])
            ->when($status, fn($query) => $query->where('status', $status))
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('reference', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($uq) use ($search) {
                            $uq->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }
    public function markAsPaid(Invoice $invoice): Invoice
    {
        $invoice->update([
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        return $invoice->fresh();
    }

    public function deleteInvoice(Invoice $invoice): void
    {
        $invoice->delete();
    }
}

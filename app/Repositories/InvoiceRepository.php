<?php

namespace App\Repositories;

use App\Models\Invoice;
use App\Models\PaymentMethod;
use Illuminate\Support\Str;

class InvoiceRepository
{
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


    public function findForUser(int $id, int $userId): ?Invoice
    {
        return Invoice::with(['consultation.counselor.specialization'])
            ->where('id', $id)
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
}

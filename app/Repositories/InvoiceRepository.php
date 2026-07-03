<?php

namespace App\Repositories;

use App\Models\Invoice;
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
}

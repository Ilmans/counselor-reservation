<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WithdrawalAdminResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'counselor' => [
                'name' => $this->counselor->name,
                'email' => $this->counselor->user->email ?? $this->counselor->email,
            ],
            'amount' => (float) $this->amount,
            'amount_formatted' => 'Rp' . number_format((float) $this->amount, 0, ',', '.'),
            'bank_name' => $this->bank_name,
            'account_number' => $this->account_number,
            'account_holder_name' => $this->account_holder_name,
            'status' => $this->status,
            'status_label' => match ($this->status) {
                'pending' => 'Menunggu Diproses',
                'completed' => 'Berhasil',
                'rejected' => 'Ditolak',
                default => $this->status,
            },
            'notes' => $this->notes,
            'date' => optional($this->created_at)->translatedFormat('d M Y, H:i'),
        ];
    }
}

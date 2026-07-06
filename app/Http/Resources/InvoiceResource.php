<?php

namespace App\Http\Resources;

use App\Constants\StatusConstant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'reference'        => $this->reference,
            'amount'           => 'Rp ' . number_format((float) $this->amount, 0, ',', '.'),
            'status'           => $this->status,
            'status_label'     => StatusConstant::INVOICE_STATUS_LABEL[$this->status],
            'payment_method'   => $this->payment_method,
            'created_at'       => optional($this->created_at)?->translatedFormat('j F Y'),
            'expired_at'       => optional($this->expired_at)?->translatedFormat('j F Y'),
            'paid_at'          => optional($this->paid_at)?->translatedFormat('j F Y'),
        ];
    }
}

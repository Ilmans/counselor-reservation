<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentMethodResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $metadata = [];

        if (!empty($this->metadata)) {
            $metadata = json_decode($this->metadata, true) ?? [];
        }

        return [
            'id' => $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'type' => $this->type,
            'is_active' => $this->is_active,
            'logo' => $metadata['logo'] ?? null,
            'metadata' => $metadata,
        ];
    }
}

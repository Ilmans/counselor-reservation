<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'is_anonymous' => $this->is_anonymous,
            'client_name' => $this->is_anonymous
                ? 'Anonim'
                : $this->consultation->user->name,
            'reference' => $this->consultation->reference,
            'date' => $this->consultation->date,
            'created_at' => $this->created_at->format('d M Y'),
        ];
    }
}

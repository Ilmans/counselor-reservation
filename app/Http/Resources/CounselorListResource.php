<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CounselorListResource extends JsonResource
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
            'slug' => $this->slug,
            'name' => $this->name,
            'email' => $this->email,
            'whatsapp' => $this->whatsapp,
            'photo_path' => $this->photo_path,
            'photo' => $this->photo_path
                ? (filter_var($this->photo_path, FILTER_VALIDATE_URL)
                    ? $this->photo_path
                    : Storage::disk('public')->url($this->photo_path))
                : null,
            'specialization' => $this->specialization?->name,

            'categories' => $this->categories
                ->pluck('name')
                ->implode(', '),

            'pricing_type' => $this->pricing_type,
            'price_per_hour' => 'Rp ' . number_format((float) $this->price_per_hour, 0, ',', '.'),
            'status' => $this->status,
            'status_label' => $this->status == "active" ? "Aktif" : "Non-Aktif",

            'consultations_count' => $this->consultations_count,
            'feedbacks_avg_rating' => $this->feedbacks_avg_rating
                ? round($this->feedbacks_avg_rating, 1)
                : null,
        ];
    }
}

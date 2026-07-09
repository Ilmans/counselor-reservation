<?php

namespace App\Http\Resources;

use App\Support\Formatter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CounselorDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'bio' => $this->bio,
            // NOTE: sesuaikan ini sama cara kamu generate URL foto di
            // CounselorListResource yang udah ada, biar konsisten. Ini asumsi
            // filenya disimpan lewat `Storage::disk('public')`.
            'photo_path' => $this->photo_path,
            'photo' => $this->photo_path
                ? (filter_var($this->photo_path, FILTER_VALIDATE_URL)
                    ? $this->photo_path
                    : Storage::disk('public')->url($this->photo_path))
                : null,

            'specialization' => $this->whenLoaded('specialization', fn() => [
                'id' => $this->specialization->id,
                'name' => $this->specialization->name,
                'description' => $this->specialization->description,
            ]),

            'categories' => CategoryListResource::collection($this->whenLoaded('categories')),
            'rating' => round((float) ($this->feedbacks_avg_rating ?? 0), 1),
            'total_reviews' => (int) ($this->feedbacks_count ?? 0),
            'total_consultations' => (int) ($this->consultations_count ?? 0),

            'pricing' => [
                'type' => $this->pricing_type,
                'is_free' => $this->pricing_type === 'free',
                'amount' => $this->price_per_hour,
                'label' => $this->pricing_type === 'free'
                    ? 'Gratis'
                    : Formatter::rupiah($this->price_per_hour) . ' / sesi',
            ],

          

            // NOTE: field full_address/city/province ini ASUMSI — sesuaikan
            // dengan kolom asli di model Address kamu.
            'address' => $this->whenLoaded('address', fn() => $this->address ? [
                'full_address' => $this->address->full_address ?? $this->address->address ?? null,
                'city' => $this->address->city ?? null,
                'province' => $this->address->province ?? null,
            ] : null),

            'schedules' => ScheduleResource::collection($this->whenLoaded('schedules')),

            'member_since' => $this->created_at?->translatedFormat('F Y'),
        ];
    }
}

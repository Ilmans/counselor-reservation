<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CounselorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                         => $this->id,
            'user_id'                    => $this->user_id,
            'specialization_id'          => $this->specialization_id,
            'address_id'                 => $this->address_id,
            'address' => new CounselorAddressResource(
                $this->whenLoaded('address')
            ),
            'categories' => $this->whenLoaded('categories', function () {
                return $this->categories->map(fn($category) => [
                    'id'   => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                ]);
            }),
            'name'                       => $this->name,
            'slug'                       => $this->slug,
            'experience_years'           => $this->experience_years,
            'email'                      => $this->email,
            'whatsapp'                   => $this->whatsapp,
            'bio'                        => $this->bio,
            'photo_url'                  => $this->photo_url
                ? Storage::url($this->photo_url)
                : null,
            'pricing_type'               => $this->pricing_type,
            'price_per_hour'             => $this->price_per_hour,
            'session_duration_minutes'   => $this->session_duration_minutes,
            'status'                     => $this->status,
            'created_at'                 => $this->created_at,
            'updated_at'                 => $this->updated_at,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'whatsapp' => $this->whatsapp,
            'avatar_path' => $this->avatar_path,
            'avatar' => $this->avatar_path ? asset('storage/' . $this->avatar_path) : null,
            'age' => $this->age,
            'gender' => $this->gender,
            'role' => $this->role,
            'consultations_count' => $this->consultations_count ?? 0,
            'created_at' => $this->created_at,
        ];
    }
}

<?php

namespace App\Http\Resources;


use App\Constants\StatusConstant;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultationListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'reference'    => $this->reference,
            'status'       => $this->status,
            'status_label' => StatusConstant::STATUS_LABELS[$this->status] ?? $this->status,

            'date'     => Carbon::parse($this->consultation_date)->translatedFormat('D, j M Y'),
            'time'     => Carbon::parse($this->estimated_time)->format('H:i') . ' WIB',
            'mode'     => $this->method === 'online' ? 'Online' : 'Tatap Muka',
            'duration' => $this->duration . " menit",
            'is_anonymous' => $this->is_anonymous,

            'price' => $this->whenLoaded(
                'invoice',
                fn() =>
                'Rp ' . number_format((float) $this->invoice->amount, 0, ',', '.'),
            ),

            'counselor' => $this->whenLoaded('counselor', fn() => [
                'name'           => $this->counselor->name,
                'slug'           => $this->counselor->slug,
                'photo_path'      => $this->counselor->photo_path,
                'specialization' => $this->counselor->specialization->name ?? '-',
                'whatsapp'       => $this->counselor->whatsapp,
            ]),

            'user' => $this->whenLoaded('user', fn() => [
                'name'      => $this->user->name,
                'email'     => $this->user->email,
                'whatsapp'  => $this->user->whatsapp,
                'gender'    => match ($this->user->gender) {
                    'L' => 'Laki-laki',
                    'P' => 'Perempuan',
                    default => '-',
                },
                'age'       => $this->user->birth_date
                    ? Carbon::parse($this->user->birth_date)->age
                    : null,
                'since'     => 'Sejak ' . $this->user->created_at->translatedFormat('F Y'),
            ]),

            'pra_note' => $this->whenLoaded(
                'notes',
                fn() =>
                $this->notes->firstWhere('type', 'pre_session')?->content
            ),
        ];
    }
}

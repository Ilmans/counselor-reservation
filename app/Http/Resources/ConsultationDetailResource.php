<?php

namespace App\Http\Resources;


use App\Constants\StatusConstant;
use App\Support\Formatter;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ConsultationDetailResource extends ConsultationListResource
{
    public function toArray(Request $request): array
    {
        $isConfirmedOrBeyond = in_array($this->status, ['confirmed', 'in_queue', 'in_progress', 'completed'], true);
        $isCancelledLike     = in_array($this->status, ['cancelled', 'rejected'], true);

        return array_merge(parent::toArray($request), [
            'status_group'   => $this->resolveStatusGroup($this->status),
            'queue_position' =>  $this->queue_position,


            'schedule' => [
                'date'     => Carbon::parse($this->consultation_date)->translatedFormat('l, j F Y'),
                'time'     => Carbon::parse($this->estimated_time)->format('H:i') . ' WIB',
                'duration' => $this->whenLoaded(
                    'counselor',
                    fn() =>
                    $this->counselor->session_duration_minutes . ' menit'
                ),
            ],
            'method' => $this->method,
            'method_label' => Formatter::methodLabel($this->method),
            'is_anonymous' => (bool) $this->is_anonymous,
            'is_first'     => (bool) $this->client_first_experience,
            'categories'   => $this->categories,

            'meeting_link' => $this->when(
                $this->method === 'online' && $isConfirmedOrBeyond,
                $this->meeting_link
            ),

            'location' => $this->when(
                $this->method === 'offline' && $isConfirmedOrBeyond,
                fn() => $this->whenLoaded('counselor', fn() => [
                    'name'     => $this->counselor->address->name ?? null,
                    'address'  => $this->counselor->address->address ?? null,
                    'city'     => $this->counselor->address->city ?? null,
                    'maps_url' => $this->counselor->address->maps_url ?? null,
                ])
            ),

            // di sini 'notes' di-override jadi object lengkap (parent cuma string client note)
            'notes' => $this->whenLoaded(
                'notes',
                fn() =>
                $this->notes->map(fn($note) => [
                    'id'         => $note->id,
                    'type'       => $note->type,
                    'visibility' => $note->visibility,
                    'content'    => $note->content,
                    'created_at' =>  Carbon::parse($note->created_at)->translatedFormat('l, j F Y')
                ])
            ),

            'invoice' => $this->whenLoaded(
                'invoice',
                fn() =>
                new InvoiceResource($this->invoice)
            ),

            'needs_payment' => $this->whenLoaded(
                'invoice',
                fn() =>
                $this->invoice && $this->invoice->status === 'pending'
            ),
        ]);
    }

    private function resolveStatusGroup(string $status): string
    {
        foreach (StatusConstant::STATUS_GROUPS as $group => $statuses) {
            if ($statuses && in_array($status, $statuses, true)) {
                return $group;
            }
        }

        return 'all';
    }
}

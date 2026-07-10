<?php

namespace App\Events;

use App\Models\Consultation;
use App\Models\ConsultationChatMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;

class ConsultationMessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets;

    public function __construct(
        public Consultation $consultation,
        public array $payload, // hasil formatMessage()
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("consultation.{$this->consultation->id}"),
        ];
    }

    public function broadcastAs(): string
    {
        return 'message.sent';
    }

    public function broadcastWith(): array
    {
        return ['message' => $this->payload];
    }
}

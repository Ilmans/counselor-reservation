<?php

namespace App\Services;

use App\Events\ConsultationMessageSent;
use App\Models\Consultation;
use App\Models\ConsultationChat;
use App\Models\ConsultationChatMessage;
use Illuminate\Support\Collection;


class ConsultationChatService
{
    protected const ACTIVE_STATUSES = ['confirmed', 'in_queue', 'in_progress'];

    protected const DEFAULT_PAGE_SIZE = 20;

    public function getOrCreateChat(Consultation $consultation): ConsultationChat
    {
        return ConsultationChat::firstOrCreate(
            ['consultation_id' => $consultation->id],
            ['status' => 'closed']
        );
    }

    public function syncStatus(Consultation $consultation): void
    {
        $chat = $this->getOrCreateChat($consultation);

        $isActive = in_array($consultation->status, self::ACTIVE_STATUSES, true);
        $wasOpen = $chat->status === 'open';

        if ($isActive && ! $wasOpen) {
            $chat->update(['status' => 'open']);
        } elseif (! $isActive && $wasOpen) {
            $chat->update(['status' => 'closed']);
        }
    }

    public function isChatOpen(Consultation $consultation): bool
    {
        return $this->getOrCreateChat($consultation)->status === 'open';
    }


    public function getMessages(
        Consultation $consultation,
        ?int $afterId = null,
        ?int $beforeId = null,
        int $limit = self::DEFAULT_PAGE_SIZE
    ): Collection {
        if ($afterId !== null) {
            return $consultation->messages()
                ->where('id', '>', $afterId)
                ->orderBy('id')
                ->get();
        }

        $query = $consultation->messages()->newQuery();

        if ($beforeId !== null) {
            $query->where('id', '<', $beforeId);
        }

        return $query->orderByDesc('id')
            ->limit($limit)
            ->get()
            ->sortBy('id')
            ->values();
    }


    public function hasMoreBefore(Consultation $consultation, ?int $oldestLoadedId): bool
    {
        if (! $oldestLoadedId) {
            return false;
        }

        return $consultation->messages()
            ->where('id', '<', $oldestLoadedId)
            ->exists();
    }

    public function sendMessage(
        Consultation $consultation,
        string $senderType,
        ?int $senderId,
        string $message
    ): ConsultationChatMessage {
        if (! $this->isChatOpen($consultation) && $senderType !== 'system') {
            throw new \RuntimeException('Chat untuk konsultasi ini sedang tidak aktif.');
        }

        $chatMessage = ConsultationChatMessage::create([
            'consultation_id' => $consultation->id,
            'sender_type' => $senderType,
            'sender_id' => $senderId,
            'message' => $message,
            'is_read_by_user' => $senderType === 'user',
            'is_read_by_counselor' => $senderType === 'counselor',
        ]);

        broadcast(new ConsultationMessageSent(
            $consultation,
            $this->formatMessage($chatMessage, $consultation)
        ))->toOthers();

        return $chatMessage;
    }

    public function sendDummyAiMessage(Consultation $consultation, string $message): ConsultationChatMessage
    {
        $chat = $this->getOrCreateChat($consultation);

        $chatMessage = ConsultationChatMessage::create([
            'consultation_id' => $consultation->id,
            'sender_type' => 'ai',
            'sender_id' => null,
            'message' => $message,
        ]);

        $chat->update(['ai_last_replied_at' => now()]);

        return $chatMessage;
    }

    public function countUnread(Consultation $consultation, string $readerType): int
    {
        $column = $readerType === 'user' ? 'is_read_by_user' : 'is_read_by_counselor';

        return $consultation->messages()
            ->where('sender_type', '!=', $readerType)
            ->where($column, false)
            ->count();
    }

    public function markAsRead(Consultation $consultation, string $readerType): void
    {
        $column = $readerType === 'user' ? 'is_read_by_user' : 'is_read_by_counselor';

        ConsultationChatMessage::query()
            ->where('consultation_id', $consultation->id)
            ->where($column, false)
            ->update([$column => true]);
    }

    public function resolveSenderType($authUser, Consultation $consultation): ?string
    {
        if ($authUser->id === $consultation->user_id) {
            return 'user';
        }

        if ($consultation->counselor && $authUser->id === $consultation->counselor->user_id) {
            return 'counselor';
        }

        return null;
    }


    // ConsultationChatService.php
    public function formatMessage(ConsultationChatMessage $m, Consultation $consultation): array
    {
        $name = match ($m->sender_type) {
            'user' => $consultation->is_anonymous ? 'Anonim' : $consultation->user->name,
            'counselor' => $consultation->counselor->name,
            'ai' => 'AI Assistant',
            default => 'System',
        };

        return [
            'id' => $m->id,
            'sender_type' => $m->sender_type,
            'sender_name' => $name,
            'message' => $m->message,
            'created_at' => $m->created_at->toIso8601String(),
        ];
    }
}

<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\ConsultationChatMessage;
use App\Services\ConsultationChatService;
use Illuminate\Http\Request;

class ConsultationChatController extends Controller
{
    public function __construct(protected ConsultationChatService $chatService) {}


    public function index(Request $request, Consultation $consultation)
    {
        $senderType = $this->guardAccess($request, $consultation);
        $afterId = $request->filled('after_id') ? (int) $request->query('after_id') : null;
        $beforeId = $request->filled('before_id') ? (int) $request->query('before_id') : null;
        $messages = $this->chatService->getMessages($consultation, $afterId, $beforeId, 5);

        $hasMore = $afterId === null
            ? $this->chatService->hasMoreBefore($consultation, $messages->first()?->id)
            : false;

        return response()->json([
            'messages' => $messages->map(fn(ConsultationChatMessage $m) => $this->chatService->formatMessage($m, $consultation)),
            'has_more' => $hasMore,
            'chat_status' => $consultation->chat?->status ?? 'closed',
            'unread_count' => $this->chatService->countUnread($consultation, $senderType),
        ]);
    }

    /**
     * POST /consultations/{consultation}/chat/messages
     */
    public function store(Request $request, Consultation $consultation)
    {
        $senderType = $this->guardAccess($request, $consultation);

        $data = $request->validate([
            'message' => ['required', 'string', 'max:5000'],
        ]);

        try {
            $message = $this->chatService->sendMessage(
                $consultation,
                $senderType,
                $request->user()->id,
                $data['message']
            );
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        return response()->json([
            'messages' => [$this->chatService->formatMessage($message, $consultation)],
        ]);
    }


    public function storeAiReply(Request $request, Consultation $consultation)
    {
        $senderType = $this->guardAccess($request, $consultation);
        abort_if($senderType !== 'counselor', 403, 'Hanya konselor yang bisa mengirim balasan AI.');

        $data = $request->validate([
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $message = $this->chatService->sendDummyAiMessage($consultation, $data['message']);

        return response()->json([
            'messages' => [$this->chatService->formatMessage($message, $consultation)],
        ]);
    }


    public function markRead(Request $request, Consultation $consultation)
    {
        $senderType = $this->guardAccess($request, $consultation);
        $this->chatService->markAsRead($consultation, $senderType);

        return response()->json(['message' => 'ok']);
    }


    protected function guardAccess(Request $request, Consultation $consultation): string
    {
        $senderType = $this->chatService->resolveSenderType($request->user(), $consultation);
        abort_if($senderType === null, 403, 'Kamu bukan bagian dari konsultasi ini.');

        return $senderType;
    }


}

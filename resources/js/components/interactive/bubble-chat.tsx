import { Bot, Info } from 'lucide-react';
import type { ChatMessage } from '@/types/consultation-chat';

interface ConsultationChatBubbleProps {
    message: ChatMessage;
    isOwn: boolean;
}

export default function ConsultationChatBubble({
    message,
    isOwn,
}: ConsultationChatBubbleProps) {
    const time = new Date(message.created_at).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    });

    // Pesan sistem = informasi (mis. "chat dibuka", "konselor bergabung").
    // Dibuat sebagai kartu info, bukan pill, supaya nyaman untuk teks panjang.
    if (message.sender_type === 'system') {
        return (
            <div className="flex justify-center px-2">
                <div className="flex max-w-[90%] items-start gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
                    <Info size={13} className="mt-0.5 shrink-0" />
                    <p className="leading-relaxed break-words whitespace-pre-wrap">
                        {message.message}
                    </p>
                </div>
            </div>
        );
    }

    if (message.sender_type === 'ai') {
        return (
            <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-teal-200 bg-teal-50/60 px-3.5 py-2.5 dark:border-teal-900/50 dark:bg-teal-950/20">
                    <div className="mb-1 flex items-center gap-1.5">
                        <Bot
                            size={13}
                            className="text-teal-600 dark:text-teal-400"
                        />
                        <span className="text-[11px] font-medium text-teal-700 dark:text-teal-400">
                            AI Assistant
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed break-words whitespace-pre-wrap text-foreground">
                        {message.message}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                        {time}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%]">
                {!isOwn && message.sender_name && (
                    <p className="mb-1 px-1 text-[11px] font-medium text-muted-foreground">
                        {message.sender_name}
                    </p>
                )}
                <div
                    className={
                        isOwn
                            ? 'rounded-2xl rounded-tr-sm bg-foreground px-3.5 py-2.5 text-background'
                            : 'rounded-2xl rounded-tl-sm border border-border bg-secondary px-3.5 py-2.5 text-foreground'
                    }
                >
                    <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                        {message.message}
                    </p>
                </div>
                <p
                    className={`mt-1 px-1 text-[10px] text-muted-foreground ${isOwn ? 'text-right' : ''}`}
                >
                    {time}
                </p>
            </div>
        </div>
    );
}

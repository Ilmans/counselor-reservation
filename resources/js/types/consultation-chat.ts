export type ChatSenderType = 'user' | 'counselor' | 'ai' | 'system';

export interface ChatMessage {
    id: number;
    sender_name: string | null;
    sender_type: ChatSenderType;
    message: string;
    created_at: string; // ISO string, mis. "2026-07-10T09:12:00Z"
}



/**
 * Status konsultasi yang membuat chat tersedia (dibuka).
 * Selaras dengan enum "status" di migration consultations:
 * pending_payment | pending_confirmation | confirmed | in_queue | in_progress | completed | cancelled | rejected
 */
export const ACTIVE_CHAT_STATUSES = [
    'confirmed',
    'in_queue',
    'in_progress',
] as const;

export type ActiveChatStatus = (typeof ACTIVE_CHAT_STATUSES)[number];

export function isConsultationChatAvailable(status: string): boolean {
    return (ACTIVE_CHAT_STATUSES as readonly string[]).includes(status);
}

import axios from 'axios';
import { Loader2, MessageCircle, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import ConsultationChatController from '@/actions/App/Http/Controllers/Chat/ConsultationChatController';
import type { ConsultationStatus } from '@/types/consultation';
import { isConsultationChatAvailable } from '@/types/consultation-chat';
import type { ChatMessage, ChatSenderType } from '@/types/consultation-chat';
import ConsultationChatBubble from './bubble-chat';
import ConsultationChatForm from './chat-form';
import ChatHeader from './chat-header';
import { useEcho } from '@laravel/echo-react';
interface ConsultationChatWidgetProps {
    consultationId: number;
    consultationStatus: ConsultationStatus;
    consultationReference: string;
    statusLabel: string;
    currentSenderType: Extract<ChatSenderType, 'user' | 'counselor'>;
    defaultOpen?: boolean;
}

interface ChatIndexResponse {
    messages: ChatMessage[];
    has_more: boolean;
    chat_status: string;
    unread_count: number;
}

export default function ConsultationChatWidget({
    consultationId,
    consultationStatus,
    currentSenderType,
    defaultOpen = false,
    consultationReference,
    statusLabel,
}: ConsultationChatWidgetProps) {
    const [open, setOpen] = useState(defaultOpen);
    const [items, setItems] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);
    const lastIdRef = useRef<number>(0);
    const shouldStickToBottomRef = useRef(true);

    const baseUrl = ConsultationChatController.index.url(consultationId);
    const chatAvailable = isConsultationChatAvailable(consultationStatus);

    const [unreadCount, setUnreadCount] = useState(0);
    const notificationAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        notificationAudioRef.current = new Audio('/ping.mp3');
        notificationAudioRef.current.volume = 0.6;
    }, []);
    // first messageget
    useEffect(() => {
        setLoading(true);

        axios
            .get<ChatIndexResponse>(baseUrl)
            .then((res) => {
                const fetched = res.data.messages ?? [];
                setItems(fetched);
                setHasMore(res.data.has_more ?? false);
                setUnreadCount(res.data.unread_count ?? 0);
                lastIdRef.current = fetched.length
                    ? fetched[fetched.length - 1].id
                    : 0;
            })
            .catch(() => setError('Gagal memuat chat.'))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [consultationId]);

    useEffect(() => {
        const el = scrollRef.current;

        if (el && open && shouldStickToBottomRef.current) {
            el.scrollTop = el.scrollHeight;
        }
    }, [items.length, open]);

    useEcho<{ message: ChatMessage }>(
        `consultation.${consultationId}`,
        '.message.sent',
        (e) => {
            setItems((prev) => {
                const merged = mergeMessages(prev, [e.message]);
                lastIdRef.current = e.message.id;
                return merged;
            });

            if (e.message.sender_type === currentSenderType) {
                return;
            }

            notificationAudioRef.current?.play().catch(() => {});

            setOpen(true);
            setUnreadCount(0);

            axios
                .patch(ConsultationChatController.markRead.url(consultationId))
                .catch(() => {});
        },
    );

    function handleScroll() {
        const el = scrollRef.current;

        if (!el) {
            return;
        }

        shouldStickToBottomRef.current =
            el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    }

    async function handleLoadMore() {
        if (!items.length || loadingMore) {
            return;
        }

        setLoadingMore(true);

        const el = scrollRef.current;
        const prevHeight = el?.scrollHeight ?? 0;

        try {
            const res = await axios.get<ChatIndexResponse>(baseUrl, {
                params: { before_id: items[0].id },
            });
            const older = res.data.messages ?? [];

            if (older.length) {
                setItems((prev) => mergeMessages(prev, older));
            }

            setHasMore(res.data.has_more ?? false);

            // Pertahankan posisi scroll biar tidak "loncat" ke atas.
            requestAnimationFrame(() => {
                if (el) {
                    el.scrollTop = el.scrollHeight - prevHeight;
                }
            });
        } catch {
            setError('Gagal memuat pesan sebelumnya.');
        } finally {
            setLoadingMore(false);
        }
    }

    function handleToggle() {
        setOpen((prev) => {
            const next = !prev;

            if (next) {
                setUnreadCount(0);
                axios
                    .patch(
                        ConsultationChatController.markRead.url(consultationId),
                    )
                    .catch(() => {});
            }

            return next;
        });
    }

    async function handleSend(text: string) {
        const tempId = -Date.now(); // id negatif = pasti tidak bentrok dengan id asli dari server
        const optimistic: ChatMessage = {
            id: tempId,
            sender_type: currentSenderType,
            sender_name: null,
            message: text,
            created_at: new Date().toISOString(),
        };

        shouldStickToBottomRef.current = true;
        setItems((prev) => {
            const next = [...prev, optimistic];

            return next;
        });

        try {
            const res = await axios.post<{ messages: ChatMessage[] }>(
                ConsultationChatController.store.url(consultationId),
                { message: text },
            );
            const serverMessages = res.data.messages ?? [];

            setItems((prev) => {
                const withoutTemp = prev.filter((m) => m.id !== tempId);
                const merged = mergeMessages(withoutTemp, serverMessages);

                return merged;
            });

            if (serverMessages.length) {
                lastIdRef.current =
                    serverMessages[serverMessages.length - 1].id;
            }
        } catch (err) {
            setItems((prev) => prev.filter((m) => m.id !== tempId));

            throw err; // biar ConsultationChatForm bisa tampilkan pesan error & kembalikan draft
        }
    }

    return (
        <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
            {/* Panel */}
            <div
                className={`mb-3 w-[calc(100vw-2rem)] origin-bottom-right sm:w-96 ${
                    open
                        ? 'pointer-events-auto scale-100 opacity-100'
                        : 'pointer-events-none absolute right-0 bottom-0 scale-95 opacity-0'
                } transition-all duration-150 ease-out`}
            >
                <div className="flex h-[28rem] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                    <ChatHeader
                        status={consultationStatus}
                        reference={consultationReference}
                        handleToggle={handleToggle}
                        statusLabel={statusLabel}
                    />

                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
                    >
                        {loading ? (
                            <div className="flex flex-1 items-center justify-center text-muted-foreground">
                                <Loader2 size={18} className="animate-spin" />
                            </div>
                        ) : items.length === 0 ? (
                            <p className="mt-8 text-center text-xs text-muted-foreground">
                                Belum ada pesan. Mulai percakapan di bawah.
                            </p>
                        ) : (
                            <>
                                {hasMore && (
                                    <div className="flex justify-center pb-1">
                                        <button
                                            type="button"
                                            onClick={handleLoadMore}
                                            disabled={loadingMore}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground transition hover:bg-secondary disabled:opacity-50"
                                        >
                                            {loadingMore && (
                                                <Loader2
                                                    size={11}
                                                    className="animate-spin"
                                                />
                                            )}
                                            Muat pesan sebelumnya
                                        </button>
                                    </div>
                                )}
                                {items.map((item) => (
                                    <ConsultationChatBubble
                                        key={item.id}
                                        message={item}
                                        isOwn={
                                            item.sender_type ===
                                            currentSenderType
                                        }
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    <ConsultationChatForm
                        disabled={!chatAvailable}
                        onSend={handleSend}
                    />
                </div>
            </div>

            {/* Tombol mengambang */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleToggle}
                    aria-label={open ? 'Tutup chat' : 'Buka chat'}
                    className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition hover:opacity-90 active:scale-95"
                >
                    {open ? <X size={22} /> : <MessageCircle size={22} />}
                    {!open && unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </button>
            </div>

            {error && (
                <p className="mt-2 text-right text-[11px] text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

/** Gabung tanpa duplikat id, urut naik berdasarkan id. */
function mergeMessages(
    current: ChatMessage[],
    incoming: ChatMessage[],
): ChatMessage[] {
    const existingIds = new Set(current.map((m) => m.id));
    const merged = [
        ...current,
        ...incoming.filter((m) => !existingIds.has(m.id)),
    ];

    return merged.sort((a, b) => a.id - b.id);
}

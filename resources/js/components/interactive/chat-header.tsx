import { X } from 'lucide-react';
import type { ConsultationStatus } from '@/types/consultation';
import { CONSULTATION_STATUS_CLASSES } from '@/types/consultation';
import { Badge } from '../ui/badge';
import { Link } from '@inertiajs/react';

interface Props {
    handleToggle: () => void;
    status: ConsultationStatus;
    reference: string;
    statusLabel: string;
}
function ChatHeader({ handleToggle, status, reference, statusLabel }: Props) {
    return (
        <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
            <div>
                <p className="font-serif text-base text-foreground">
                    Chat Konsultasi |{' '}
                    <Link className="text-xs font-semibold text-foreground">{reference}</Link>
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Sesi aktif -{' '}
                    <Badge
                        variant="solid"
                        className={CONSULTATION_STATUS_CLASSES[status]}
                    >
                        {statusLabel}
                    </Badge>
                </span>
            </div>
            <button
                type="button"
                onClick={handleToggle}
                aria-label="Tutup chat"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
                <X size={16} />
            </button>
        </div>
    );
}

export default ChatHeader;

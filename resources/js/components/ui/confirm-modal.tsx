import { AlertTriangle, LoaderCircle } from 'lucide-react';
import React from 'react';
import Modal from './modal';


interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: React.ReactNode;
    icon?: React.ReactNode;
    cancelLabel?: string;
    confirmLabel?: string;
    variant?: 'danger' | 'default';
    processing?: boolean;
}

function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title,
    description,
    icon = <AlertTriangle size={16} />,
    cancelLabel = 'Batal',
    confirmLabel = 'Ya, lanjutkan',
    variant = 'danger',
    processing = false,
}: ConfirmModalProps) {
    return (
        <Modal
            open={open}
            onClose={processing ? () => {} : onClose}
        >
            <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
                    {icon}
                </span>

                <div>
                    <p className="text-sm font-semibold text-foreground">
                        {title}
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex gap-2">
                <button
                    type="button"
                    disabled={processing}
                    onClick={onClose}
                    className="flex-1 rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {cancelLabel}
                </button>

                <button
                    type="button"
                    disabled={processing}
                    onClick={onConfirm}
                    className={`flex-1 rounded-full px-4 py-2.5 text-xs font-semibold text-white transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${
                        variant === 'danger'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-primary hover:bg-primary/90'
                    }`}
                >
                    <span className="flex items-center justify-center gap-2">
                        {processing && (
                            <LoaderCircle
                                size={14}
                                className="animate-spin"
                            />
                        )}

                        {confirmLabel}
                    </span>
                </button>
            </div>
        </Modal>
    );
}

export default ConfirmModal;

import React, { useEffect, useRef, useState } from 'react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    closeOnBackdrop?: boolean;
    className?: string;
}

function Modal({ open, onClose, children, closeOnBackdrop = true, className = '' }: ModalProps) {
    const [shouldRender, setShouldRender] = useState(open);
    const [visible, setVisible] = useState(false);
    
    const closeTimeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (open) {
            setShouldRender(true);
            // tunggu satu frame biar browser sempat paint state awal (opacity-0)
            // sebelum ditransisikan ke opacity-100, kalau tidak transisinya di-skip
            const raf = requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
            return () => cancelAnimationFrame(raf);
        }

        setVisible(false);
        closeTimeout.current = setTimeout(() => setShouldRender(false), 300);
        return () => clearTimeout(closeTimeout.current);
    }, [open]);

    useEffect(() => {
        if (!open) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    useEffect(() => {
        if (!shouldRender) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [shouldRender]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 transition-opacity duration-300 sm:items-center sm:p-4 ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => {
                if (closeOnBackdrop && e.target === e.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                className={`w-full max-w-sm rounded-t-2xl bg-card p-5 transition-all duration-300 ease-out sm:rounded-2xl ${className} ${
                    visible
                        ? 'translate-y-0 opacity-100 sm:scale-100'
                        : 'translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;

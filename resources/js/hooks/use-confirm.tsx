import ConfirmModal from '@/components/ui/confirm-modal';
import React, { useState } from 'react';

type ConfirmVariant = 'danger' | 'default';

interface ConfirmOptions {
    title: string;
    description: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ConfirmVariant;
    onConfirm: () => void | Promise<void>;
}

export function useConfirm() {
    const [options, setOptions] = React.useState<ConfirmOptions | null>(null);
    const [processing, setProcessing] = useState(false);
    const [open, setOpen] = React.useState(false);

    const confirm = (options: ConfirmOptions) => {
        setOptions(options);
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
        setTimeout(() => {
            setOptions(null);
        }, 200);
    };

    const handleConfirm = async () => {
        if (!options) return;

        await options.onConfirm();
        close();
    };

    const ConfirmDialog = () => (
        <ConfirmModal
            open={open}
            processing={processing}
            onClose={close}
            onConfirm={handleConfirm}
            title={options?.title ?? ''}
            description={options?.description ?? ''}
            confirmLabel={options?.confirmLabel}
            cancelLabel={options?.cancelLabel}
            variant={options?.variant}
        />
    );

    return {
        confirm,
        ConfirmDialog,
        setProcessing,
    };
}

import { Copy } from 'lucide-react';

function CopyButton({ value, label }: { value: string; label: string }) {
    return (
        <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(value)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
            <Copy size={12} /> {label}
        </button>
    );
}

export default CopyButton;

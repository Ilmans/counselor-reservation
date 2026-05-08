import { AlertCircle } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export function  Input  ({
    label,
    error,
    hint,
    className = '',
    ...props
}: InputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-500">
                    {label}
                </label>
            )}
            <input
                className={[
                    'w-full rounded-lg border bg-white px-3 py-2 text-[13px] text-zinc-900 placeholder-zinc-400 transition-colors outline-none',
                    'focus:border-zinc-400',
                    'dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600',
                    error
                        ? 'border-red-400 dark:border-red-800'
                        : 'border-zinc-200 dark:border-zinc-800 dark:focus:border-zinc-600',
                    className,
                ].join(' ')}
                {...props}
            />
            {error && (
                <span className="flex items-center gap-1 text-[11px] text-red-500 dark:text-red-400">
                    <AlertCircle className="size-3 font-medium" />
                    {error}
                </span>
            )}
            {hint && !error && (
                <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                    {hint}
                </span>
            )}
        </div>
    );
};

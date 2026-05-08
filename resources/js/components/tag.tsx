

function Tag({ children }: any) {
    return (
        <span className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800 dark:text-zinc-500">
            {children}
        </span>
    );
}

export default Tag;

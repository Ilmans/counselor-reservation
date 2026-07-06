const StatCard = ({ icon: Icon, label, value, hint }: any) => {
    return (
        <div
            className="flex flex-col gap-3 rounded-2xl p-4 md:p-5"
            style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
            }}
        >
            <div className="flex items-center justify-between">
                <span
                    className="text-[10px] font-semibold tracking-wider uppercase"
                    style={{ color: 'var(--muted-foreground)' }}
                >
                    {label}
                </span>
                <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{
                        backgroundColor: 'var(--secondary)',
                        color: 'var(--secondary-foreground)',
                    }}
                >
                    <Icon size={14} strokeWidth={2.2} />
                </div>
            </div>
            <div>
                <span
                    style={{
                        fontFamily: "'Fraunces', serif",
                        color: 'var(--foreground)',
                    }}
                    className="text-2xl md:text-3xl"
                >
                    {value}
                </span>
            </div>
            {hint && (
                <span
                    className="text-xs"
                    style={{ color: 'var(--muted-foreground)' }}
                >
                    {hint}
                </span>
            )}
        </div>
    );
};

export default StatCard;

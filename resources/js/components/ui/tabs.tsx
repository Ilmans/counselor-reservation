import { createContext, ReactNode, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextValue {
    value: string;
    setValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string) {
    const ctx = useContext(TabsContext);
    if (!ctx) {
        throw new Error(`${component} must be used within <Tabs>`);
    }
    return ctx;
}

interface TabsProps {
    defaultValue: string;
    children: ReactNode;
    className?: string;
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
    const [value, setValue] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ value, setValue }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

interface TabsListProps {
    children: ReactNode;
    className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
    return (
        <div
            role="tablist"
            className={cn(
                'flex flex-wrap gap-1 overflow-x-auto border-b border-border',
                className,
            )}
        >
            {children}
        </div>
    );
}

interface TabsTriggerProps {
    value: string;
    children: ReactNode;
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
    const { value: activeValue, setValue } = useTabsContext('TabsTrigger');
    const isActive = activeValue === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setValue(value)}
            className={cn(
                'relative whitespace-nowrap px-4 py-2.5 text-[13px] font-medium transition-colors',
                isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
            )}
        >
            {children}
            {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
            )}
        </button>
    );
}

interface TabsContentProps {
    value: string;
    children: ReactNode;
}

export function TabsContent({ value, children }: TabsContentProps) {
    const { value: activeValue } = useTabsContext('TabsContent');
    if (activeValue !== value) return null;

    return <div className="pt-5">{children}</div>;
}

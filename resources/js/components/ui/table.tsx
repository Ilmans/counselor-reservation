import { createContext, useContext, type ReactNode } from 'react';

const SectionContext = createContext<'head' | 'body'>('body');

function Table({ children }: { children: ReactNode }) {
    return (
        <div className="overflow-x-auto   bg-card">
            <table className="w-full text-left text-[13px]">{children}</table>
        </div>
    );
}

function Head({ children }: { children: ReactNode }) {
    return (
        <SectionContext.Provider value="head">
            <thead className="sticky top-0 z-10 border-b-2 border-primary/15 bg-gradient-to-b from-muted to-muted/60 text-[11px] font-semibold tracking-[0.06em] text-foreground/70 uppercase backdrop-blur-sm">
                {children}
            </thead>
        </SectionContext.Provider>
    );
}

function Body({ children }: { children: ReactNode }) {
    return (
        <SectionContext.Provider value="body">
            <tbody>{children}</tbody>
        </SectionContext.Provider>
    );
}

function Row({ children }: { children: ReactNode }) {
    const section = useContext(SectionContext);

    return (
        <tr className={section === 'body' ? 'border-b border-border last:border-0 even:bg-muted/25' : ''}>
            {children}
        </tr>
    );
}

function Cell({
    children,
    align = 'left',
    colSpan = 1,
}: {
    children: ReactNode;
    align?: 'left' | 'right' | 'center';
}) {
    const section = useContext(SectionContext);
    const Tag = section === 'head' ? 'th' : 'td';
    const alignClass = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

    return (
        <Tag colSpan={colSpan} className={`px-4 py-3 ${alignClass} ${section === 'body' ? 'text-foreground/80' : ''}`}>
            {children}
        </Tag>
    );
}

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

export { Table };

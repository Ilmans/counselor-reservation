import { Link } from '@inertiajs/react';

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type Props = {
    items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: Props) {
    return (
        <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-zinc-400 dark:text-zinc-600">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                
                return (
                    <span key={index} className="flex items-center gap-1.5">
                        {index > 0 && <span>/</span>}
                        {isLast || !item.href ? (
                            <span className="text-zinc-600 dark:text-zinc-400">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="hover:text-zinc-600 dark:hover:text-zinc-400"
                            >
                                {item.label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}

import React from 'react';

function DashboardTitle({ title, desc }: any) {
    return (
        <div>
            <h1 className="font-serif text-xl text-foreground sm:text-2xl">
                {title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
        </div>
    );
}

export default DashboardTitle;

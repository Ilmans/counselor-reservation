import { usePage } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';


function Greeting() {
    const { app, auth } = usePage().props;

    return (
        <div>
            <p
                className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: 'var(--primary)' }}
            >
                <Sparkles size={12} /> Ruang Konselor
            </p>
            <h1
                style={{ fontFamily: "'Fraunces', serif" }}
                className="text-2xl md:text-3xl"
            >
                {app.greeting}, {auth.user.name}
            </h1>
        </div>
    );
}

export default Greeting;

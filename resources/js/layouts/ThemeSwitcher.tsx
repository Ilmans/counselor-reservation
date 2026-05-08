import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";


function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
            <Sun
                size={15}
                strokeWidth={1.6}
                className="absolute scale-100 rotate-0 transition-all duration-200 dark:scale-0 dark:-rotate-90"
            />
            <Moon
                size={15}
                strokeWidth={1.6}
                className="absolute scale-0 rotate-90 transition-all duration-200 dark:scale-100 dark:rotate-0"
            />
        </button>
    );
}

export default ThemeSwitcher;

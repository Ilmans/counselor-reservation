import { ThemeProvider } from '@/providers/theme-provider';
import Footer from './footer';
import Header from './header';

const Wrapper = ({ main }: any) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="mx-auto max-w-6xl flex min-h-screen flex-col bg-background text-foreground">
                <Header />
                <div className="flex-1">{main}</div>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Wrapper;

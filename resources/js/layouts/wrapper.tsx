import Footer from './footer';
import Header from './header';
import { ThemeProvider } from '@/providers/theme-provider';

const Wrapper = ({ main }: any) => {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Header />
                {main}
                <Footer />
            </ThemeProvider>
        </>
    );
};

export default Wrapper;

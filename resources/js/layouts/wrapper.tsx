import { Theme, ThemePanel } from '@radix-ui/themes';
import Footer from './footer';
import Header from './header';

const Wrapper = ({ main }) => {
    return (
        <>
            <Theme>
                <Header />
                {main}
                <Footer />
            </Theme>
        </>
    );
};

export default Wrapper;

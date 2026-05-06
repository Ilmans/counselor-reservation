import Footer from './footer';
import Header from './header';

const Wrapper = ({ main }: any) => {
    return (
        <>
            <Header />
            {main}
            <Footer />
        </>
    );
};

export default Wrapper;

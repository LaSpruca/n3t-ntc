import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Home: NextPage = () => {
    const Map = dynamic(() => import('../components/Map'), {
        // @ts-ignore
        loading: () => 'Loading...',
        ssr: false,
    });

    return (
        <>
            <style jsx>{``}</style>
            <div className="app">
                <Map />
            </div>
        </>
    );
};

export default Home;

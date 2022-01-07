import type { GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import MapLoading from '$components/MapLoading';
import mapboxgl from 'mapbox-gl';
import { useContext } from 'react';
import AuthContext from '$components/contexts/AuthContext';

interface Props {
    mb_key: string;
    api_url: string;
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            mb_key: process.env.MAPBOX_KEY,
            api_url: process.env.API_URL,
        },
    };
};

const Map: NextPage<Props> = ({ mb_key, api_url }: Props) => {
    mapboxgl.accessToken = mb_key;
    const { setApiUrl } = useContext(AuthContext);
    setApiUrl(api_url);

    // Load the map client side only to avoid... issues
    const Map = dynamic(() => import('../components/Map'), {
        // @ts-ignore
        loading: () => <MapLoading />,
        ssr: false,
    });

    return (
        <div className="app">
            <Map />
        </div>
    );
};

export default Map;

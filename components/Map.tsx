import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY ?? '';

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const [lng, setLng] = useState(173);
    const [lat, setLat] = useState(-41);
    const [zoom, setZoom] = useState(5);

    // Initialize map when component mounts
    useEffect(() => {
        if (mapContainerRef.current !== null) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom,
            });

            // Add navigation control (the +/- zoom buttons)
            map.addControl(new mapboxgl.NavigationControl(), 'top-right');

            map.on('move', () => {
                setLng(parseFloat(map.getCenter().lng.toFixed(4)));
                setLat(parseFloat(map.getCenter().lat.toFixed(4)));
                setZoom(parseFloat(map.getZoom().toFixed(2)));
            });

            // Clean up on unmount
            return () => map.remove();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <style lang="scss" jsx>
                {`
                    .map-container {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        width: 100%;
                        z-index: -1;
                        pointer-events: all;
                    }
                `}
            </style>

            <div>
                <div className="map-container" ref={mapContainerRef} />
            </div>
        </>
    );
};

export default Map;

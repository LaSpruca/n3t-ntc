import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { GeoJsonObject } from 'geojson'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY ?? '';

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const [lng, setLng] = useState(173);
    const [lat, setLat] = useState(-41);
    const [zoom, setZoom] = useState(5);
    const [points, setPoints] = useState<GeoJsonObject[]>([]);

    useEffect(() => {
        fetch('/api/get-points')
            .then(async (res) => {
                setPoints(await res.json());
            })
            .catch((ex) => {
                console.error('Could not fetch points', points);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Initialize map when component mounts
    useEffect(() => {
        if (mapContainerRef.current !== null) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/laspruca/ckxpk8yvk112814mo1wenbeyg',
                center: [lng, lat],
                zoom: zoom,
            });

            // Add navigation control (the +/- zoom buttons)
            map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

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
                        padding: 1rem;
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

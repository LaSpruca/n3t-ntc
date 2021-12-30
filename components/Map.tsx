import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { AnySourceData, Marker } from 'mapbox-gl';
import {
    Feature,
    FeatureCollection,
    GeoJsonProperties,
    Geometry,
} from 'geojson';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY ?? '';

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const [lng, setLng] = useState(173);
    const [lat, setLat] = useState(-41);
    const [zoom, setZoom] = useState(5);
    const [points, setPoints] = useState<null>(null);
    const [map, setMap] = useState<null | mapboxgl.Map>(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [currentPoint, setCurrentPoint] = useState<number | null>(null);
    const [firstLoad, setFirstLoad] = useState(true);

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

            // Stash the map away for later
            map.on('load', () => {
                map.loadImage(
                    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                    (error, image) => {
                        if (error) throw error;
                        if (!image) return;

                        map.addImage('c-marker', image);

                        setImageLoaded(true);
                    }
                );

                setMap(map);
            });

            // Add navigation control (the +/- zoom buttons)
            map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

            map.on('move', () => {
                setLng(parseFloat(map.getCenter().lng.toFixed(4)));
                setLat(parseFloat(map.getCenter().lat.toFixed(4)));
                setZoom(parseFloat(map.getZoom().toFixed(2)));
            });

            // Clean up on unmount
            return () => {
                setMap(null);
                map.remove();
            };
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (map && imageLoaded && points) {
            // for (const point of points.features) {
            //     const marker = new mapboxgl.Marker({
            //         color: '#fff',
            //         draggable: false,
            //     }).setLngLat();
            // }

            setFirstLoad(false);
        }
    }, [map, points, imageLoaded]);

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

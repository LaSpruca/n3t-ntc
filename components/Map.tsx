import React, { useContext, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Loading, Notify } from 'notiflix';
import styles from '$styles/components/Map.module.scss';
import AuthContext from '$components/contexts/AuthContext';
import { Site } from '$lib/api/Site';

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { fetchPrivileged } = useContext(AuthContext);

    const [lng, setLng] = useState(173);
    const [lat, setLat] = useState(-41);
    const [zoom, setZoom] = useState(5);
    const [stations, setStations] = useState<Site[] | null>(null);
    const [map, setMap] = useState<null | mapboxgl.Map>(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [currentPoint, setCurrentPoint] = useState<number | null>(null);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        Loading.pulse('Loading map points', {
            messageID: 'loadingPoints',
        });
        fetchPrivileged({
            url: '/sites',
            params: {},
            method: 'GET',
        })
            .then(async (res) => {
                if (res.status === 200) {
                    setStations(await res.json());
                    Notify.info('Loaded points');
                    Loading.remove();
                } else {
                    Loading.remove();
                    Notify.failure(
                        'Could not load points, Error: ' + res.status
                    );
                }
            })
            .catch((ex) => {
                Loading.remove();
                Notify.failure('Could not get points, Error: ', ex.status);
                console.error('Could not fetch points', stations);
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
                Loading.remove();
                setMap(null);
                map.remove();
            };
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (map && imageLoaded && stations) {
            for (const station of stations) {
                const marker = new mapboxgl.Marker({
                    color: '#fff',
                    draggable: false,
                })
                    .setLngLat([station.lon, station.lat])
                    .on('click', () => {
                        console.log('Clicked on ', station);
                    })
                    .addTo(map);
            }

            setFirstLoad(false);
        }
    }, [map, stations, imageLoaded]);

    return (
        <div>
            <div className={styles.mapContainer} ref={mapContainerRef} />
        </div>
    );
};

export default Map;

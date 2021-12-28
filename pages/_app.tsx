import type { AppProps } from 'next/app';
import Head from 'next/head';
import SideBar from '../components/SideBar';
import React, { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pages, { pageMap, floatingSideBarPages } from '$lib/pages';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const sbRef = createRef<HTMLDivElement>();
    const page = pageMap[router.route] ?? Pages.NotFound;
    const [contentMargin, setContentMargin] = useState(0);

    // Used to resize the margin for the main consent to stop it overlapping (or being overlapped by) the sidebar
    // Defined here to allow the sidebar to call it when it resizes
    const calcMargin = () => {
        console.log('Resizing app');
        if (!(page in floatingSideBarPages)) {
            setContentMargin(sbRef.current?.clientWidth ?? 0);
        } else {
            setContentMargin(0);
        }
    };

    // Update the margin on page change, once we have the reference to the sidebar
    useEffect(calcMargin, [page, sbRef]);

    return (
        <>
            <Head>
                <title>N3T NTC | Map View</title>
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
                    rel="stylesheet"
                />
            </Head>

            <style global jsx>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                    pointer-events: none;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                * {
                    margin: 0;
                    box-sizing: border-box;
                }
            `}</style>

            <style jsx>{`
                .app-content {
                    margin-left: ${contentMargin}px;
                    pointer-events: all;
                }
            `}</style>

            <SideBar currentPage={page} ref={sbRef} resized={calcMargin} />

            <div className="app-content">
                <Component {...pageProps} />
            </div>
        </>
    );
}

export default MyApp;

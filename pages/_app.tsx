import type { AppProps } from 'next/app';
import Head from 'next/head';
import SideBar, { Pages } from '../components/SideBar';
import React, { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const [page, setPage] = useState(Pages.Home);

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

            <SideBar currentPage={page} />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;

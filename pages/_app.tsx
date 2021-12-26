import type { AppProps } from 'next/app';
import Head from 'next/head';
import SideBar, { Pages } from '../components/SideBar';
import React, { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const [page, setPage] = useState(Pages.Home);

    return (
        <>
            <Head>
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
                }

                .__next {
                    width: max-content;
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

                .side-bar {
                    margin: 2.5rem 0 0 2.5rem;
                    padding: 1rem;
                    height: calc(100vh - 5rem);
                    width: fit-content;
                    background-color: #ddffdd;
                    pointer-events: all;
                }
            `}</style>

            <div className="side-bar">
                <SideBar currentPage={page} />
            </div>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;

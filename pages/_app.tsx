import type { AppProps } from 'next/app';
import Head from 'next/head';
import SideBar from '../components/SideBar';
import React, { createRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pages, { pageMap, floatingSideBarPages, pageTitle } from '$lib/pages';
import { AuthContext, AuthState } from '$components/contexts/AuthContext';
import useSessionStorage from '$lib/hooks/useSessionStorage';

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const sbRef = createRef<HTMLDivElement>();
    const page = pageMap[router.route] ?? Pages.NotFound;
    const [contentMargin, setContentMargin] = useState(0);

    const storedAuth = useSessionStorage('authState', {
        loggedIn: false,
    });

    const [loggedIn, setLoggedIn] = useState(storedAuth.loggedIn);

    const [authState, setAuthState] = useState<AuthState>({
        loggedIn,
        login: () => {
            setLoggedIn(true);
        },
        logout: () => {
            setLoggedIn(false);
        },
    });

    useEffect(() => {
        console.log('Update?');
        setAuthState({
            ...authState,
            loggedIn,
        });

        if (!loggedIn) {
            router.push('/').catch((ex) => console.error(ex));
        }
    }, [loggedIn, router]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log('brrrr');
        sessionStorage.setItem('authState', JSON.stringify(authState));
    }, [authState]);

    // Used to resize the margin for the main consent to stop it overlapping (or being overlapped by) the sidebar
    // Defined here to allow the sidebar to call it when it resizes
    const calcMargin = () => {
        if (!(page in floatingSideBarPages)) {
            setContentMargin(sbRef.current?.clientWidth ?? 0);
        } else {
            setContentMargin(0);
        }
    };

    // Update the margin on page change, once we have the reference to the sidebar
    useEffect(calcMargin, [page, sbRef]);

    return (
        <AuthContext.Provider value={authState}>
            <Head>
                <title>N3T NTC | {pageTitle[page]}</title>
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

            {page !== Pages.Home ? (
                <SideBar currentPage={page} ref={sbRef} resized={calcMargin} />
            ) : (
                ''
            )}

            <div className="app-content">
                <Component {...pageProps} />
            </div>
        </AuthContext.Provider>
    );
}

export default App;

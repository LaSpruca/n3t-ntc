import type {AppProps} from 'next/app';
import Head from 'next/head';
import SideBar from '../components/SideBar';
import React, {createRef, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Pages, {floatingSideBarPages, pageMap, pageTitle} from '$lib/pages';
import AuthContext, {useAuthContext} from '$components/contexts/AuthContext';
import '../styles/global.scss';
import styles from '../styles/pages/_app.module.scss';
import nz from 'date-fns/locale/en-NZ';
import {registerLocale, setDefaultLocale} from "react-datepicker";

/**
 * Map "layout" of the app, setup state and adds sidebar, makes sure that the
 * user is logged in etc.
 * @param Component The child component to be rendered
 * @param pageProps The props passed to the page
 * @param env The environment variables loaded at runtime
 * @constructor
 */
function App({Component, pageProps}: AppProps) {
    // Set the default locale to the NZ locale
    registerLocale('nz', nz);
    setDefaultLocale('nz');

    // Get the router
    const router = useRouter();

    // Ref to the sidebar
    const sbRef = createRef<HTMLDivElement>();
    // How much margin should be added to page to account for sidebar
    const [contentMargin, setContentMargin] = useState(0);

    // Current page as Paags enum, for lookups
    const page = pageMap[router.route] ?? Pages.NotFound;

    // Used to resize the margin for the main consent to stop it overlapping
    // (or being overlapped by) the sidebar. Defined here to allow the SideBar
    // component to call it when it resizes
    const calcMargin = () => {
        if (!(page in floatingSideBarPages)) {
            setContentMargin(sbRef.current?.clientWidth ?? 0);
        } else {
            setContentMargin(0);
        }
    };

    // Update the margin on page change, once we have the reference to the
    // sidebar or when the page changes
    useEffect(calcMargin, [page, sbRef]);

    // Generate the AuthContext objects
    const [authState, authStateReady] = useAuthContext();

    // Redirect if not logged in and not on login page, or if they are logged in, send 'em to the map page
    useEffect(() => {
        console.log(authState);
        if (typeof window !== "undefined") {
            if (
                (!("accessToken" in authState) || authState.accessToken === '')
            ) {
                if (page !== Pages.Home) {
                    router.push('/').catch((ex) => {
                        throw ex;
                    });
                }
            } else if (page === Pages.Home) {
                router.push('/map').catch((ex) => {
                    throw ex;
                });
            }
        }
    }, [authStateReady]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AuthContext.Provider value={authState}>
            <Head>
                <title>N3T NTC | {pageTitle[page]}</title>
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
                    rel="stylesheet"
                />
            </Head>
            {/* Don't display the sidebar if on the Home page (login) */}
            {page !== Pages.Home ? (
                <SideBar currentPage={page} ref={sbRef} resized={calcMargin}/>
            ) : (
                ''
            )}

            <div
                className={styles.appContent}
                style={
                    // Add the previously mentioned margin to accommodate the
                    // sidebar
                    {marginLeft: `${contentMargin}px`}
                }
            >
                <Component {...pageProps} />
            </div>
        </AuthContext.Provider>
    );
}

export default App;

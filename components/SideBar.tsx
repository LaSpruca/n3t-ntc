import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import {
    AccountCircleOutlined,
    InfoOutlined,
    MapOutlined,
    Menu,
    PictureAsPdfOutlined,
} from '@mui/icons-material';
import Image from 'next/image';
import N3TLogo from '$assets/images/logo_n3t.png';
import Link from 'next/link';
import Pages, { floatingSideBarPages } from '$lib/pages';
import { UI_PRIMARY } from '$lib/colors';

export type SideBarProps = {
    currentPage: Pages;
    resized: () => void;
};

const SideBar = forwardRef(function SideBarComponent(
    { currentPage, resized }: SideBarProps,
    ref: ForwardedRef<HTMLDivElement>
) {
    const [expanded, setExpanded] = useState(false);
    // Used to decide weather the sidebar should be floating
    const floating = floatingSideBarPages.includes(currentPage);

    const expandToggle = () => {
        setExpanded(!expanded);
    };

    // Call resized callback to tell the parent component that the widget has resized
    useEffect(() => {
        if (!floating) {
            resized();
        }
    }, [expanded, floating]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <style jsx>
                {`
                    .sidebar {
                        position: fixed;
                        left: 0;
                        top: 0;
                        border-radius: 0 10px 10px 0;
                        pointer-events: all;
                        background-color: ${UI_PRIMARY};
                        padding: 1rem;
                        height: 100vh;
                        width: max-content;
                        display: flex;
                        flex-direction: column;
                        gap: 5%;
                        transition: left 200ms ease-in-out,
                            top 200ms ease-in-out, height 200ms ease-in-out,
                            border-radius 200ms ease-in-out;

                        box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.5);

                        &--floating {
                            height: calc(100vh - 5rem);
                            left: 2.5rem;
                            top: 2.5rem;
                            border-radius: 10px;
                        }

                        &__logo {
                            width: 48px;
                            border-radius: 10px;
                            overflow: hidden;
                        }

                        &__section {
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            gap: 1em;
                            justify-content: center;

                            &--small {
                                height: 20%;
                            }

                            &--large {
                                flex-grow: 2;
                            }
                        }

                        &--expanded {
                            .nav-button {
                                width: 100%;
                                display: flex;
                                gap: 0.5rem;

                                &__text {
                                    display: initial;
                                    text-align: left;
                                    flex-grow: 1;
                                    padding-right: 0.5rem;
                                }
                            }
                        }
                    }

                    .nav-button {
                        padding: 5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px;
                        border: none;
                        background-color: white;
                        transition: width 200ms ease-in-out;

                        &:active {
                            outline: none;
                        }

                        &__icon {
                            width: 24px;
                            height: 24px;
                        }

                        &__text {
                            display: none;
                        }
                    }
                `}
            </style>

            <div
                className={
                    'sidebar ' +
                    (expanded ? 'sidebar--expanded ' : '') +
                    (floating ? 'sidebar--floating' : '')
                }
                ref={ref}
            >
                <div className="sidebar__section sidebar__section--small">
                    <div className="sidebar__logo">
                        <Image src={N3TLogo} alt="N3T Logo" />
                    </div>
                    <button onClick={expandToggle} className="nav-button">
                        <Menu className="nav-button__icon" />
                        <span className="nav-button__text">Collapse</span>
                    </button>
                </div>

                <nav className="sidebar__section sidebar__section--large">
                    <Link href="/map">
                        <a className="nav-button">
                            <MapOutlined className="nav-button__icon" />
                            <span className="nav-button__text">Map</span>
                        </a>
                    </Link>
                    <Link href="/report">
                        <a className="nav-button">
                            <PictureAsPdfOutlined className="nav-button__icon" />
                            <span className="nav-button__text">
                                Download Report
                            </span>
                        </a>
                    </Link>
                    <Link href="/docs">
                        <a className="nav-button">
                            <InfoOutlined className="nav-button__icon" />
                            <span className="nav-button__text">User Docs</span>
                        </a>
                    </Link>
                </nav>

                <div className="sidebar__section sidebar__section--small">
                    <button className="nav-button">
                        <AccountCircleOutlined className="nav-button" />
                        <span className="nav-button__text">Account</span>
                    </button>
                </div>
            </div>
        </>
    );
});

export default SideBar;

import React from 'react';
import {
    AccountCircleOutlined,
    InfoOutlined,
    MapOutlined,
    Menu,
    PictureAsPdfOutlined,
} from '@mui/icons-material';
import { UI_PRIMARY } from '$lib/colors';
import Image from 'next/image';
import N3TLogo from '$assets/images/logo_n3t.png';

export enum Pages {
    Home,
}

export type SideBarProps = {
    currentPage: Pages;
};

const SideBar = ({}: SideBarProps) => {
    const expandToggle = () => {};

    return (
        <>
            {/* Component scoped styles */}
            <style jsx>
                {`
                    .sidebar {
                        border-radius: 10px;
                        pointer-events: all;
                        background-color: ${UI_PRIMARY};
                        padding: 1rem;
                        margin: 2.5rem 0 0 2.5rem;
                        height: calc(100vh - 5rem);
                        width: max-content;
                        display: flex;
                        flex-direction: column;
                        gap: 5%;

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
                    }

                    .nav-button {
                        padding: 5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 10px;
                        border: none;
                        background-color: white;

                        &:active {
                            outline: none;
                        }

                        &__icon {
                            width: 24px;
                            height: 24px;
                        }
                    }
                `}
            </style>
            <div className="sidebar">
                <div className="sidebar__section sidebar__section--small">
                    <div className="sidebar__logo">
                        <Image src={N3TLogo} alt="N3T Logo" />
                    </div>
                    <button onClick={expandToggle} className="nav-button">
                        <Menu className="nav-button__icon" />
                    </button>
                </div>

                <nav className="sidebar__section sidebar__section--large">
                    <button className="nav-button">
                        <MapOutlined className="nav-button__icon" />
                    </button>
                    <button className="nav-button">
                        <PictureAsPdfOutlined className="nav-button__icon" />
                    </button>
                    <button className="nav-button">
                        <InfoOutlined className="nav-button__icon" />
                    </button>
                </nav>

                <div className="sidebar__section sidebar__section--small">
                    <button className="nav-button">
                        <AccountCircleOutlined className="nav-button" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default SideBar;

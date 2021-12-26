import React from 'react';
import { Menu } from '@mui/icons-material';

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
            <style jsx>
                {`
                    .sidebar {
                        width: 100%;
                        height: 100%;
                    }

                    .nav-button {
                        padding: 5px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &__icon {
                            width: 12px;
                            height: 12px;
                        }
                    }
                `}
            </style>
            <div className="sidebar">
                <div className="logo">
                    <button onClick={expandToggle} className="nav-button">
                        <Menu className="nav-button__icon" />
                    </button>
                </div>
                <nav></nav>
            </div>
        </>
    );
};

export default SideBar;

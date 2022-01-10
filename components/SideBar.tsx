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
import styles from '../styles/components/SideBar.module.scss';

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
        <div
            className={`${styles.sidebar} ${
                expanded ? styles.sidebarExpanded : ''
            } ${floating ? styles.sidebarFloating : ''}`}
            ref={ref}
        >
            <div
                className={`${styles.sidebar__section} ${styles.sidebar__sectionSmall}`}
            >
                <div className={styles.sidebar__logo}>
                    <Image src={N3TLogo} alt="N3T Logo" />
                </div>
                <button onClick={expandToggle} className={styles.navButton}>
                    <Menu className={styles.navButton__icon} />
                    <span className={styles.navButton__text}>Collapse</span>
                </button>
            </div>

            <nav
                className={`${styles.sidebar__section} ${styles.sidebar__sectionLarge}`}
            >
                <Link href="/map">
                    <a className={styles.navButton}>
                        <MapOutlined className={styles.navButton__icon} />
                        <span className={styles.navButton__text}>Map</span>
                    </a>
                </Link>
                <Link href="/report">
                    <a className={styles.navButton}>
                        <PictureAsPdfOutlined
                            className={styles.navButton__icon}
                        />
                        <span className={styles.navButton__text}>
                            Download Report
                        </span>
                    </a>
                </Link>
                <Link href="/docs">
                    <a className={styles.navButton}>
                        <InfoOutlined className={styles.navButton__icon} />
                        <span className={styles.navButton__text}>
                            User Docs
                        </span>
                    </a>
                </Link>
            </nav>

            <div
                className={`${styles.sidebar__section} ${styles.sidebar__sectionSmall}`}
            >
                <button className={styles.navButton}>
                    <AccountCircleOutlined className={styles.navButton__icon} />
                    <span className={styles.navButton__text}>Account</span>
                </button>
            </div>
        </div>
    );
});

export default SideBar;

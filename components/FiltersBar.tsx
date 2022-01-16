import React, {ForwardedRef, forwardRef, useCallback, useRef, useState} from "react";
import styles from "$styles/components/FiltersBar.module.scss";
import Filter from "@mui/icons-material/FilterAlt";
import Close from "@mui/icons-material/CloseOutlined"
import ReactDatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import {subMonths, format} from "date-fns";
import "react-datepicker/dist/react-datepicker.min.css";
import regions from "$lib/regions";
import ExpandCheckboxInput from "$components/ExpandCheckboxInput";

export interface UpdateFilters {
    startDate?: Date;
    endDate?: Date;
}

export interface FiltersBarProps {
    updateFilters: (filters: UpdateFilters) => void
}

const FiltersBarInner = ({}: FiltersBarProps, ref: ForwardedRef<(coords: [number, number]) => void>) => {
    const now = new Date();

    const [startDate, setStartDate] = useState<Date | null>(now);
    const [endDate, setEndDate] = useState<Date | null>(subMonths(now, 1));

    const filtersRef = useRef<HTMLDivElement>(null);

    if (ref && typeof ref == "object") {
        ref.current = ([mx, my]) => {
            if (filtersRef.current) {
                let {x, y, width, height} = filtersRef.current.getBoundingClientRect();
                if (mx < x || mx > x + width || my < y || my > y + height)
                    filtersRef.current.className = `${styles.filters}`;
            }
        };
    }

    const showFilters = useCallback(() => {
        if (filtersRef.current) {
            console.log("expanding")
            filtersRef.current.className = `${styles.filters} ${styles.filtersExapnded}`;
        }
    }, [filtersRef]);

    return (
        <div className={styles.filters} ref={filtersRef}>
            <button
                onClick={showFilters}
                className={styles.filters__expandButton}
            >
                <Filter className={styles.filters__icon}/>
                <span className={styles.filters__text}>Filters</span>
            </button>

            <div className={styles.filters__content}>
                <button className={styles.filters__collapseButton} onClick={() => {
                    if (filtersRef.current)
                        filtersRef.current.className = styles.filters;
                }}>
                    <Close/>
                </button>

                <h1>Filters</h1>
                <div className={styles.filters__content__filter}>
                    <label htmlFor="start-date">Start date</label>
                    <ReactDatePicker onChange={(startDate) => setStartDate(startDate)}
                                     value={startDate ? format(startDate, "do MMM, yyyy") : ""} name="start-date"
                                     className={styles.filters__content__filterDate}
                                     wrapperClassName={styles.filters__content__filterDateWrapper}
                                     dateFormat={"do MMM, yyyy"}/>
                </div>

                <div className={styles.filters__content__filter}>
                    <label htmlFor="start-date">End date</label>
                    <ReactDatePicker onChange={(startDate) => setStartDate(startDate)}
                                     value={startDate ? format(startDate, "do MMM, yyyy") : ""} name="start-date"
                                     className={styles.filters__content__filterDate}
                                     wrapperClassName={styles.filters__content__filterDateWrapper}
                                     dateFormat={"do MMM, yyyy"}/>
                </div>
                <ExpandCheckboxInput className={styles.filters__content__filter}
                                     options={new Set(Object.keys(regions))}
                                     label="Regions"
                                     onChange={(selected) => {
                                         console.log(selected)
                                     }}/>

            </div>
        </div>
    )
};

const FiltersBar = forwardRef(FiltersBarInner);

FiltersBar.displayName = "FiltersBar";

export default FiltersBar;

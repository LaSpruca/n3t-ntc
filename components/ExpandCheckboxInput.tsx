import {ChangeEvent, useState} from "react";
import styles from "$styles/components/ExpandCheckboxInput.module.scss";
import {ArrowDropDown} from "@mui/icons-material";

export interface ExpandCheckboxInputProps {
    onChange: (selected: Set<String>) => void;
    options: Set<string>,
    label: string,
    className?: string
}

const ExpandCheckboxInput = ({onChange, options, className, label}: ExpandCheckboxInputProps) => {
    let selected = new Set<string>();
    const [expanded, setExpanded] = useState(false);

    const createHandler = (val: string) => (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            if (!(selected.has(val))) {
                selected.add(val);
                onChange(selected);
            }
        } else {
            if (selected.has(val)) {
                selected.delete(val);
                onChange(selected);
            }
        }
    };

    return <div className={`${className ?? ''} ${styles.box} ${expanded ? styles.boxExpanded : ''}`}>
        <div className={styles.title}>
            <p>{label}</p>
            <button onClick={() => setExpanded(!expanded)} className={styles.title__button}>
                <ArrowDropDown className={styles.title__arrow}/>
            </button>
        </div>
        <div className={styles.options}>
            {Array.from(options).map(opt => (<div key={`${label}-${opt}`}>
                <label htmlFor={`${label}-${opt}`}>{opt}</label>
                <input type="checkbox" name={`${label}-${opt}`} onChange={createHandler(opt)}/>
            </div>))}
        </div>
    </div>
};

export default ExpandCheckboxInput;

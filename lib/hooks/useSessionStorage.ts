import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useSessionStorage = <T>(
    key: string,
    initial: T
): [T, Dispatch<SetStateAction<T>>] => {
    const [value, setValue] = useState(initial);

    useEffect(() => {
        let stored = sessionStorage.getItem(key);
        if (stored) {
            setValue(JSON.parse(stored));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};

export default useSessionStorage;

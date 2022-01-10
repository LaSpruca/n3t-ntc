import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useSessionStorage = <T>(
    key: string,
    initial: T
): [T, Dispatch<SetStateAction<T>>, boolean] => {
    const [value, setValue] = useState(initial);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let stored = sessionStorage.getItem(key);
        if (stored !== null) {
            setValue(JSON.parse(stored));
        }
        setReady(true);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const updateSession: Dispatch<SetStateAction<T>> = (
        value: SetStateAction<T>
    ) => {
        sessionStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    };

    return [value, updateSession, ready];
};

export default useSessionStorage;

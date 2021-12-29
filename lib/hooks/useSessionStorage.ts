import { useEffect, useState } from 'react';

const useSessionStorage = <T>(key: string, initial: T): T => {
    const [value, setValue] = useState(initial);

    useEffect(() => {
        let stored = sessionStorage.getItem(key);
        if (stored) {
            setValue(JSON.parse(stored));
        }
    });

    return value;
};

export default useSessionStorage;

import { useCallback, useEffect, useState } from "react";

const PREFIX = process.env.REACT_APP_LS_PREFIX;

export const useLocalStorage = (key, initialValue) => {
    const prefixedKey = PREFIX + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        return (jsonValue && jsonValue !== 'undefined') ? JSON.parse(jsonValue) : initialValue ? (typeof initialValue === 'function' ? initialValue() : initialValue) : '';
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value]);

    const removeItem = useCallback(() => {
        localStorage.removeItem(prefixedKey);
    }, [prefixedKey]);

    return { value, setValue, removeItem }
};
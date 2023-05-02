// based on https://www.geeksforgeeks.org/reactjs-uselocalstorage-custom-hook/#
import React, { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>]  {
    const [val, setVal] = useState<T>(() => {
        const value = localStorage.getItem(key);
        if (value !== null) {
            try {
                // not type checking
                // might cause issues if localstorage was modified externally
                return JSON.parse(value);
            } catch {
                localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } else {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(val));
    }, [val]);

    return [val, setVal];
}

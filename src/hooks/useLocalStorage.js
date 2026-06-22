import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      setStored((prev) => {
        const next = typeof value === 'function' ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* quota exceeded */
        }
        return next;
      });
    },
    [key]
  );

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStored(JSON.parse(e.newValue));
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [stored, setValue];
}

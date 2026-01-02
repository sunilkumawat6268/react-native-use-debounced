import { useEffect, useRef, useState } from "react";

/**
 * Returns a debounced value that updates after `delay` milliseconds
 * from the last change to `value`.
 *
 * Useful for search inputs, autosave, validations, etc.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // clear existing timer
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    // set new timer
    timerRef.current = (setTimeout(() => {
      setDebounced(value);
      timerRef.current = null;
    }, delay) as unknown) as number;

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [value, delay]);

  return debounced;
}

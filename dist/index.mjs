// src/useDebouncedValue.ts
import { useEffect, useRef, useState } from "react";
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  const timerRef = useRef(null);
  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setDebounced(value);
      timerRef.current = null;
    }, delay);
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [value, delay]);
  return debounced;
}

// src/index.ts
var src_default = useDebouncedValue;
export {
  src_default as default
};

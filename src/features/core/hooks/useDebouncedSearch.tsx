import {Dispatch, SetStateAction, useEffect, useState} from 'react';

function useDebouncedSearch<T = undefined>(initial: T, delay = 200): [T, T | undefined, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initial);
  const [debounceValue, setDebounceValue] = useState<T | undefined>(initial || undefined);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value || undefined), delay);
    return () => clearTimeout(timer);
  }, [setDebounceValue, value, delay]);

  return [value, debounceValue, setValue];
}
export default useDebouncedSearch;

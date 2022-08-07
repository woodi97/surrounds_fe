import Cookies from 'js-cookie';
import { useState } from 'react';

export function useCookie(
  key: string
): [string, (value: string, option: Cookies.CookieAttributes) => void] {
  const [item, setInnerValue] = useState<string>(() => {
    const value = Cookies.get(key);
    return value;
  });

  const setValue = (value, options) => {
    if (!value) {
      Cookies.remove(key);
      return;
    }
    setInnerValue(value);
    Cookies.set(key, value, options);
  };

  return [item, setValue];
}

export default useCookie;

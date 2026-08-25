import { useEffect, useState } from 'react';

const QUERY = '(pointer: coarse)';

/* Swipe navigation is for touch only. A trackpad reports horizontal pan too,
 * and hijacking that would turn an ordinary two-finger scroll into an
 * accidental navigation — desktop already has the nav pill and arrow keys. */
export function usePointerCoarse(): boolean {
  const [coarse, setCoarse] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setCoarse(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return coarse;
}

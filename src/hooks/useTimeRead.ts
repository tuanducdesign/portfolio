import { useEffect, useRef, useState } from 'react';

const WPM = 225;

export function useTimeRead() {
  const [state, setState] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) {
      throw new Error('You should pass `ref` to an article tag');
    }
    const words = ref.current.innerText.trim().split(/\s+/).length;
    const minuteNeeded = Math.ceil(words / WPM);
    setState(minuteNeeded);
  }, []);
  return [ref, state] as const;
}

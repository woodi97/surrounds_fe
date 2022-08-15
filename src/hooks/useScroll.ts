import { DependencyList, MutableRefObject, useEffect } from 'react';

export function useScroll({
  cb,
  passive = true,
}: {
  cb: (e: WheelEvent) => void;
  passive?: boolean;
}) {
  useEffect(() => {
    window.addEventListener('scroll', cb, { passive });
    return () => {
      window.removeEventListener('scroll', cb);
    };
  }, []);
}

export function useScrollToBottom(ref: MutableRefObject<HTMLDivElement>, deps: DependencyList[]) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, deps);
}

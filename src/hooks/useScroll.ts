import { useEffect } from 'react';

export default function useScroll({
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

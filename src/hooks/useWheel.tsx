import { useEffect } from 'react';

export default function useWheel({
  cb,
  passive = true,
}: {
  cb: (e: WheelEvent) => void;
  passive?: boolean;
}) {
  useEffect(() => {
    window.addEventListener('wheel', cb, { passive });
    return () => {
      window.removeEventListener('wheel', cb);
    };
  }, []);
}

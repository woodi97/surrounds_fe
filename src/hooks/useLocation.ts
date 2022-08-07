import { Location } from '@src/core/types';
import { ToastError } from '@src/utils/toast';
import { useEffect, useState } from 'react';

const gpsOptions = {
  maximumAge: 30000,
};

export default function useLocation() {
  const [location, setLocation] = useState<Location>(null);

  const getCurrentLocation = () => {
    return new Promise<Location>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('위치정보 사용이 불가능한 브라우저입니다.');
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        reject,
        gpsOptions
      );
    });
  };

  useEffect(() => {
    async function getGPS() {
      try {
        const result = await getCurrentLocation();
        setLocation(result);
      } catch (error) {
        ToastError(error);
      }
    }

    getGPS();
  }, []);

  return [location] as const;
}

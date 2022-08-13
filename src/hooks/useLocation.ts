import { LocationType } from '@src/core/types/navigator-type';
import { useRootDispatch } from '@src/hooks/useRootState';
import { setLocationInfo } from '@src/store/modules/device';
import { ToastError } from '@src/utils/toast';
import { useEffect } from 'react';

const gpsOptions = {
  maximumAge: 30000,
};

export default function useLocation() {
  const dispatch = useRootDispatch();

  const getCurrentLocation = () => {
    return new Promise<LocationType>((resolve, reject) => {
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
        dispatch(setLocationInfo(result));
      } catch (error) {
        ToastError(error);
      }
    }

    getGPS();
  }, []);
}

import { NaverAuthHookType } from '@src/core/types/auth-type';
import { useLazyScript } from '@src/hooks';

export default function useNaverAuth({
  router,
  dispatch,
  onSuccess,
  onFailure,
}: NaverAuthHookType) {
  const [isLoaded] = useLazyScript('');

  const processNaverLogin = async () => {
    throw new Error('Naver SDK is not loaded');
    if (!isLoaded) {
      throw new Error('Naver SDK is not loaded');
    }
  };

  return [isLoaded, processNaverLogin] as const;
}

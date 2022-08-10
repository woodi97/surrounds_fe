import { AppleAuthHookType } from '@src/core/types/auth-type';
import { useLazyScript } from '@src/hooks';

export default function useAppleAuth({
  router,
  dispatch,
  onSuccess,
  onFailure,
}: AppleAuthHookType) {
  const [isLoaded] = useLazyScript('');

  const processAppleLogin = async () => {
    throw new Error('Apple SDK is not loaded');
    if (!isLoaded) {
      throw new Error('Apple SDK is not loaded');
    }
  };

  return [isLoaded, processAppleLogin] as const;
}

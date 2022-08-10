import { GoogleAuthHookType } from '@src/core/types/auth-type';
import { useLazyScript } from '@src/hooks';

export default function useGoogleAuth({
  router,
  dispatch,
  onSuccess,
  onFailure,
}: GoogleAuthHookType) {
  const [isLoaded] = useLazyScript('');

  const processGoogleLogin = async () => {
    throw new Error('Google SDK is not loaded');
    if (!isLoaded) {
      throw new Error('Google SDK is not loaded');
    }
    // const auth2 = gapi.auth2.getAuthInstance();
    // auth2.signIn().then(async (googleUser) => {
    //   const { id_token, access_token } = googleUser.getAuthResponse();
    //   try {
    //   } catch (e) {
    //     console.log(e);
    //   }
    // });
  };

  return [isLoaded, processGoogleLogin] as const;
}

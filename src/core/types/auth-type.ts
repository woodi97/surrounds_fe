import { RootDispatchType } from '@src/store/modules';
import { NextRouter } from 'next/router';

export type UserAuthInfoType = {
  email: string;
  username: string;
  profile_image: string;
  isLogin: boolean;
};

export type SocialAuthHookType = {
  className?: string;
  router: NextRouter;
  dispatch: RootDispatchType;
  onSuccess?: () => void;
};

export type KakaoAuthHookType = SocialAuthHookType & {
  onFailure?: (e?: Error | Kakao.Auth.AuthError) => void;
};

export type NaverAuthHookType = SocialAuthHookType & {
  onFailure?: (e?: Error) => void;
};

export type GoogleAuthHookType = SocialAuthHookType & {
  onFailure?: (e?: Error) => void;
};

export type AppleAuthHookType = SocialAuthHookType & {
  onFailure?: (e?: Error) => void;
};

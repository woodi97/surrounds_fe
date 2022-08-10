import {
  AppleLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
  NaverLoginButton,
} from '@src/components/atom';
import { SocialAuthHookType } from '@src/core/types/auth-type';
import React, { FC } from 'react';

const SignInForm: FC<SocialAuthHookType> = ({ ...props }) => {
  return (
    <div className="w-full">
      <div className="flex justify-center w-80 m-center flex-wrap basis-1/9">
        <KakaoLoginButton
          router={props.router}
          dispatch={props.dispatch}
          onSuccess={props.onSuccess}
        />
        <NaverLoginButton
          router={props.router}
          dispatch={props.dispatch}
          onSuccess={props.onSuccess}
        />
        <GoogleLoginButton
          router={props.router}
          dispatch={props.dispatch}
          onSuccess={props.onSuccess}
        />
        <AppleLoginButton
          router={props.router}
          dispatch={props.dispatch}
          onSuccess={props.onSuccess}
        />
      </div>
    </div>
  );
};

export default SignInForm;

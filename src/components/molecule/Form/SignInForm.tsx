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
    <div className="w-80 flex flex-wrap">
      <KakaoLoginButton
        className="basis-1/2"
        router={props.router}
        dispatch={props.dispatch}
        onSuccess={props.onSuccess}
      />
      <NaverLoginButton
        className="basis-1/2"
        router={props.router}
        dispatch={props.dispatch}
        onSuccess={props.onSuccess}
      />
      <GoogleLoginButton
        className="basis-1/2"
        router={props.router}
        dispatch={props.dispatch}
        onSuccess={props.onSuccess}
      />
      <AppleLoginButton
        className="basis-1/2"
        router={props.router}
        dispatch={props.dispatch}
        onSuccess={props.onSuccess}
      />
    </div>
  );
};

export default SignInForm;

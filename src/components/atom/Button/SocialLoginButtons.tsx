import { IconButton } from '@src/components/atom';
import { SVGTypes } from '@src/components/atom/Icon/Icon';
import {
  AppleAuthHookType,
  GoogleAuthHookType,
  KakaoAuthHookType,
  NaverAuthHookType,
} from '@src/core/types/auth-type';
import { useKakaoAuth } from '@src/hooks';
import useAppleAuth from '@src/hooks/auth/useAppleAuth';
import useGoogleAuth from '@src/hooks/auth/useGoogleAuth';
import useNaverAuth from '@src/hooks/auth/useNaverAuth';
import React, { FC } from 'react';

const SocialLoginButtonWrapper: FC<{
  isLoaded: boolean;
  name: SVGTypes;
  onClick: () => void;
}> = ({ isLoaded, name, onClick }) => (
  <IconButton
    className="m-4 p-4 border-2 rounded-xl border-0 disabled:opacity-50"
    size={50}
    name={name}
    disabled={!isLoaded}
    onClick={onClick}
  />
);

export const KakaoLoginButton: FC<KakaoAuthHookType> = ({ ...props }) => {
  const [isKakaoScriptLoaded, useKakaoLogin] = useKakaoAuth({ ...props });

  return (
    <SocialLoginButtonWrapper isLoaded={isKakaoScriptLoaded} name="kakao" onClick={useKakaoLogin} />
  );
};

export const NaverLoginButton: FC<NaverAuthHookType> = ({ ...props }) => {
  const [isNaverScriptLoading, useNaverLogin] = useNaverAuth({ ...props });

  return <SocialLoginButtonWrapper isLoaded={false} name="naver" onClick={useNaverLogin} />;
};

export const GoogleLoginButton: FC<GoogleAuthHookType> = ({ ...props }) => {
  const [isGoogleScriptLoading, useGoogleLogin] = useGoogleAuth({ ...props });

  return <SocialLoginButtonWrapper isLoaded={false} name="google" onClick={useGoogleLogin} />;
};

export const AppleLoginButton: FC<AppleAuthHookType> = ({ ...props }) => {
  const [isAppleScriptLoading, useAppleLogin] = useAppleAuth({ ...props });

  return <SocialLoginButtonWrapper isLoaded={false} name="apple" onClick={useAppleLogin} />;
};

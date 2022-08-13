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
import cx from 'classnames';
import React, { FC } from 'react';

const SocialLoginButtonWrapper: FC<{
  isLoaded: boolean;
  name: SVGTypes;
  className?: string;
  onClick: () => void;
}> = ({ isLoaded, name, className, onClick }) => (
  <IconButton
    className={cx('p-4 flex justify-center disabled:opacity-50', className)}
    size={50}
    name={name}
    disabled={!isLoaded}
    onClick={onClick}
  />
);

export const KakaoLoginButton: FC<KakaoAuthHookType> = ({ className, ...props }) => {
  const [isKakaoScriptLoaded, useKakaoLogin] = useKakaoAuth({ ...props });

  return (
    <SocialLoginButtonWrapper
      isLoaded={isKakaoScriptLoaded}
      className={className}
      name="kakao"
      onClick={useKakaoLogin}
    />
  );
};

export const NaverLoginButton: FC<NaverAuthHookType> = ({ className, ...props }) => {
  const [isNaverScriptLoading, useNaverLogin] = useNaverAuth({ ...props });

  return (
    <SocialLoginButtonWrapper
      isLoaded={false}
      className={className}
      name="naver"
      onClick={useNaverLogin}
    />
  );
};

export const GoogleLoginButton: FC<GoogleAuthHookType> = ({ className, ...props }) => {
  const [isGoogleScriptLoading, useGoogleLogin] = useGoogleAuth({ ...props });

  return (
    <SocialLoginButtonWrapper
      isLoaded={false}
      className={className}
      name="google"
      onClick={useGoogleLogin}
    />
  );
};

export const AppleLoginButton: FC<AppleAuthHookType> = ({ className, ...props }) => {
  const [isAppleScriptLoading, useAppleLogin] = useAppleAuth({ ...props });

  return (
    <SocialLoginButtonWrapper
      isLoaded={false}
      className={className}
      name="apple"
      onClick={useAppleLogin}
    />
  );
};

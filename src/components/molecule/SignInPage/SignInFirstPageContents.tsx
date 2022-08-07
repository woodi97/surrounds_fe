import { Button } from '@src/components/atom';
import { useRootDispatch } from '@src/hooks';
import { openModal } from '@src/store/modules/modal';
import cx from 'classnames';
import React, { memo } from 'react';

const SignInPageButtons = () => {
  const dispatch = useRootDispatch();

  const handleSignInClick = () => {
    dispatch(
      openModal({
        type: 'SIGNIN',
        title: 'Sign In',
      })
    );
  };

  const handleSignUpClick = () => {
    dispatch(
      openModal({
        type: 'SIGNUP',
        title: 'Sign Up',
      })
    );
  };

  return (
    <div className="space-y-4">
      <Button className="text-white font-bold" size="large" fullWidth onClick={handleSignInClick}>
        Sign In
      </Button>
      <Button
        className="text-white font-bold"
        size="large"
        styles="secondary"
        fullWidth
        onClick={handleSignUpClick}
      >
        Create an account
      </Button>
    </div>
  );
};

const SignInPagePhrase = () => {
  return (
    <div>
      <h1 className="text-6xl md:text-7xl font-normal">{"Let's talk"}</h1>
      <h1 className="text-6xl md:text-7xl">{'With your Surrounds'}</h1>
    </div>
  );
};

const SignInFirstPageContents = () => {
  return (
    <div className={cx('z-10 relative w-full h-full pb-6', 'flex flex-col justify-between')}>
      <SignInPagePhrase />
      <SignInPageButtons />
    </div>
  );
};

export default memo(SignInFirstPageContents);

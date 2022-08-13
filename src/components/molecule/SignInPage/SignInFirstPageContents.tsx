import { Button } from '@src/components/atom';
import { useRootDispatch } from '@src/hooks';
import { openModal } from '@src/store/modules/modal';
import cx from 'classnames';
import React, { memo, useCallback } from 'react';

const SignInPageButtons = () => {
  const dispatch = useRootDispatch();

  const handleSignInClick = useCallback(() => {
    dispatch(
      openModal({
        type: 'SIGNIN',
        title: 'Sign In',
      })
    );
  }, []);

  return (
    <div className="space-y-4">
      <Button
        className="text-white font-bold"
        size="large"
        styles="link"
        fullWidth
        onClick={handleSignInClick}
      >
        Start
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

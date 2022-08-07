import cx from 'classnames';
import React, { memo } from 'react';

const SignInPageFirstPhrase = () => {
  return (
    <div>
      <h1 className="text-6xl md:text-7xl font-normal">{'Surrounds'}</h1>
      <h1 className="text-7xl md:text-8xl">{'is a'}</h1>
    </div>
  );
};

const SignInPageSecondPhrase = () => {
  return (
    <div className="text-secondary-600">
      <h1 className="text-6xl md:text-7xl font-normal">{'Voice Chat'}</h1>
      <h1 className="text-5xl md:text-6xl">{'Social Network'}</h1>
    </div>
  );
};

const SignInPageThirdPhrase = () => {
  return (
    <div className="text-white">
      <h1 className="text-6xl md:text-7xl font-normal">{'Where we can talk with'}</h1>
      <h1 className="text-7xl md:text-8xl">{'Surrounds'}</h1>
    </div>
  );
};

const SignInSecondPageContents = () => {
  return (
    <div
      className={cx(
        'z-10 relative w-full h-full py-4',
        'flex flex-col justify-start',
        'space-y-10'
      )}
    >
      <SignInPageFirstPhrase />
      <SignInPageSecondPhrase />
      <SignInPageThirdPhrase />
    </div>
  );
};

export default memo(SignInSecondPageContents);

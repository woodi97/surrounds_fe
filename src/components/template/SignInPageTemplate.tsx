import { Icon } from '@src/components/atom';
import SignInFirstPageContents from '@src/components/molecule/SignInPage/SignInFirstPageContents';
import SignInPageBackground from '@src/components/molecule/SignInPage/SignInPageBackground';
import SignInSecondPageContents from '@src/components/molecule/SignInPage/SignInSecondPageContents';
import SignInThirdPageContents from '@src/components/molecule/SignInPage/SignInThirdPageContents';
import { useFullPageScroll } from '@src/hooks';
import React, { Fragment, useRef } from 'react';

const SignInPageTemplate = () => {
  const fullPageRef = useRef<HTMLDivElement>(null);

  useFullPageScroll({
    ref: fullPageRef,
    numOfPages: 3,
    disableInfiniteScroll: true,
  });

  return (
    <Fragment>
      <div ref={fullPageRef} className="h-full overflow-scroll">
        <SignInFirstPageContents />
        <SignInSecondPageContents />
        <SignInThirdPageContents />
      </div>
      <SignInPageBackground />
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <Icon name="ellipsisVertical" size={40} />
      </div>
    </Fragment>
  );
};

export default SignInPageTemplate;

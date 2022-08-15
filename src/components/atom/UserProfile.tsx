import { ImageWrapper } from '@src/components/atom/index';
import cx from 'classnames';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

export type UserProfileProps = {
  username: string;
  profile_image?: string;
  className?: string;
  children?: React.ReactNode;
};

const UserProfile: ForwardRefRenderFunction<HTMLDivElement, UserProfileProps> = (
  { username, profile_image, className, children },
  ref
) => {
  return (
    <div
      ref={ref}
      className={cx(
        'bg-primary-500 h-full flex justify-center items-center rounded-full',
        className
      )}
    >
      {profile_image ? (
        <ImageWrapper src={profile_image} layout="fill" alt="profile" />
      ) : username ? (
        <h2 className="text-white">{username.charAt(0)}</h2>
      ) : (
        <h2 className="text-white">X</h2>
      )}
      {children}
    </div>
  );
};

export default forwardRef(UserProfile);

import cx from 'classnames';
import React, { FC } from 'react';

const UserProfile: FC<{
  username: string;
  roundness?: string;
  className?: string;
}> = ({ username, roundness = 'rounded-3xl', className }) => {
  return (
    <div
      className={cx('bg-primary-500 h-full flex justify-center items-center', roundness, className)}
    >
      <h2 className="text-white">{username ? username.charAt(0) : 'X'}</h2>
    </div>
  );
};

export default UserProfile;

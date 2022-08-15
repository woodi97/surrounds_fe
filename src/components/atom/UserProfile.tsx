import cx from 'classnames';
import React, { FC } from 'react';

const UserProfile: FC<{
  username: string;
  className?: string;
}> = ({ username, className }) => {
  return (
    <div
      className={cx(
        'bg-primary-500 h-full flex justify-center items-center rounded-3xl',
        className
      )}
    >
      <h2 className="text-white">{username ? username.charAt(0) : 'X'}</h2>
    </div>
  );
};

export default UserProfile;

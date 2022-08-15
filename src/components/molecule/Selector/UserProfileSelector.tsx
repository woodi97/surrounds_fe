import { ImageWrapper, UserProfile } from '@src/components/atom';
import React, { FC } from 'react';

const UserProfileSelector: FC<{
  profile_image: string;
  username: string;
  roundness?: string;
  profileClassName?: string;
}> = ({ profile_image, username, roundness = 'rounded-3xl', profileClassName }) => {
  return (
    <>
      {profile_image ? (
        <ImageWrapper className={roundness} src={profile_image} layout="fill" alt="profile" />
      ) : (
        <UserProfile className={profileClassName} username={username} roundness={roundness} />
      )}
    </>
  );
};

export default UserProfileSelector;

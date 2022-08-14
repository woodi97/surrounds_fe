import { ImageWrapper, UserProfile } from '@src/components/atom';
import React, { FC } from 'react';

const UserProfileSelector: FC<{
  profile_image: string;
  username: string;
  profileClassName?: string;
}> = ({ profile_image, username, profileClassName }) => {
  return (
    <>
      {profile_image ? (
        <ImageWrapper className="rounded-3xl" src={profile_image} layout="fill" alt="profile" />
      ) : (
        <UserProfile className={profileClassName} username={username} />
      )}
    </>
  );
};

export default UserProfileSelector;

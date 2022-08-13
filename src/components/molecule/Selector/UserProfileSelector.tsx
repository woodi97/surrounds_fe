import { ImageWrapper, UserProfile } from '@src/components/atom';
import React, { FC } from 'react';

const UserProfileSelector: FC<{
  profile_image: string;
  username: string;
}> = ({ profile_image, username }) => {
  return (
    <>
      {profile_image ? (
        <ImageWrapper className="rounded-3xl" src={profile_image} layout="fill" alt="profile" />
      ) : (
        <UserProfile className="w-8 h-8" username={username} />
      )}
    </>
  );
};

export default UserProfileSelector;

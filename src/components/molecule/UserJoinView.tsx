import { UserProfileSelector } from '@src/components/molecule/index';
import React, { FunctionComponent, memo } from 'react';

const UserJoinView: FunctionComponent<{
  myProfile: string;
  myUserName: string;
}> = ({ myProfile, myUserName }) => {
  return (
    <div className="relative w-24 h-24 flex justify-center items-center mx-auto my-28 flex-shrink">
      <div className="w-24 h-24">
        <UserProfileSelector profile_image={myProfile} username={myUserName} />
      </div>
      <div className="absolute translate-center-xy -top-12">
        <div className="w-16 h-16">
          <UserProfileSelector
            profileClassName="bg-secondary-500"
            roundness="rounded-full"
            profile_image={''}
            username={''}
          />
        </div>
      </div>
      <div className="absolute translate-center-xy top-36">
        <div className="w-16 h-16">
          <UserProfileSelector
            profileClassName="bg-secondary-500"
            roundness="rounded-full"
            profile_image={''}
            username={''}
          />
        </div>
      </div>
      <div className="absolute translate-center-xy left-36">
        <div className="w-16 h-16">
          <UserProfileSelector
            profileClassName="bg-secondary-500"
            roundness="rounded-full"
            profile_image={''}
            username={''}
          />
        </div>
      </div>
      <div className="absolute translate-center-xy -left-12">
        <div className="w-16 h-16">
          <UserProfileSelector
            profileClassName="bg-secondary-500"
            roundness="rounded-full"
            profile_image={''}
            username={''}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(UserJoinView);

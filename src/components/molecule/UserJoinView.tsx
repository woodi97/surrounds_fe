import UserProfileWithMedia from '@src/components/molecule/Selector/UserProfileWithMedia';
import { RemoteStreamsType } from '@src/hooks/media/useRemoteStream';
import cx from 'classnames';
import React, { FunctionComponent } from 'react';

const UserJoinView: FunctionComponent<{
  myProfile: string;
  myUserName: string;
  localStream: MediaStream;
  remoteStreams: RemoteStreamsType[];
}> = ({ myProfile, myUserName, localStream, remoteStreams }) => {
  return (
    <div className="w-full">
      <div className={cx('relative', 'flex flex-col justify-center items-center', 'space-y-2')}>
        <UserProfileWithMedia
          mediaStream={localStream}
          profile_image={myProfile}
          username={myUserName}
          muted
        />
        <div className="flex h-16 space-x-2">
          {remoteStreams.length > 0 &&
            remoteStreams.map((remoteStream) => (
              <UserProfileWithMedia
                key={remoteStream.peerId}
                className="w-16 h-16"
                mediaStream={remoteStream.stream}
                profile_image={''}
                username={''}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserJoinView;

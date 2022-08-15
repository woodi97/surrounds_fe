import { UserProfile, VideoWrapper } from '@src/components/atom';
import { UserProfileProps } from '@src/components/atom/UserProfile';
import { VideoShape } from '@src/components/atom/VideoWrapper';
import { useDrawVoiceLoudness } from '@src/hooks';
import cx from 'classnames';
import React, { FunctionComponent, useRef } from 'react';

const UserProfileWithMedia: FunctionComponent<VideoShape & UserProfileProps> = ({
  mediaStream,
  muted,
  className = 'w-20 h-20',
  ...props
}) => {
  const profileRef = useRef<HTMLDivElement>(null);

  useDrawVoiceLoudness({
    ref: profileRef,
    mediaStream,
    muted,
  });

  return (
    <div className={cx('relative', className)}>
      <UserProfile ref={profileRef} {...props}>
        <VideoWrapper mediaStream={mediaStream} muted={muted} />
      </UserProfile>
    </div>
  );
};

export default UserProfileWithMedia;

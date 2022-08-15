import { IconButton, UserProfile } from '@src/components/atom';
import { useRootDispatch, useRootState } from '@src/hooks';
import { openRoomCreateModal } from '@src/store/modules/modal';
import cx from 'classnames';
import React, { forwardRef, MutableRefObject, useCallback } from 'react';

type Props = {
  className?: string;
};

const AppHeader = ({ className }: Props, ref: MutableRefObject<HTMLDivElement>) => {
  const { profile_image, username } = useRootState((state) => state.auth);
  const dispatch = useRootDispatch();

  const handleRoomCreate = useCallback(() => {
    dispatch(openRoomCreateModal({}));
  }, []);

  return (
    <header className="relative">
      <div
        ref={ref}
        className={cx(
          'z-20 w-full max-w-mobile-app h-gb-header top-0',
          'px-side-padding py-2',
          'fixed',
          className
        )}
      >
        <div
          className={cx(
            'h-12 flex justify-between items-center align-middle',
            'bg-white/70',
            'rounded-3xl',
            'pr-2'
          )}
        >
          <div className="relative w-12 h-full">
            <UserProfile profile_image={profile_image} username={username} />
          </div>
          <div className="flex items-center space-x-2">
            <IconButton name="setting" size={24} />
            <IconButton name="plus" size={24} onClick={handleRoomCreate} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default forwardRef(AppHeader);

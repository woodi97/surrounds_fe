import { HorizontalLine, ImageWrapper, Shimmer } from '@src/components/atom';
import { RoomInfo } from '@src/core/types/chatroom';
import React, { FC } from 'react';

const MainPageBottomSheetContent: FC<{
  chatRooms: RoomInfo[];
  isLoading: boolean;
}> = ({ chatRooms, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Shimmer key={`main-bottom-shimmer-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {chatRooms?.map((chatroom, idx) => {
        return (
          <div key={`chatroom-list-${idx}`} className="bg-transparent">
            <div className="flex items-center py-2 space-x-3 cursor-pointer">
              <ImageWrapper
                src={chatroom.author_profile_image || '/profiles/default.png'}
                width={40}
                height={40}
                className="rounded-lg"
                alt=""
              />
              <div className="w-64 h-8">
                <span>{chatroom.title}</span>
              </div>
            </div>
            <HorizontalLine className="bg-secondary-200" />
          </div>
        );
      })}
    </div>
  );
};

export default MainPageBottomSheetContent;

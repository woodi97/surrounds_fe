import { HorizontalLine, Shimmer } from '@src/components/atom';
import { UserProfileSelector } from '@src/components/molecule';
import { RoomInfoType } from '@src/core/types/chatroom';
import React, { FC } from 'react';

export type ChatroomSheetContentProps = {
  chatRooms: RoomInfoType[];
  isLoading: boolean;
};

const ChatroomSheetContent: FC<ChatroomSheetContentProps> = ({ chatRooms, isLoading }) => {
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
      {chatRooms &&
        chatRooms.length > 0 &&
        chatRooms.map((chatroom, idx) => {
          return (
            <div key={`chatroom-list-${idx}`} className="bg-transparent">
              <div className="flex items-center py-2 space-x-3 cursor-pointer">
                <UserProfileSelector
                  profileClassName="w-8 h-8"
                  profile_image={chatroom.author_profile_image}
                  username={chatroom.author}
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

export default ChatroomSheetContent;

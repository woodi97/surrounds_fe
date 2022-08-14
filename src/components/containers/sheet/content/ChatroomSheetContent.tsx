import { HorizontalLine, Icon, Shimmer } from '@src/components/atom';
import { UserProfileSelector } from '@src/components/molecule';
import { RoomInfoType } from '@src/core/types/chatroom';
import Link from 'next/link';
import React, { FC } from 'react';

export type ChatroomSheetContentProps = {
  chatRooms: RoomInfoType[];
  isLoading: boolean;
};

const ChatroomSheetRow: FC<RoomInfoType> = ({
  id,
  title,
  description,
  distance,
  author,
  author_profile_image,
}) => {
  return (
    <Link
      href={{
        pathname: '/',
        query: { roomId: id },
      }}
      shallow={true}
    >
      <div className="bg-transparent">
        <div className="py-2 cursor-pointer flex justify-between">
          <div className="flex space-x-2 items-center">
            <UserProfileSelector
              profileClassName="w-10 h-10"
              profile_image={author_profile_image}
              username={author}
            />
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="flex items-end">
            <Icon size={24} name="leftDropArrow" />
            <p>{Math.ceil(distance)}km</p>
          </div>
        </div>
        <HorizontalLine className="bg-primary-500 h-0.5 rounded-lg" />
      </div>
    </Link>
  );
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
    <div className="w-full px-side-padding">
      {chatRooms &&
        chatRooms.length > 0 &&
        chatRooms.map((chatroom, idx) => {
          return <ChatroomSheetRow key={`main-bottom-sheet-row-${idx}`} {...chatroom} />;
        })}
    </div>
  );
};

export default ChatroomSheetContent;

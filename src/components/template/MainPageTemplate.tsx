import { GoogleMapsWrapper } from '@src/components/atom';
import { ChatroomSheetContent } from '@src/components/containers/sheet/content';
import SheetContainer from '@src/components/containers/sheet/SheetContainer';
import { apiGetNearChatrooms } from '@src/core/api/chatroom';
import { RoomInfoType } from '@src/core/types/chatroom';
import { useGPSLocation, useRootState } from '@src/hooks';
import { openRoomJoinModal } from '@src/store/modules/modal';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const MainPageTemplate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { location } = useRootState((state) => state.device);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatRooms, setChatRooms] = useState<RoomInfoType[]>([]);

  useGPSLocation();

  const getNearChatrooms = async () => {
    try {
      const data = await apiGetNearChatrooms(location);
      setChatRooms(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { roomId } = router.query;
    if (roomId) {
      dispatch(
        openRoomJoinModal({
          fullScreen: true,
        })
      );
    }
  }, [router.asPath]);

  useEffect(() => {
    if (location) {
      getNearChatrooms();
    }
  }, [location]);

  return (
    <div className="w-full h-full">
      <GoogleMapsWrapper chatRooms={chatRooms} />
      <SheetContainer>
        <ChatroomSheetContent chatRooms={chatRooms} isLoading={isLoading} />
      </SheetContainer>
    </div>
  );
};

// turn off SSR because this page need GPS Information
export default dynamic(() => Promise.resolve(MainPageTemplate), {
  ssr: false,
});

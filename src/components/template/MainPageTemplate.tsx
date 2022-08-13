import { BottomSheet, GoogleMaps } from '@src/components/atom';
import MainPageBottomSheetContent from '@src/components/molecule/MainPage/MainPageBottomSheetContent';
import { apiGetNearChatrooms } from '@src/core/api/chatroom';
import { RoomInfoType } from '@src/core/types/chatroom';
import { useLocation, useRootState } from '@src/hooks';
import { ToastError } from '@src/utils/toast';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const MainPageTemplate = () => {
  const { location } = useRootState((state) => state.device);
  const [isLoading, setIsLoading] = useState(true);
  const [chatRooms, setChatRooms] = useState<RoomInfoType[]>([]);

  useLocation();

  useEffect(() => {
    async function getRoom() {
      try {
        const data = await apiGetNearChatrooms(location);
        setChatRooms(data);
        setIsLoading(false);
      } catch (error) {
        ToastError('Fail to fetch rooms(Please try again)');
      }
    }

    // should be called when navigator.location initialized
    if (location) {
      getRoom();
    }
  }, [location]);

  return (
    <div className="w-full h-full">
      <GoogleMaps />
      <BottomSheet>
        <MainPageBottomSheetContent chatRooms={chatRooms} isLoading={isLoading} />
      </BottomSheet>
    </div>
  );
};

// turn off SSR because this page need GPS Information
export default dynamic(() => Promise.resolve(MainPageTemplate), {
  ssr: false,
});

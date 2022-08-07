import { BottomSheet, GoogleMaps } from '@src/components/atom';
import HeaderNav from '@src/components/atom/HeaderNav';
import { PageLayout } from '@src/components/layout';
import MainPageBottomSheetContent from '@src/components/molecule/MainPage/MainPageBottomSheetContent';
import { apiGetNearChatrooms } from '@src/core/api/chatroom';
import { RoomInfo } from '@src/core/types/chatroom';
import { withAuthSSR } from '@src/hocnf';
import { useLocation } from '@src/hooks';
import { ToastError } from '@src/utils/toast';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

export const getServerSideProps = withAuthSSR();

// Todo: Apply React Query
const HomePage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [location] = useLocation();
  const [chatRooms, setChatRooms] = useState<RoomInfo[]>([]);

  useEffect(() => {
    async function getRoom() {
      try {
        const data = await apiGetNearChatrooms(location);
        setChatRooms(data);
        setIsLoading(false);
      } catch (error) {
        ToastError('Fail to fetch rooms');
      }
    }

    if (location) {
      getRoom();
    }
  }, [location]);

  return (
    <PageLayout fixedHeight fullWidth enableAppBar>
      <HeaderNav />
      <GoogleMaps />
      <BottomSheet>
        <MainPageBottomSheetContent chatRooms={chatRooms} isLoading={isLoading} />
      </BottomSheet>
    </PageLayout>
  );
};

// turn off SSR because this page need GPS Information
export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});

import { BottomSheet, GoogleMaps } from '@src/components/atom'
import HeaderNav from '@src/components/atom/HeaderNav'
// import { validate } from '@src/core/api/auth'
import { PageLayout } from '@src/components/layout'
import MainPageBottomSheetContent from '@src/components/molecule/MainPage/MainPageBottomSheetContent'
import { ExampleRoomData } from '@src/core/data/example/roomData'
import { withAuthSSR } from '@src/hocnf'
import React, { FC, useMemo } from 'react'

export const getServerSideProps = withAuthSSR()

const HomePage: FC = () => {
  const chatRooms = useMemo(() => ExampleRoomData, [])

  return (
    <PageLayout fixedHeight fullWidth>
      <HeaderNav />
      <GoogleMaps />
      <BottomSheet>
        <MainPageBottomSheetContent chatRooms={chatRooms} />
      </BottomSheet>
    </PageLayout>
  )
}

export default HomePage

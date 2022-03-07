import React, { useEffect, useMemo, Fragment, useRef, FC } from 'react'
import { BottomSheet, GoogleMaps, HeaderNav, HorizontalLine, Icon, Image } from '@components/common'
import { withAuthServerSideProps } from '@src/hocs/withSSRAuth'
import { validate } from '@src/core/api/auth'
import withCSRAuth from '@src/hocs/withCSRAuth'
import ShimmeringSheetContent from '@src/components/common/BottomSheet/ShimmeringSheetContent'
import { PageLayout } from '@src/components/layout'
import { getContentHeight } from '@src/utils/browser'
import { useJoinRoomModal, useRoomCreateModal } from '@src/context/ModalContext'
import { useChatroomInfo, useChatroomLoading } from '@src/context/ChatroomContext'

type Props = {
  userInfo: any
}

export const getServerSideProps = withAuthServerSideProps(async () => {
  const userInfo = await validate()
  return {
    props: {
      userInfo,
    },
  }
})

// CSR

const HomePage: FC<Props> = ({ userInfo }) => {
  const openJoinRoomModal = useJoinRoomModal()
  const openRoomCreateModal = useRoomCreateModal()
  const mapWrapperRef = useRef<HTMLDivElement>(null)
  const chatrooms = useChatroomInfo()
  const isChatroomLoading = useChatroomLoading()

  const SheetWrapper = useMemo(() => {
    const SheetContent = () => {
      return (
        <Fragment>
          {chatrooms?.map((chatroom, idx) => {
            return (
              <div
                key={`chatroom-list-${idx}`}
                className="bg-transparent"
                onClick={() =>
                  openJoinRoomModal({ modalTitle: chatroom.title, roomInfo: chatroom })
                }
              >
                <div className="flex items-center py-2 space-x-3 cursor-pointer">
                  <Image
                    src={
                      chatroom.generator.profileImage !== 'NULL'
                        ? chatroom.generator.profileImage
                        : '/profiles/default.png'
                    }
                    width={40}
                    height={40}
                    className="rounded-lg"
                    alt=""
                  />
                  <div className="w-64 h-8">
                    <span>{chatroom.title}</span>
                  </div>
                </div>
                <HorizontalLine height={2} color="rgb(242,203,113)" />
              </div>
            )
          })}
        </Fragment>
      )
    }

    if (isChatroomLoading) return ShimmeringSheetContent
    else return SheetContent
  }, [chatrooms, isChatroomLoading, openJoinRoomModal])

  useEffect(() => {
    mapWrapperRef.current?.style.setProperty('height', `${getContentHeight()}px`)
  }, [])

  return (
    <PageLayout fixedHeight fullWidth>
      <div className="relative flex flex-grow overflow-hidden">
        <div ref={mapWrapperRef} className="w-full bg-slate-500">
          <HeaderNav />
          <GoogleMaps />
        </div>
        <div className="fixed left-0 z-20 hidden md:block w-80 h-screen bg-[rgba(255,255,255,0.8)]">
          <div className="flex px-4 justify-between items-center w-full h-[4vh]">
            <div>{userInfo.nickname ?? 'no name'}</div>
            <Icon name="plus" onClick={() => openRoomCreateModal()} />
          </div>
          <HorizontalLine height={2} color="rgb(242,203,113)" />
          <div className="pt-4 px-4 overflow-x-hidden overflow-y-auto bg-transparent">
            <SheetWrapper />
          </div>
        </div>
      </div>
      <BottomSheet className="md:hidden">
        <SheetWrapper />
      </BottomSheet>
    </PageLayout>
  )
}

export default withCSRAuth(HomePage)

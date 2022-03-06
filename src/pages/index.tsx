import React, { useEffect, useState, useMemo, Fragment, useRef } from 'react'
import { useLocation } from '@src/hooks'
import { BottomSheet, GoogleMaps, HeaderNav, HorizontalLine, Image } from '@components/common'
import { withAuthServerSideProps } from '@src/hocs/withSSRAuth'
import { validate } from '@src/core/api/auth'
import { getNearChatrooms } from '@src/core/api/chatroom'
import withCSRAuth from '@src/hocs/withCSRAuth'
import ShimmeringSheetContent from '@src/components/common/BottomSheet/ShimmeringSheetContent'
import { PageLayout } from '@src/components/layout'
import { getContentHeight } from '@src/utils/browser'

export const getServerSideProps = withAuthServerSideProps(async () => {
  const userInfo = await validate()
  return {
    props: {
      userInfo,
    },
  }
})

// CSR

function HomePage(): JSX.Element {
  const mapWrapperRef = useRef<HTMLDivElement>(null)
  const [chatrooms, setChatrooms] = useState([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [getRoomSuccess, setGetRoomSuccess] = useState<boolean | undefined>(undefined)
  const [myLocation] = useLocation()

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const SheetWrapper = useMemo(() => {
    const SheetContent = () => {
      return (
        <Fragment>
          {chatrooms?.map((val, idx) => {
            return (
              <div key={`chatroom-list-${idx}`} className="bg-[rgba(255,255,255,0.5)]">
                <div className="flex items-center py-2 space-x-3 cursor-pointer">
                  <Image
                    src={
                      val.generator.profileImage !== 'NULL'
                        ? val.generator.profileImage
                        : '/profiles/default.png'
                    }
                    width={40}
                    height={40}
                    className="rounded-lg"
                    alt=""
                  />

                  <div className="w-64 h-8">{val.title}</div>
                </div>
                <HorizontalLine />
              </div>
            )
          })}
        </Fragment>
      )
    }

    if (getRoomSuccess === undefined) return ShimmeringSheetContent
    else return SheetContent
  }, [chatrooms, getRoomSuccess])

  useEffect(() => {
    if (myLocation) {
      ;(async () => {
        try {
          const result = await getNearChatrooms(myLocation)
          setChatrooms(result)
          setGetRoomSuccess(true)
        } catch (e) {
          setGetRoomSuccess(false)
        }
      })()
    }
  }, [myLocation])

  useEffect(() => {
    mapWrapperRef.current?.style.setProperty('height', `${getContentHeight()}px`)
  }, [])

  return (
    <PageLayout fixedHeight>
      <div className="relative flex flex-grow overflow-hidden">
        <section className="z-20 hidden md:block absolute left-0 border-r-2 w-80 max-w-md h-screen bg-white">
          <div className="h-screen pt-10 overflow-x-hidden overflow-y-auto">
            <SheetWrapper />
          </div>
        </section>
        <div ref={mapWrapperRef} className="relative w-full h-96 bg-slate-500">
          <HeaderNav />
          <GoogleMaps />
        </div>
        <BottomSheet className="md:hidden" onClose={onClose} onOpen={onOpen}>
          <SheetWrapper />
        </BottomSheet>
      </div>
    </PageLayout>
  )
}

export default withCSRAuth(HomePage)

// <Room
//   className={styles.currentchatroom}
//   chatroom={selectedRoom}
//   emailId={me.email}
//   profileImage={me.profileImage}
//   currentLocation={myLocation}
//   getChatRooms={getChatrooms}
//   onClick={onProfileClick}
// />

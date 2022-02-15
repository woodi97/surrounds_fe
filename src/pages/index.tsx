import React, { useEffect, useState, useMemo, Fragment } from 'react'
import { useLocation } from '@src/hooks'
import { BottomSheet, GoogleMaps, HeaderNav, HorizontalLine, Image } from '@components/common'
import { withAuthServerSideProps } from '@src/hocs/withSSRAuth'
import { validate } from '@src/core/api/auth'
import { getNearChatrooms } from '@src/core/api/chatroom'
import withCSRAuth from '@src/hocs/withCSRAuth'

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
  const [chatrooms, setChatrooms] = useState([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [myLocation] = useLocation()

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const SheetWrapper = useMemo(() => {
    const SheetContent = ({ chatrooms }) => {
      return (
        <Fragment>
          {chatrooms?.map((val, idx) => {
            return (
              <div key={`chatroom-list-${idx}`}>
                <div className="flex items-center pb-2 space-x-3 cursor-pointer">
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

                  <div>{val.title}</div>
                </div>
                <HorizontalLine />
              </div>
            )
          })}
        </Fragment>
      )
    }
    return SheetContent
  }, [])

  useEffect(() => {
    if (myLocation) {
      ;(async () => {
        const result = await getNearChatrooms(myLocation)
        setChatrooms(result)
      })()
    }
  }, [myLocation])

  return (
    <div className="relative flex flex-grow overflow-hidden">
      <section className="z-20 hidden md:block absolute left-0 border-r-2 w-80 max-w-md h-screen bg-white">
        <div className=" overflow-y-auto pt-10 children:py-2 children:bg-white">
          <SheetWrapper chatrooms={chatrooms} />
        </div>
      </section>
      <div className="relative w-full h-screen bg-slate-500">
        <HeaderNav />
        <GoogleMaps />
      </div>
      <BottomSheet className="md:hidden" onClose={onClose} onOpen={onOpen}>
        <SheetWrapper chatrooms={chatrooms} />
      </BottomSheet>
    </div>
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

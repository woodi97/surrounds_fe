import React, { Fragment, useMemo, useState } from 'react'
import { BottomSheet, HeaderNav, Image, HorizontalLine } from '@components/common'
import Shimmer from 'react-shimmer-effect'

const SpecPage = () => {
  const [getRoomSuccess, setGetRoomSuccess] = useState<boolean | undefined>(undefined)
  const [chatrooms, setChatrooms] = useState([
    {
      id: 'WhCQI5iWw0GU2dc5ZaEZeyA7t90=',
      title: 'woodi',
      location: {
        latitude: 37.5054154,
        longitude: 126.95649769999999,
      },
      generator: {
        email: 'woodi.daily@gmail.com',
        nickname: null,
        profileImage: 'NULL',
      },
    },
  ])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const ShimmeringSheetContent = () => {
    return (
      <>
        {[...Array(30).keys()].map((_, idx) => {
          return (
            <div key={`shimmer-content-${idx}`} className="flex items-center pb-2 space-x-3">
              <Shimmer>
                <div className="w-10 h-10 rounded-2xl" />
                <div className="w-64 h-8 rounded-xl" />
              </Shimmer>
            </div>
          )
        })}
      </>
    )
  }

  const SheetWrapper = useMemo(() => {
    const SheetContent = () => {
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

  return (
    <div className="relative flex flex-grow overflow-hidden">
      <section className="z-20 hidden md:block absolute left-0 border-r-2 w-80 max-w-md h-screen bg-white">
        <div className="h-screen pt-10 children:py-2 children:bg-white overflow-x-hidden overflow-y-auto">
          <SheetWrapper />
        </div>
      </section>
      <div className="relative w-full h-screen bg-slate-500">
        <HeaderNav />
      </div>
      <BottomSheet className="md:hidden" onClose={onClose} onOpen={onOpen}>
        <SheetWrapper />
      </BottomSheet>
    </div>
  )
}

export default SpecPage

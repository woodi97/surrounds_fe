import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { BottomSheet, HeaderNav, Image, HorizontalLine } from '@components/common'

const SpecPage = () => {
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

  return (
    <div className="relative flex flex-grow overflow-hidden">
      <section className="z-20 hidden md:block absolute left-0 border-r-2 w-80 max-w-md h-screen bg-white">
        <div className=" overflow-y-auto pt-10 children:py-2 children:bg-white">
          <SheetWrapper chatrooms={chatrooms} />
        </div>
      </section>
      <div className="relative w-full h-screen bg-slate-500">
        <HeaderNav />
      </div>
      <BottomSheet className="md:hidden" onClose={onClose} onOpen={onOpen}>
        <SheetWrapper chatrooms={chatrooms} />
      </BottomSheet>
    </div>
  )
}

export default SpecPage

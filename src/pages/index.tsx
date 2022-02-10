import React, { useEffect, useState, MouseEvent } from 'react'
import { useLocation } from '@src/hooks'
import { useRouter } from 'next/router'
import { UserInfo, Location, RoomInfo } from '@src/core/interface'
import styles from '@styles/pages/home.module.scss'
import { Map } from '@components/common'
import { ProfileHeader, RoomCreatePage, ProfilePage, RoomList, Room } from '@src/components/primary'
import { withAuthServerSideProps } from '@src/utils/ssr'
import { validate } from '@src/core/api/auth'
import { useCloseModal } from '@src/context/ModalContext'
import { getNearChatrooms } from '@src/core/api/chatroom'

interface Profile {
  show: boolean
  email: string
}

export default function MainPage(): JSX.Element {
  const [myLocation] = useLocation()
  const [chatrooms, setChatrooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState<RoomInfo>(null)
  const [me, setMe] = useState<UserInfo>(undefined)
  const [profile, setProfile] = useState<Profile>({
    show: false,
    email: '',
  })
  const router = useRouter()
  const closeModal = useCloseModal()

  function onProfileClick(email: string) {
    setProfile({ show: !profile.show, email: email })
  }

  // Select Room When Click
  function onRoomClick(room: RoomInfo, e: MouseEvent<HTMLInputElement>) {
    setSelectedRoom(room)
  }

  // close modal from login page
  useEffect(() => {
    closeModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Return JSX
  return (
    <div className={styles.container}>
      {/* rendering mapbox */}
      {myLocation && <Map className={styles.map} location={myLocation} chatrooms={chatrooms} />}
      {/* rendering profileheader */}
      {myLocation && (
        <ProfileHeader className={styles.profile} user={me} onClick={onProfileClick} />
      )}
      {/* rendering joinable rooms */}
      {myLocation && (
        <RoomList className={styles.bottombar} chatrooms={chatrooms} onClick={onRoomClick} />
      )}
      {/* rendering profile page */}
      {profile.show && (
        <ProfilePage
          className={styles.detailProfile}
          emailId={profile.email}
          onClick={onProfileClick}
          onProfileUpdate={() => {}}
        />
      )}
      {/* rendering room create page */}
      {router.asPath == '/chatroom' && (
        <RoomCreatePage
          className={styles.createChatroom}
          location={myLocation}
          getChatRooms={() => {}}
        />
      )}
      {/* enter room */}
      {/* {router.asPath.startsWith('/chatroom/') && (
        <Room
          className={styles.currentchatroom}
          chatroom={selectedRoom}
          emailId={me.email}
          profileImage={me.profileImage}
          currentLocation={myLocation}
          getChatRooms={getChatrooms}
          onClick={onProfileClick}
        />
      )} */}
    </div>
  )
}

export const getServerSideProps = withAuthServerSideProps(async () => {
  const userInfo = await validate()
  return {
    props: {
      userInfo,
    },
  }
})

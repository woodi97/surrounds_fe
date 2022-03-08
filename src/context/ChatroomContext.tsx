import { useEffect, useState } from 'react'
import constate from 'constate'
import { RoomInfo } from '@src/core/interface/chatroom'
import { getNearChatrooms } from '@src/core/api/chatroom'
import { useLocation } from '@src/hooks'
import { ToastError } from '@src/utils/toast'
import { useAuthed, useValidationTried } from './UserAuthContext'

const useChatroom = () => {
  const _authed = useAuthed()
  const _valid_tried = useValidationTried()
  const [location] = useLocation()
  const [joinedChatroom, setJoinedChatroom] = useState<RoomInfo | null>(null)
  const [chatrooms, setChatrooms] = useState<RoomInfo[]>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const updateChatrooms = async () => {
    setIsLoading(true)
    try {
      const result = await getNearChatrooms(location)
      setChatrooms(result)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setChatrooms(null)
    }
  }

  const joinChatroom = (chatroom: RoomInfo) => {
    setJoinedChatroom(chatroom)
  }

  const exitChatroom = () => {
    setJoinedChatroom(null)
  }

  useEffect(() => {
    if (_authed && _valid_tried && location) {
      updateChatrooms()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, _authed, _valid_tried])

  return {
    location,
    chatrooms,
    isLoading,
    joinedChatroom,
    joinChatroom,
    exitChatroom,
    updateChatrooms,
  }
}

const [
  ChatroomProvider,
  useUserLocation,
  useChatroomInfo,
  useChatroomLoading,
  useJoinedChatrrom,
  useJoinChatroom,
  useExitChatroom,
  useUpdateChatrooms,
] = constate(
  useChatroom,
  (value) => value.location,
  (value) => value.chatrooms,
  (value) => value.isLoading,
  (value) => value.joinedChatroom,
  (value) => value.joinChatroom,
  (value) => value.exitChatroom,
  (value) => value.updateChatrooms
)

export {
  ChatroomProvider,
  useUserLocation,
  useChatroomInfo,
  useChatroomLoading,
  useJoinedChatrrom,
  useJoinChatroom,
  useExitChatroom,
  useUpdateChatrooms,
}

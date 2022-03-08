import React from 'react'
import { io } from 'socket.io-client'
import { socketConfig } from '@src/config/socketConfig'

const socket = io(socketConfig.url, {
  withCredentials: socketConfig.secure,
})

export const SocketContext = React.createContext(socket)

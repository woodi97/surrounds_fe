import React from 'react'
import { io } from 'socket.io-client'
import { socketConfig } from '@src/core/config/envConfig'

const socket = io(socketConfig.url, {
  withCredentials: socketConfig.secure,
})

export const SocketContext = React.createContext(socket)

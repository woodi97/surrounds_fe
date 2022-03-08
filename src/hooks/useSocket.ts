import React from 'react'
import { io } from 'socket.io-client'
import { socketConfig } from '@src/config/socketConfig'

const socket = io(socketConfig.url, {
  withCredentials: false,
})

export const SocketContext = React.createContext(socket)

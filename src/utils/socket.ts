import React from 'react'
import { io } from 'socket.io-client'

const socket = io('https://be-surrounds.herokuapp.com/', {
  withCredentials: false,
})

export const SocketContext = React.createContext(socket)

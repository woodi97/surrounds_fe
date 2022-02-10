import React from 'react'
import { io } from 'socket.io-client'

const socket = io('https://be-surrounds.herokuapp.com/', {
  withCredentials: false,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
})

export const SocketContext = React.createContext(socket)

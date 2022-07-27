import { Location } from '@src/core/types'
import axios from 'axios'

export const apiGetNearChatrooms = async (location: Location) => {
  try {
    const { data } = await axios.get('/chatroom', {
      params: {
        longitude: location.longitude,
        latitude: location.latitude,
      },
    })
    return data.body
  } catch (error) {
    throw error
  }
}

export const apiCheckChatroom = async (email: string) => {
  try {
    const { data } = await axios.get('/chatroom/check', {
      params: {
        email: email,
      },
    })
    return data.body
  } catch (error) {
    throw error
  }
}

export const apiCreateChatroom = async (title: string, location: Location) => {
  try {
    const { data } = await axios.post('/chatroom', {
      title: title,
      longitude: location.longitude,
      latitude: location.latitude,
    })
    return data.body
  } catch (error) {
    throw error
  }
}

export const apiDeleteChatroom = async (email: string) => {
  try {
    const { data } = await axios.delete('/chatroom', {
      params: {
        email: email,
      },
    })
    return data.body
  } catch (error) {
    throw error
  }
}

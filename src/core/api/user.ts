import axios from 'axios'
import { ToastWarn } from '@src/utils/toast'
import { setAuthToken } from '@src/utils/authUtil'

export const apiSignIn = async (email: string, password: string): Promise<any> => {
  try {
    const { data } = await axios.post('/signin', {
      email: email,
      password: password,
    })
    setAuthToken(data.token)
    return data
  } catch (err) {
    ToastWarn('Login Failed. Try Again')
    throw err
  }
}

export const apiSignUp = async (
  nickname: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const { data } = await axios.post('/signup', {
      nickname,
      email,
      password,
    })
    return data.body
  } catch (err) {
    throw err
  }
}

export const apiGetUserProfile = async (email: string): Promise<any> => {
  try {
    const { data } = await axios.get(`/user/${email}`)
    return data.body
  } catch (error) {
    throw error
  }
}

export const apiEditUserName = async (username: string): Promise<any> => {
  try {
    const { data } = await axios.put('/user', {
      username: username,
    })
    return data.body
  } catch (error) {
    throw error
  }
}

export const apiEditProfileImage = async (image: string): Promise<any> => {
  try {
    const formData = new FormData()
    formData.append('image', image)
    const { data } = await axios.put('/api/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data.body
  } catch (error) {
    throw error
  }
}

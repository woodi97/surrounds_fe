import axios from 'axios'

export const signin = async (email: string, password: string): Promise<any> => {
  try {
    const { data } = await axios.post('/signin', {
      email: email,
      password: password,
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    return data
  } catch (err) {
    throw err
  }
}

export const signup = async (nickname: string, email: string, password: string): Promise<any> => {
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

export const getUserProfile = async (email: string): Promise<any> => {
  try {
    const { data } = await axios.get(`/user/${email}`)
    return data.body
  } catch (error) {
    throw error
  }
}

export const editUserName = async (username: string): Promise<any> => {
  try {
    const { data } = await axios.put('/user', {
      username: username,
    })
    return data.body
  } catch (error) {
    throw error
  }
}

export const editProfileImage = async (image: string): Promise<any> => {
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

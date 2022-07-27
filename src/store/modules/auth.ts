import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserAuthInfoType } from '@src/core/types/auth-type'

export const initialState: UserAuthInfoType = {
  email: null,
  nickname: null,
  profileImage: null,
  isLogin: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Omit<UserAuthInfoType, 'isLogin'>>) => {
      state.email = action.payload.email
      state.profileImage = action.payload.profileImage
      state.nickname = action.payload.nickname
      state.isLogin = true
    },
    clearUserInfo: (state) => {
      state.email = null
      state.nickname = null
      state.profileImage = null
      state.isLogin = false
    },
  },
})

// Create Action
export const { setUserInfo, clearUserInfo } = authSlice.actions
// Reducer
export default authSlice.reducer

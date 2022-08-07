import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuthInfoType } from '@src/core/types/auth-type';

export const initialState: UserAuthInfoType = {
  email: null,
  username: null,
  profile_image: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Omit<UserAuthInfoType, 'isLogin'>>) => {
      state.email = action.payload.email;
      state.profile_image = action.payload.profile_image;
      state.username = action.payload.username;
      state.isLogin = true;
    },
    clearUserInfo: (state) => {
      state.email = null;
      state.username = null;
      state.profile_image = null;
      state.isLogin = false;
    },
  },
});

// Create Action
export const { setUserInfo, clearUserInfo } = authSlice.actions;
// Reducer
export default authSlice.reducer;

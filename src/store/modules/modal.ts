import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalInfoType } from '@src/core/types/modal-type';

export const modalInitialState: ModalInfoType = {
  type: null,
  title: null,
  option: null,
};

// Todo: add function representative reducers
const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalInfoType>) => {
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.option = action.payload.option;
    },
    openSignUpModal: (state) => {
      state.type = 'SIGNUP';
      state.title = 'Sign Up';
      state.option = null;
    },
    openSignInModal: (state) => {
      state.type = 'SIGNIN';
      state.title = 'Sign In';
      state.option = null;
    },
    closeModal: (state) => {
      state.type = null;
      state.title = null;
      state.option = null;
    },
  },
});

// Create Action
export const { openModal, openSignUpModal, openSignInModal, closeModal } = modalSlice.actions;
// Reducer
export default modalSlice.reducer;

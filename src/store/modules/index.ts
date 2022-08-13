import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit';
import { UserAuthInfoType } from '@src/core/types/auth-type';
import { DeviceInfoType } from '@src/core/types/device-info-type';
import { LayoutInfoType } from '@src/core/types/layout-type';
import { ModalInfoType } from '@src/core/types/modal-type';
import { HYDRATE } from 'next-redux-wrapper';

import auth from './auth';
import device from './device';
import layout from './layout';
import modal from './modal';

export type RootStateType = CombinedState<{
  auth: UserAuthInfoType;
  modal: ModalInfoType;
  layout: LayoutInfoType;
  device: DeviceInfoType;
}>;
export type RootDispatchType = ReturnType<typeof reducer>['dispatch'];

const reducer = (state: RootStateType, action: AnyAction) => {
  // connect ssr with csr
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    auth,
    modal,
    layout,
    device,
  })(state, action);
};

export default reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeviceInfoType } from '@src/core/types/device-info-type';
import { LocationType } from '@src/core/types/navigator-type';

export const deviceInitialState: DeviceInfoType = {
  location: null,
};

const deviceInfoSlice = createSlice({
  name: 'device-info',
  initialState: deviceInitialState,
  reducers: {
    setLocationInfo: (state, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    },
    clearLocationInfo: (state) => {
      state.location = null;
    },
  },
});

// Create Action
export const { setLocationInfo, clearLocationInfo } = deviceInfoSlice.actions;
// Reducer
export default deviceInfoSlice.reducer;

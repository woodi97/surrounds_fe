import { CommonApiError, isAxiosError } from '@src/core/types/axios-error';
import { CommonChatroomResponse } from '@src/core/types/chatroom';
import { LocationType } from '@src/core/types/navigator-type';
import { ToastError, ToastWarn } from '@src/utils/toast';
import axios from 'axios';

export type GetNearChatroomsResponse = CommonChatroomResponse & {
  distance: number;
};

export const apiGetNearChatrooms = async (location: LocationType) => {
  if (!location) {
    throw new Error('location is required');
  }
  const params = {
    latitude: location.latitude,
    longitude: location.longitude,
  };
  try {
    const { data } = await axios.get<GetNearChatroomsResponse[]>('/chatroom/near', { params });
    return data;
  } catch (error) {
    throw error;
  }
};

export const apiGetMyChatroom = async (email: string) => {
  try {
    const { data } = await axios.get<CommonChatroomResponse>('/chatroom/check', {
      params: {
        email: email,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const apiCreateChatroom = async ({
  title,
  description,
  location,
}: {
  title: string;
  description: string;
  location: LocationType;
}) => {
  if (!title || !description || !location) {
    ToastError('Please fill all fields');
    return;
  }
  try {
    const { data } = await axios.post<CommonChatroomResponse>('/chatroom', {
      title,
      description,
      ...location,
    });
    return data;
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('error occured during create chatroom process');
      throw err;
    }
  }
};

export const apiDeleteChatroom = async () => {
  try {
    await axios.delete('/chatroom');
  } catch (error) {
    throw error;
  }
};

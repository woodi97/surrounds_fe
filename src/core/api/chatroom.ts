import { Location } from '@src/core/types';
import axios from 'axios';

export type CommonChatroomResponse = {
  id: string;
  name: string;
  title: string;
  author: string;
  author_profile_image: string;
  latitude: number;
  longitude: number;
};

export type GetNearChatroomsResponse = CommonChatroomResponse & {
  distance: number;
};

export const apiGetNearChatrooms = async (location: Location) => {
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
  name,
  title,
  latitude,
  longitude,
}: {
  name: string;
  title: string;
  latitude: number;
  longitude: number;
}) => {
  try {
    const { data } = await axios.post<CommonChatroomResponse>('/chatroom', {
      name,
      title,
      latitude,
      longitude,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteChatroom = async () => {
  try {
    await axios.delete('/chatroom');
  } catch (error) {
    throw error;
  }
};

export type CommonChatroomResponse = {
  id: string;
  title: string;
  description: string;
  author: string;
  author_profile_image: string;
  latitude: number;
  longitude: number;
};

export type RoomInfoType = CommonChatroomResponse & {
  distance: number;
};

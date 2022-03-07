import { GetRoomAPIResult } from '@src/core/interface/chatroom'

export const ExampleRoomData: GetRoomAPIResult = {
  header: {
    message: 'success',
  },
  body: [
    {
      id: 'WhCQI5iWw0GU2dc5ZaEZeyA7t90=',
      title: 'woodi',
      location: {
        latitude: 37.5054154,
        longitude: 126.95649769999999,
      },
      generator: {
        email: 'woodi.daily@gmail.com',
        nickname: null,
        profileImage: 'NULL',
      },
    },
    {
      id: 'WhCQI5iWw0GU2dc5ZaEZeyA70=',
      title: 'woodi',
      location: {
        latitude: 37.5054154,
        longitude: 126.95649769999999,
      },
      generator: {
        email: 'woogi.daily@gmail.com',
        nickname: null,
        profileImage: 'NULL',
      },
    },
  ],
}

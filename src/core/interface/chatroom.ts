import { UserInfo, Location } from '.'

export interface RoomInfo {
  id: string
  title: string
  location: Location
  generator: UserInfo
}

export interface GetRoomAPIResult {
  header: { message: string }
  body: RoomInfo[]
}

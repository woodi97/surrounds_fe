import { Location, UserInfo } from '.'

export interface RoomInfo {
  id: string
  title: string
  location: Location
  generator: UserInfo
}

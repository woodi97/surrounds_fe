export interface UserInfo {
  email: string
  nickname: string
  profileImage: string
}

export interface Location {
  latitude: number
  longitude: number
}
export interface IRemoteMedia {
  peerId: string
  emailId: string
  profileImage: string
  stream: MediaStream
}

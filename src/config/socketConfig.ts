import getConfig from 'next/config'

const {
  publicRuntimeConfig: { socketSecure, socketURL },
} = getConfig()

export const socketConfig = {
  secure: socketSecure,
  url: socketURL,
}

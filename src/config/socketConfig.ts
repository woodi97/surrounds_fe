import getConfig from 'next/config'

const {
  publicRuntimeConfig: { socketURL },
} = getConfig()

export const socketConfig = {
  url: socketURL,
}

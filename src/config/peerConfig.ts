import getConfig from 'next/config'

const {
  publicRuntimeConfig: {
    stunURL,
    turnURL,
    turnUsername,
    turnCredential,
    peerHost,
    peerPort,
    peerDebug,
    peerPath,
    peerSecure,
  },
} = getConfig()

const config = {
  iceServers: [
    { urls: [stunURL] },
    {
      urls: turnURL,
      username: turnUsername,
      credential: turnCredential,
    },
  ],
}
export const peerConfig = {
  host: peerHost,
  port: Number(peerPort),
  debug: Number(peerDebug),
  path: peerPath,
  secure: peerSecure === 'true',
  config,
}

export const envConfig = {
  appName: process.env.APP_NAME,
  apiUrl: process.env.BASE_API_URL,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  enableAPICredentials: process.env.ENABLE_API_CREDENTIALS === 'true',
};

export const socketConfig = {
  secure: process.env.SOCKET_SECURE === 'true',
  url: process.env.SOCKET_URL,
};

export const peerConfig = {
  host: process.env.PEER_HOST,
  port: Number(process.env.PEER_PORT),
  debug: Number(process.env.PEER_DEBUG),
  path: process.env.PEER_PATH,
  secure: process.env.PEER_SECURE === 'true',
  iceServers: [
    { urls: [process.env.STUN_URL] },
    {
      urls: process.env.TURN_URL,
      username: process.env.TURN_USERNAME,
      credential: process.env.TURN_CREDENTIAL,
    },
  ],
};

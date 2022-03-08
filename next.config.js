/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = withBundleAnalyzer({
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  },
  images: {
    domains: ['user-images.githubusercontent.com', `${process.env.BASE_URL}`],
  },
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production'
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    const plugins = [...config.plugins]
    if (prod) {
      plugins.push(new CompressionPlugin())
    }
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      plugins: plugins,
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add Runtime process.env Configuration
  serverRuntimeConfig: {
    // Will only be available on the server side
    staticFolder: '/public',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    socketSecure: process.env.SOCKET_SECURE === 'true',
    socketURL: process.env.SOCKET_URL,
    stunURL: process.env.STUN_URL,
    turnURL: process.env.TURN_URL,
    turnUsername: process.env.TURN_USERNAME,
    turnCredential: process.env.TURN_CREDENTIAL,
    peerHost: process.env.PEER_HOST,
    peerPort: process.env.PEER_PORT,
    peerDebug: process.env.PEER_DEBUG,
    peerPath: process.env.PEER_PATH,
    peerSecure: process.env.PEER_SECURE,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
})

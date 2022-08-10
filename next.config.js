/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  },
  images: {
    domains: ['unsplash.com'],
    deviceSizes: [640, 768, 1080, 1200, 1920, 2048, 3840],
  },
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    const plugins = [...config.plugins];
    if (prod) {
      plugins.push(new CompressionPlugin());
    }
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      plugins: plugins,
    };
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    APP_NAME: process.env.APP_NAME,
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_APP_URL: process.env.BASE_APP_URL,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
    SOCKET_SECURE: process.env.SOCKET_SECURE,
    SOCKET_URL: process.env.SOCKET_URL,
    STUN_URL: process.env.STUN_URL,
    TURN_URL: process.env.TURN_URL,
    TURN_USERNAME: process.env.TURN_USERNAME,
    TURN_CREDENTIAL: process.env.TURN_CREDENTIAL,
    PEER_HOST: process.env.PEER_HOST,
    PEER_PORT: process.env.PEER_PORT,
    PEER_DEBUG: process.env.PEER_DEBUG,
    PEER_PATH: process.env.PEER_PATH,
    PEER_SECURE: process.env.PEER_SECURE,
  },
});

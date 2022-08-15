/** @type {import("tailwindcss").Config} */
// generate custom color using https://tailwindcolorgenerator.com/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('./src/core/config/appConfig');

module.exports = {
  mod: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: appConfig.mobileAppMaxWidth,
    },
    extend: {
      margin: {
        center: '0 auto',
      },
      spacing: {
        'gb-header': appConfig.headerHeight,
        'side-padding': appConfig.sidePadding,
        'header-modal': appConfig.headerModalHeight,
      },
      maxWidth: {
        'mobile-app': appConfig.mobileAppMaxWidth,
      },
      colors: {
        'primary-bg': appConfig.backgroundColor,
        primary: {
          50: '#37f1dd',
          100: '#2de7d3',
          200: '#23ddc9',
          300: '#19d3bf',
          400: '#0fc9b5',
          500: '#05bfab',
          600: '#00b5a1',
          700: '#00ab97',
          800: '#00a18d',
          900: '#009783',
        },
        secondary: {
          50: '#ffbd84',
          100: '#ffb37a',
          200: '#ffa970',
          300: '#ff9f66',
          400: '#f8955c',
          500: '#ee8b52',
          600: '#e48148',
          700: '#da773e',
          800: '#d06d34',
          900: '#c6632a',
        },
        link: {
          50: '#35f0ff',
          100: '#2be6ff',
          200: '#21dcff',
          300: '#17d2ff',
          400: '#0dc8ff',
          500: '#03befc',
          600: '#00b4f2',
          700: '#00aae8',
          800: '#00a0de',
          900: '#0096d4',
        },
      },
    },
  },
  plugins: [],
};

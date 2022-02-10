module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    // colors: {},
    extend: {
      colors: {
        primary: {
          300: '#ffd284',
          500: '#ffcc71',
          700: '#feb638',
        },
        secondary: '#00b1d2',
        main: '#718096',
        background: '#fff',
        header: '#0d0106',
        footer: '#808080',
        link: '#00b1d2',
        accent: '#2d3748',
      },
    },
  },
  plugins: [],
}

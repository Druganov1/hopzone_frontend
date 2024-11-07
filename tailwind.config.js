const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // mode: 'jit',

  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'media', // or 'class'

  theme: {
    extend: {
      height: {
        fitscreen: 'calc(100vh - 64px - 56px)',
      },
      fontFamily: {
        kanit: ['Kanit', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        theme: {
          orange: '#826bee',
          red: '#9F3F5B',
          lightpurple: '#5de5d7',
          purple: '#492E9F',
          darkpurple: '#221A56',
        },
        orange: {
          100: '#fffafa',
          200: '#fcf1f0',
          300: '#fae4e1',
          400: '#f7d6d2',
          500: '#f5c9c4',
          600: '#f2bcb6',
          700: '#eeaea7',
          800: '#ee8c81',
          900: '#ee6f60',
        },
        purple: {
          200: '#f8f7fc',
          300: '#efedfa',
          400: '#dddaf2',
          500: '#c6bff2',
          600: '#9991cc',
          700: '#68609c',
          800: '#3a3170',
          900: '#221a56',
        },
      },
      spacing: {
        100: '40rem',
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [],
}
